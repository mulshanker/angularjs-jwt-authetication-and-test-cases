## Start App

npm start



## Testing

There are two kinds of tests in the application: Unit tests and End to End tests.


npm test


### End to end testing
These tests are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Install Protractor command :  npm run update-webdriver

Start server : npm start

Run It: npm run protractor
