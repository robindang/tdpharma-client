'use strict';

angular.module('tdpharmaClientApp')
	.directive('authorSelect', ['Auth', function(Auth) {
		return {
			restrict: 'E',
			templateUrl: 'components/directives/authorSelect/authorSelect.html',
			scope: {
				author: '='
			},
			link: function(scope, element, attrs) {
				scope.selectUser = function(user) {
					scope.author = user;
				}

				scope.users = Auth.getUsers();
				// Determine how much space each user will have per column
				scope.divider = (12 / scope.users.length < 3) ? 3 : 12 / scope.users.length;				
			}
		}
	}]);