/**
 * Class encapsulating all functions in main landing page
 */
(function () {
    'use strict';


    var TIMEOUT = 5000;


    var AssetTenantPage = function () {

        var currentPage = 'assetTenantPage'

        return {

            get: function () {
                var customerInfo= elementManager.findElement(currentPage,'customerInfo');
                return customerInfo.getText();
            },

        };
    };

    module.exports = new AssetTenantPage();

}());


