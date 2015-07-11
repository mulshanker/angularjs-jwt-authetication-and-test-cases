'use strict';

describe('Test AuthenticationHandlerController', function(){

	var scope ={};
	var authenticationHandlerService;
	var $httpBackend ={};
	var $window ={};
	var CONFIG ={};
	var createController;

	//mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('freelanceDiaryApp'));


	//mock the controller for the same reason and include $rootScope and $controller
	beforeEach(angular.mock.inject(function($rootScope, $controller, $injector){
		//create an empty scope
		scope = $rootScope.$new();

		$httpBackend = $injector.get('$httpBackend');
		$window = $injector.get('$window');
		CONFIG = $injector.get('CONFIG');
		authenticationHandlerService = $injector.get('AuthenticationHandlerService');

		scope.deviceUUID = "53453453534";
		//declare the controller and inject our empty scope
		createController = function() {
			return  $controller('AuthenticationHandlerController', {$scope: scope, $window: $window, AuthenticationHandlerService: authenticationHandlerService, CONFIG: CONFIG});
		};

	}));


	it('login method, should call Auth api with proper parameter', function(){

		var controller = createController();

		$httpBackend.expectPOST(CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL, function(data){
			expect(data).toMatch(scope.deviceUUID);
			expect(data).toMatch(CONFIG.APPLICATION_ID);
			return true;
		}, undefined).respond(201,true);
		scope.login();
		$httpBackend.flush();	
	});

	it('login method, should call Auth api with proper Header', function(){

		var controller = createController();

		$httpBackend.expectPOST(CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL, undefined, function(headers){
			expect(headers['X-Reference']).toBeDefined();
			expect(headers['X-UTC-Timestamp']).toBeDefined();
			return true;
		}).respond(201, true);
		scope.login();
		$httpBackend.flush();	
	});

	
	it('Loing should return accessToken and refreshToken', function(){
		var controller = createController();
		$httpBackend.expectPOST(CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL).respond(201, {accessToken:"sdfsdffsfffsd", refreshToken: "34242342kg234k2424k24k24i42il"});
		scope.login();
		$httpBackend.flush();	
		expect($window.sessionStorage.authenticationResult).toMatch('accessToken');
		expect($window.sessionStorage.authenticationResult).toMatch('refreshToken');

	});
	
	it('Logout test should clear sessionStorage', function(){
		var controller = createController();
		$httpBackend.expectPOST(CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL).respond(201, {accessToken:"sdfsdffsfffsd"});
		scope.login();
		$httpBackend.flush();	
		expect($window.sessionStorage.authenticationResult).toMatch('sdfsdffsfffsd');
		scope.logout();
		expect($window.sessionStorage.authenticationResult).toBeUndefined();

	});
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});


	

});

