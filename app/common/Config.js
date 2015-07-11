app.constant("CONFIG", {
		"API_BASE_URL": "http://fd-api-2-testing.freelancediary.com/",
		"API_AUTH_URL": "auth",
		"API_REFRESH_TOKEN_URL": "auth/refresh",
		"API_VALIDATE_TOKEN_URl": "auth/test_fdjwtv1",
		"APPLICATION_ID" : "jr6V8KpEWkDqdXaqFWBmxhtbbXwJsbwscFIOSreI0MM="
  
 });


app.guid = function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
};