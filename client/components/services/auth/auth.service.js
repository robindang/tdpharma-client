'use strict';

angular.module('tdpharmaClientApp')
.service('Auth', Auth);

Auth.$inject = ['$location', '$rootScope', '$http', '$window', '$cookies', '$q', '$filter', 'toastr', 'User', 'TokenService'];

function Auth($location, $rootScope, $http, $window, $cookies, $q, $filter, toastr, User, TokenService) {
  var users = [];
  var currentUser = {};
  var defer = $q.defer();
  var async = $window.async;

  // Strategies: Auth service will store latest info of signed in users
  // Cookies will store the data obtained through Auth to communicate with server.
  // Data in cookies already is used to re-initialize signed in users in case of refresh

  // Initialize sign in user if there is data stored in cookies  
  if ($cookies.getObject('users') && $cookies.get('email') && $cookies.get('token')) {        
    // Get all current sign in users
    users = $cookies.getObject('users');
    if (users.constructor === Array && users.length > 0) {
      // Loop through each user, and refresh token if necessary
      _.each(users, function(u, index) {
        refreshToken(u).then(function(res) {
          u = angular.copy(res);
          // Check if this is current active sign in user
          if (u.email === $cookies.get('email')) {
            currentUser = u;
            $cookies.put('token', currentUser.token.access_token);
          }
          // Last user in the list
          if (index >= users.length - 1) {
            // If can not find the current active user
            if (_.isEmpty(currentUser)) {
              $cookies.remove('email');
              $cookies.remove('token');
              users = [];
              $cookies.putObject('users', []);
            }
            defer.resolve();
          }
        })
      });      
    }
    else {
      // Empty or corrupted saved users data
      defer.resolve();
    }              
  }
  else {
    // There is no saved logged in data
    defer.resolve();
  }

  function checkReady() {
    return defer.promise;
  }

  /*
   * Refresh token for a user
   * @param {Object} user - user info
   * @param {Promise} with updated user object
   */
   function refreshToken(user) {
    var deferred = $q.defer();
    var result = {};
    var now = new Date().getTime() / 1000;  // get absolute second value of this moment
    // 300 seconds buffer to prevent token expiration
    var expire_moment = user.token.created_at + user.token.expires_in - 300; 

    if (now >= expire_moment) {
      TokenService.save({
          grant_type: 'refresh_token',
          refresh_token: user.token.refresh_token
        }, function (res){          
          result = _.extend(user, {token: res});
          deferred.resolve(result);                  
        }, function (error){
          deferred.reject(error);
        }); 
    } else {
      deferred.resolve(user);
    }

    return deferred.promise;
   }

  /**
   * Authenticate user and save token
   *
   * @param  {Object}   user     - login info
   * @param  {Function} callback - optional
   * @return {Promise}
   */
   function login(user, callback) {
    var cb = callback || angular.noop;
    var deferred = $q.defer();    

    async.waterfall([
      function(c_b) {
        // First obtain access token for the user
        TokenService.save({
          grant_type: 'password',
          username: user.email,
          password: user.password
        }, function (res){
          $cookies.put('token', res.access_token);                              
          return c_b(null, {token: res});
        }, function (error){
          return c_b({error: error});
        }); 
      },
      function(arg1, c_b) {
        // Then querry the user information... token object is now arg1
        User.get(function(res) {          
          currentUser = _.extend(res, arg1);          
          users.push(currentUser);
          $cookies.put('token', currentUser.token.access_token);
          $cookies.put('email', currentUser.email);
          $cookies.putObject('users', users);
          return c_b(null, currentUser);
        }, function(error) {
          return c_b({error: error});
        });        
      }], function(err, result) {      
        // currentUser is now result 
        if (err) {         
          // If there is an error
          if (err.error.status === 401) {
            toastr.error($filter('translate')('INVALID_EMAIL_PASSWORD')); 
          }                              
          deferred.reject(err);
          return cb(err);     // Callback from the input parameter
        } else {
          deferred.resolve(result);
          return cb();        // Callback from the input parameter
        }        
      }
    );          

    return deferred.promise;
  } 


  /**
   * Delete access token and user info
   *
   * @param  {Function}
   */
   function logout() {    
    var idx =  _.indexOf(users, currentUser);
    if (idx >= 0) {
      users.splice(idx, 1);
    }    
    $cookies.putObject('users', users);
    if (users.length > 0) {
      // Grab the next in the list and refresh token if necessary
      refreshToken(users[0]).$promise.then(function (res){
        currentUser = res;
        $cookies.put('email', res.email);
        $cookies.put('token', res.token.access_token);
      });            
    }
    else {
      currentUser = {};
      $cookies.remove('email');
      $cookies.remove('token');    
    }   
    return users.length;
  }

  /**
   * Create a new user
   *
   * @param  {Object}   user     - user info
   * @param  {Function} callback - optional
   * @return {Promise}
   */
   function createUser(user, callback) {
    var cb = callback || angular.noop;

    return User.save({
      user: user
    },
    function(data) {
      currentUser = User.get();
      return cb(user);
    },
    function(err) {
      this.logout();
      return cb(err);
    }.bind(this)).$promise;
  } 

  /**
   * Change password
   *
   * @param  {String}   oldPassword
   * @param  {String}   newPassword
   * @param  {Function} callback    - optional
   * @return {Promise}
   */
   function changePassword(oldPassword, newPassword, callback) {
    var cb = callback || angular.noop;

    return User.update({ id: currentUser.id }, {
      old_password: oldPassword,
      user: {
        // oldPassword: oldPassword,
        password: newPassword
      }
    }, function(user) {
      return cb(user);
    }, function(err) {
      return cb(err);
    }).$promise;
  } 

  /**
   * Gets all available info on authenticated user
   *
   * @return {Object} user
   */
   function getCurrentUser() {
    return currentUser;
  }

  /*
   * Switch active user
   */
   function switchCurrentUser(user) {
    var idx = _.indexOf(users, user);
    if (idx >= 0) {
      currentUser = users[idx];      
      $cookies.put('token', currentUser.token.access_token);
    }
  }

  /*
   * Return all authenticated users including current active one
   */
   function getUsers() {
    return users;
  }

  /**
   * Check if a user is logged in
   *
   * @return {Boolean}
   */
   function isLoggedIn() {
    return users.length > 0;    
  }

  /**
   * Waits for currentUser to resolve before checking if user is logged in
   */  
   function isLoggedInAsync(cb) {
    if(currentUser.hasOwnProperty('$promise')) {
      currentUser.$promise.then(function() {
        cb(true);
      }).catch(function() {
        cb(false);
      });
    } else if(currentUser.hasOwnProperty('roles')) {
      cb(true);
    } else {
      cb(false);
    }
  }

  /**
   * Check if a user is an admin
   *
   * @return {Boolean}
   */
   function isAdmin() {
    return currentUser.role === 'admin';  
  } 

  /**
   * Get auth token
   */
   function getToken() {
    return $cookies.get('token');
  }

  return {
    checkReady: checkReady,
    login: login,
    logout: logout,
    createUser: createUser,
    changePassword: changePassword,
    getCurrentUser: getCurrentUser,
    switchCurrentUser: switchCurrentUser,
    getUsers: getUsers,
    isLoggedIn: isLoggedIn,
    isLoggedInAsync: isLoggedInAsync,    
    isAdmin: isAdmin,
    getToken: getToken 
  };
}
