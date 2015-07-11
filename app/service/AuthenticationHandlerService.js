var Services = angular.module('services', ['ngResource']);

Services.service('AuthenticationHandlerService', ['$resource', 'CONFIG', function($resource, CONFIG) {
	
	return {
		authenticate : $resource(CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL, {}, {
			login: {
				method : 'POST',
				skipAuthorization: true,
				isArray : false,
			}
		
		}),
		
		validate: $resource( CONFIG.API_BASE_URL + CONFIG.API_VALIDATE_TOKEN_URl ,{}, {
			query : {
				method : 'GET',
				isArray : false
				}
			})
		
	
	};	
	
}]);
