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


    var currentPage = 'homePage';


    var homePage = function () {

        return {
            clickUsername: function () {
                return cem.findElement(currentPage, 'userName').click();
            },

            clickLogOut: function () {
                return  cem.findElement(currentPage, 'logoutButton').click();
            },

            searchIcon: function () {
                return  cem.findElement(currentPage, 'searchIcon').click();
            },

            getLogin: function (url) {
                browser.driver.get(url)
                return browser.driver.isElementPresent(by.id('tenantName'));
            },
        }

    };

    module.exports = new homePage();

}());