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


    var currentPage = 'tenantPage';


    var tenantPage = function () {

        return {
            setTenat: function (tenant) {
                Logger.info('Put Tenant Name' + tenant);
                return cem.findElement(currentPage, 'tenantName').sendKeys(tenant);
            },

            clickSignInTenant: function () {
                return cem.findElement(currentPage, 'signinButton').click();
            },
           
            getLogin: function (url) {
                browser.driver.get(url)
                return TestHelper.isElementPresent(currentPage, 'tenantName');
            },

            getPage: function () {
                return browser.driver.isElementPresent(by.id('tenantName'));
            },
        }

    };

    module.exports = new tenantPage();

}());