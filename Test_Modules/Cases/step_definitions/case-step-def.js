/**
 * Main step definition. Add all glue code here in this class
 */
var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {
    'use strict';


    var PerfRunner = require('protractor-perf');
    var perfRunner = new PerfRunner(protractor, browser);

    this.Given(/^The application is authenticated$/, function (callback) {

        //Using login page object method to check if user has logged in.
        //perfRunner.start();

        loginPage.checkHomePage().then(function (completed) {

            //Calling logger to write specific details
            Logger.info("Asserting if logged in\n");

            // Using the promise returned from checkHomePage as a parameter in TestHelper class to assert if true
            TestHelper.assertTrue(completed, 'Not logged in');

            //Callback once test is complete
            callback();
        });
    });

    this.Then(/^I can select cases and wait until it is loaded$/, function (callback) {
        browser.sleep(2000);
        apmlandingPage.selectCases().then(function () {

            casesPage.verifyClosedCases().then(function(result) {
            TestHelper.assertEqual(result, "Closed", callback);
            apmlandingPage.logoutAPM().then(function () {
                loginPage.checkLogout().then(function (completed) {
                    assert.isTrue(completed, 'Not logged in');
                    console.log("LOGGED OUT");

                    callback();
                });
            });
        });
        });
    });
};
module.exports = myStepDefinitionsWrapper;









