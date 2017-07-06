/**
 * Class encapsulating all functions in main landing page
 */
(function () {
    'use strict';


    var CasesPage = function () {
        var currentPage = 'casesPage';

        return {

            verifyClosedCases: function () {
               return TestHelper.isElementPresent(currentPage, "caseStatus").then(function(){
                    var element = cem.findElement(currentPage, "caseStatus")
                    return element.getText();
                });
            }

        }


    };

    module.exports = new CasesPage();

}());


