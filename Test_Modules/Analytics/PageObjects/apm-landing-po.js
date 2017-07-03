/**
 * Class encapsulating all functions in main landing page
 */
(function () {
    'use strict';



    var LandingPage = function () {
        var currentPage = 'landingPage';

        return {

            selectAssets : function (){
                return TestHelper.elementToBeClickable(currentPage,'assetTab');
            },

            selectAnalyticsCatalog : function (){
                return TestHelper.elementToBeClickable(currentPage,'analyticsCatalogTab');
            },

            selectAssetInstances : function (){
                return TestHelper.elementToBeClickable(currentPage,'assetInstancesTab');
            },

            logoutAPM : function(){
                var logout = elementManager.findElement(currentPage,'logoutArrow');
                logout.click();
                return elementManager.findElement(currentPage,'logoutButton').click();
            },

    }




    };

    module.exports = new LandingPage();

}());


