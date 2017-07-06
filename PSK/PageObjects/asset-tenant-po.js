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
                var customerInfo = cem.findElement(currentPage, 'customerInfo');
                return customerInfo.getText();
            },

            // Retrieving tenant name
            checkTagName: function () {
                return TestHelper.getText(currentPage,"tagName");
            },

            // Waiting for spinner to finish loading table
            waitForAssetTenantLabel: function () {
                return TestHelper.elementToBeClickable(currentPage, "avidEnterpriseDiv").then(function(){
                    return TestHelper.elementToBeClickable(currentPage, "openButton");
                })
            }
        };
    };

    module.exports = new AssetTenantPage();

}());


