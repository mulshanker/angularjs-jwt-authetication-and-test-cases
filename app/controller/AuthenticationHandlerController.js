var Controllers = angular.module('controllers', []);

Controllers.controller('AuthenticationHandlerController', ['$scope', '$window', 'AuthenticationHandlerService', 'CONFIG',
   function($scope, $window, authenticationHandlerService, CONFIG) {
	
	$scope.login = function() {
		var Authenticate = {};
		Authenticate.applicationId = CONFIG.APPLICATION_ID;
		Authenticate.deviceName = $window.navigator.userAgent;
		Authenticate.deviceUUID = $scope.deviceUUID;
		
		if(Authenticate.deviceUUID){
			authenticationHandlerService.authenticate.login({}, Authenticate,
					function(authenticationResult) {
				       $window.sessionStorage.authenticationResult = JSON.stringify(authenticationResult);
				}
			);
		}
	};
	
	$scope.validate = function() {
		authenticationHandlerService.validate.query({}, 
				function(authenticationResult) {
			//Getting CORS ERROR
			}
		);
	};
	
	$scope.logout = function() {
		delete $window.sessionStorage.authenticationResult;
	};
	
	
	$scope.checkLogin = function() {
		if($window.sessionStorage.authenticationResult && JSON.parse($window.sessionStorage.authenticationResult).accessToken){
			return true;
		}
		return false;
	};
}]);