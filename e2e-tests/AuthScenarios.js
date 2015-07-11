'use strict';

describe('FreelanceDiary front-end test task : ', function() {


  it('JWT Auth flow test', function() {
    browser.get('#!/login');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('Login', function() {

    beforeEach(function() {
    	 browser.get('#!/login');
    });


    it('should render login page to test Login', function() {
    	expect($('.btn-primary').isDisplayed()).toBeTruthy();
        expect(element.all(by.css('[ng-view] button')).first().getText()).
        toMatch(/Login!/);
    });

    it('should login click work', function() {
    	expect($('.btn-primary').isDisplayed()).toBeTruthy();
        expect(element.all(by.css('[ng-view] button')).first().getText()).
        toMatch(/Login!/);
        
        element(by.css('[id="deviceUUID"]')).sendKeys('DEVICE_UUID_3123123132');
        element(by.css('[id="loginBtn"]')).click();
        
        expect($('#message').isDisplayed()).toBeTruthy();
        expect(element.all(by.css('[ng-view] span')).first().getText()).
        toMatch(/You are LogedIn!!!/);
	    element(by.css('[id="logoutBtn"]')).click();
        
    });
  });

  it('should logout click work', function() {
	  	expect($('.btn-primary').isDisplayed()).toBeTruthy();
	      expect(element.all(by.css('[ng-view] button')).first().getText()).
	      toMatch(/Login!/);
	      
	      element(by.css('[id="deviceUUID"]')).sendKeys('DEVICE_UUID_3123123132');
	      element(by.css('[id="loginBtn"]')).click();
	      
	      expect($('#message').isDisplayed()).toBeTruthy();
	      expect(element.all(by.css('[ng-view] span')).first().getText()).
	      toMatch(/You are LogedIn!!!/);

	      element(by.css('[id="logoutBtn"]')).click();
	      expect($('#deviceUUID').isDisplayed()).toBeTruthy();
	      
	  });
  
});
