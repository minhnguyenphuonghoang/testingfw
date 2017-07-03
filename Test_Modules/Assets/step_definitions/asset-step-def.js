/**
 * Main step definition. Add all glue code here in this class
 */
var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {


    'use strict';

    this.Given(/^The application is authenticated$/, function (callback) {

        //Using login page object method to check if user has logged in.
        loginPage.checkHomePage().then(function (completed) {

            //Calling logger to write specific details
            Logger.info("Asserting if logged in\n");

            // Using the promise returned from checkHomePage as a parameter in TestHelper class to assert if true
            TestHelper.assertTrue(completed, 'Not logged in');
            //
            //TestHelper.isElementNotPresent("assetTenantPage", 'tenantDiv').then(function(){
                callback();
            //});

            //Callback once test is complete

        });
    });

    this.Then(/^I can select Asset Management and view tenant from context$/, function (callback) {
        // Using landing page object method to select assets tab
        apmlandingPage.selectAssets().then(function () {

            // Using asset page object method to wait for table to load
            assetTenantPage.waitForAssetTenantLabel();

            // Asserting if tenant name is equal to regression
            assetTenantPage.checkTagName().then(function (tagName) {

                Logger.info("Asserting Tenant Name is equal to regression");
                TestHelper.assertEqual(tagName, "AViD ENTERPRISE", callback);
                // Logging out and checking if the user is actually logged out
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









