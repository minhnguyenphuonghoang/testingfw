/**
 * Created by 212391321 on 8/27/2015.
 */

describe('Verify Analytics page', function() {
    var apmlandingPage = require('../.././PageObjects/apm-landing-po.js');


    it('1) should be able to login to Team_Example as admin user', function () {
        loginPage.getLogin().then(function (completed) {
            browser.ignoreSynchronization = true;
            assert.isTrue(completed, 'Not login page');
            loginPage.setName(browser.params.login.username).then(function () {
                loginPage.setPassword(browser.params.login.password).then(function () {
                    loginPage.clickLogin().then(function () {
                        loginPage.checkHomePage().then(function (completed) {
                            assert.isTrue(completed, 'Not logged in');
                        });
                    });
                });
            });
        });
    });

    it('2) should be able to click on analytic catalog', function () {

        apmlandingPage.selectAnalyticsCatalog().then (function () {
            assetTenantPage.getCustomerInformation().then(function (tenantName) {
                Logger.info("Asserting to see Tag Class Name is loaded\n");
                TestHelper.assertEqual(tenantName, "Analytics", callback);
            });

        });
    });

}









