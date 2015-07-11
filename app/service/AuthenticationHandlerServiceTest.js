'use strict';

describe('Test AuthenticationHandlerService', function(){

	var authenticationHandlerService ={};
	var $httpBackend ={};
	var CONFIG ={};
	var $resource ={};
	//mock Application to allow us to inject our own dependencies
	beforeEach(module('freelanceDiaryApp'));

	beforeEach(inject(function($injector) {
	     $httpBackend = $injector.get('$httpBackend');
	     CONFIG = $injector.get('CONFIG');
	     $resource = $injector.get('$resource');
	     authenticationHandlerService = $injector.get('AuthenticationHandlerService');
	  }));
	
	
	it('should call authenticate API', function(){

		var postAuth = {applicationId: 'applicationId', deviceName: 'deviceName', deviceUUID: 'deviceUUID'};

		$httpBackend.when('POST', CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL,
			function(postData) {
			 expect(postData).toMatch(postAuth.applicationId);
			 expect(postData).toMatch(postAuth.deviceName);
			 expect(postData).toMatch(postAuth.deviceUUID);
			return true;
		}).respond(201, true );

		var result = authenticationHandlerService.authenticate.login({}, postAuth,
				function(authenticationResult) {
			expect(authenticationResult).toBeTruthy();
		});

		$httpBackend.flush();
	});
	
	it('should call validate token API', function(){

		var postAuth = {applicationId: 'applicationId', deviceName: 'deviceName', deviceUUID: 'deviceUUID'};

		$httpBackend.expectGET(CONFIG.API_BASE_URL + CONFIG.API_VALIDATE_TOKEN_URl).respond(200, true );

		var result = authenticationHandlerService.validate.query({}, 
				function(authenticationResult) {
			//Getting CORS ERROR
			}
		);

		$httpBackend.flush();
	});
	
	 afterEach(function() {
	     $httpBackend.verifyNoOutstandingExpectation();
	     $httpBackend.verifyNoOutstandingRequest();
	   });	
});

