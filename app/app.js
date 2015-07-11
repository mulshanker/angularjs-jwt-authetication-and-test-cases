'use strict';
var TEMPLATE_FOLDER = "view/";
var app = angular.module('freelanceDiaryApp', ['ngRoute',
                                               'services',
                                               'controllers']);

app.config([ '$routeProvider', '$provide', '$locationProvider', '$httpProvider',  function($routeProvider, $provide,
		$locationProvider, $httpProvider){

	$routeProvider.when('/login', {
		templateUrl: TEMPLATE_FOLDER + 'login.html',
		controller: 'AuthenticationHandlerController'
	});	

	$routeProvider.otherwise({
		templateUrl: TEMPLATE_FOLDER + 'home.html',
	});

	$locationProvider.hashPrefix('!');

	$httpProvider.interceptors.push('responseErrorHandler');
	$httpProvider.interceptors.push('authInterceptor');


}]);	



app.factory('authInterceptor',['$rootScope', '$q', '$window', '$injector', 'CONFIG', function ($rootScope, $q, $window, $injector, APPCONFIG) {
	return {
		request: function (config) {
			console.log("config ", config);


			config.headers = config.headers || {};
			config.headers['X-Reference'] = app.guid();
			config.headers['X-UTC-Timestamp'] = new Date().getTime();
			console.log("authInterceptor called", authenticationResult);

			if(config.skipAuthorization){
				return config; 
			}

			if($window.sessionStorage.authenticationResult){
				var authenticationResult = JSON.parse($window.sessionStorage.authenticationResult);
				if (authenticationResult.accessToken) {
					config.headers.Authorization = authenticationResult.accessToken;
				}

				//Check token expire before API call if yes refresh token
				if(authenticationResult.tokenExpirationTime <  new Date().getTime()){
					var refreshTokenObject= {};
					refreshTokenObject.accessToken = authenticationResult.accessToken;
					refreshTokenObject.refreshToken = authenticationResult.refreshToken;

					var $resource = $injector.get("$resource")
					var refreshTokenService = $resource(APPCONFIG.API_BASE_URL + APPCONFIG.API_REFRESH_TOKEN_URL, {}, {
						query: {
							method : 'POST',
							skipAuthorization: true,
							isArray : false
						}

					});

					refreshTokenService.query({}, refreshTokenObject,
							function(refreshTokenResult) {
						authenticationResult.accessToken = refreshTokenResult.accessToken;
						authenticationResult.refreshToken = refreshTokenResult.refreshToken;

						$window.sessionStorage.authenticationResult = JSON.stringify(authenticationResult);
						console.log("Auth Refresh success: " , JSON.parse($window.sessionStorage.authenticationResult).accessToken);
					}
					);
				}else{
					console.log("Token not expired");
					console.log("Token create at datetime :: ", authenticationResult.tokenExpirationTime);
					console.log("Token expired time :: ", new Date().getTime());
					console.log("Token to expire milisecond:: ", (authenticationResult.tokenExpirationTime - new Date().getTime()));
				}
			}

			return config;
		},
		response: function (response) {
			if (response.status === 401) {
				// handle the case where the user is not authenticated
				$location.path( "/login" );
			}
			return response || $q.when(response);
		}
	};
}]);

app.factory('responseErrorHandler',function ($q, $rootScope, $location) {
	return {
		'responseError': function(rejection) {
			var status = rejection.status;
			var config = rejection.config;
			var method = config.method;
			console.log(rejection);
			var url = config.url;
			console.log("Error response error code :", status); 

			if (status == 400) {
				$rootScope.error = [{ type: 'danger', msg: "Bad Request"} ];
				$location.path( "/home" );
			}

			if (status == 401 || status == 0 ) {
				$rootScope.error = [{ type: 'danger', msg: "Unautorize Request"} ];
				$location.path( "/login" );
			}

			$rootScope.$$childHead.isLoading = false;	        		
			return $q.reject(rejection);
		}
	};
});