/**
 * Copyright (c) 2013 - 2015 GE Global Research. All rights reserved.
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

(function () {
    'use strict';


    var currentPage = 'searchPage';


    var tenantPage = function () {

        return {
            setQuery: function (query) {
                return cem.findElement(currentPage, 'queryField').sendKeys(query);
            },

            clickRunQueryButton: function () {
                return cem.findElement(currentPage, 'queryButton').click();
            },

            getData: function (url) {
                return TestHelper.isElementPresent(currentPage, 'tableResult');
            },

            getPage: function () {
                return TestHelper.isElementPresent(currentPage, 'queryField');
            },

        }

    };

    module.exports = new tenantPage();

}());