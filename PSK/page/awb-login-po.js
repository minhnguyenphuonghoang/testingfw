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


    var currentPage = 'loginPage';


    var LoginPage = function () {

        return {
            get: function () {
                return browser.driver.get(browser.params.login.baseUrl);
            },

            setName: function (username) {
                Logger.info('Put User Name' + username);
                return cem.findElement(currentPage, 'username').sendKeys(username);
            },

            setPassword: function (password) {
                Logger.info('Put Password *****');
                return cem.findElement(currentPage, 'password').sendKeys(password);
            },

            clickLogin: function () {
                Logger.info('Click Login Function');
                return cem.findElement(currentPage, 'signInButton').click();
            },

            checkLogout: function () {
                return TestHelper.isElementPresent(currentPage, 'password');
            },

            checkLogin: function () {
                return browser.driver.isElementPresent(by.xpath('//button[contains(.,"Create")]'));
            },

            errorMSG: function (){
                return TestHelper.isElementPresent(currentPage, 'errorMsg');
            },

            getLogin: function (url) {
                return TestHelper.isElementPresent(currentPage, 'signInButton');;
            },
        }

    };

    module.exports = new LoginPage();

}());