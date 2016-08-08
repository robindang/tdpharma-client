'use strict';

angular.module('tdpharmaClientApp')
  .service('Auth', Auth);

Auth.$inject = ['$location', '$rootScope', '$http', 'User', '$cookies', '$q'];

function Auth($location, $rootScope, $http, User, $cookies, $q) {
  var users = [];
  var currentUser = {};
  var defer = $q.defer();

  // Strategies: Auth service will store latest info of signed in users
  // Cookies will store the data obtained through Auth to communicate with server.
  // Data in cookies already is used to re-initialize signed in users in case of refresh

  // Initialize sign in user if there is data stored in cookies  
  if ($cookies.getObject('users') && $cookies.get('email') && $cookies.get('token')) {    
    if (Object.prototype.toString.call($cookies.getObject('users')) === '[object Array]') {
      // Get all current sign in users
      users = $cookies.getObject('users');
      // First obtain who is the current active sign in user
      var u = _.find(users, function(x){return x.email === $cookies.get('email') && x.authentication_token === $cookies.get('token')});
      if (u) {
        User.get().$promise.then(function(resp){
          if (resp.email === u.email) {
            currentUser = resp;              
          }
          else {
            $cookies.remove('email');
            $cookies.remove('token');
            currentUser = {};
          }        
          defer.resolve();        
        });
      } 
    }
    else { 
      $cookies.putObject('users', []);
    }
    defer.resolve();    
  }
  else {
    defer.resolve();
  }

  function checkReady() {
    return defer.promise;
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

    User.signIn({
      user: {
        email: user.email,
        password: user.password
      }
    },
    function(data) {        
      currentUser = data;
      users.push(currentUser);
      $cookies.put('email', currentUser.email);
      $cookies.put('token', currentUser.authentication_token);
      $cookies.putObject('users', users);
      deferred.resolve(data);
      return cb();
    },
    function(err) {
      this.logout();
      deferred.reject(err);
      return cb(err);
    }.bind(this));

    return deferred.promise;
  } 


  /**
   * Delete access token and user info
   *
   * @param  {Function}
   */
  function logout() {
    $cookies.remove('token');
    $cookies.remove('email');
    var idx =  _.indexOf(users, currentUser);
    if (idx >= 0) {
      users.splice(idx, 1);
    }    
    $cookies.putObject('users', users);
    if (users.length > 0) {
      currentUser = users[0];
    }
    else {
      currentUser = {};
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
      $cookies.put('email', currentUser.email);
      $cookies.put('token', currentUser.authentication_token);
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
