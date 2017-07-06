/**
 * Class encapsulating all functions in main landing page
 */
(function () {
    'use strict';


    var LandingPage = function () {
        var currentPage = 'landingPage';

        return {

            selectAssets: function () {
                return TestHelper.elementToBeClickable(currentPage, 'assetTab');
                    return TestHelper.isElementPresent("assetTenantPage", 'tenantDiv')
                //});
            },

            selectCases: function () {
                return TestHelper.elementToBeClickable(currentPage, 'casesTab').then(function () {
                    return TestHelper.elementToBeClickable(currentPage, 'closedCases')
                });
            },

            selectAnalyticsCatalog: function () {
                return TestHelper.elementToBeClickable(currentPage, 'analyticsCatalogTab');
            },

            selectAssetInstances: function () {
                return TestHelper.elementToBeClickable(currentPage, 'assetInstancesTab');
            },

            selectDashboard: function () {
                return TestHelper.elementToBeClickable(currentPage, 'dashboardTab');
            },
            selectAnalysis: function () {
                return TestHelper.elementToBeClickable(currentPage, 'analysisTab');
            },

            logoutAPM: function () {
                var logout = cem.findElement(currentPage, 'logoutArrow');
                logout.click();
                return cem.findElement(currentPage, 'logoutButton').click();
            },

        }


    };

    module.exports = new LandingPage();

}());


