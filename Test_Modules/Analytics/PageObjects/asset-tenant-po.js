/**
 * Class encapsulating all functions in main landing page
 */
(function () {
    'use strict';


    var TIMEOUT = 5000;


    var AssetTenantPage = function () {

        // Defining currentPage variable for retrieving elements
        var currentPage = 'assetTenantPage'

        return {

            // Retrieving table header from asset instances
            getTableHeader: function () {
                var customerInfo= elementManager.findElement(currentPage,'customerInfo');
                return customerInfo.getText();
            },

            // Retrieving tenant name
            checkTenantName: function() {
                var tenantName = elementManager.findElement(currentPage,'tenantName');
                return tenantName.getText();
            },

            // Waiting for spinner to finish loading table
            waitForAssetTenantLabel : function (){
                TestHelper.elementToBeClickable(currentPage, 'test').then(function () {
                    TestHelper.elementToBeClickable(currentPage, 'test2').then(function () {
                    TestHelper.elementToBeClickable(currentPage, 'openButton').then(function () {
                        return TestHelper.isElementPresent(currentPage,'tagClassNameTableHeader');
                    });
                    });
            });
            }

        };
    };

    module.exports = new AssetTenantPage();

}());


