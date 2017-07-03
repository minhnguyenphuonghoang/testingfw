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
                browser.waitForAngular();
            },

            setName: function (username) {
                return elementManager.findElement(currentPage,'username').sendKeys(username);
            },

            setPassword: function (password) {
                return elementManager.findElement(currentPage,'password').sendKeys(password);
            },

            clickLogin: function () {
                return elementManager.findElement(currentPage,'password').sendKeys(protractor.Key.ENTER);
            },

            getLogin: function (url) {
                browser.driver.get(browser.params.login.baseUrl)
                return browser.driver.isElementPresent(by.xpath('//*[@value="Sign in"]'));
            },

            checkHomePage: function() {
                browser.waitForAngular();
                var title = elementManager.findElement('landingPage','assetTab');
                return title.isPresent();

            },

            checkLogout: function() {
                //browser.waitForAngular();
                return browser.driver.isElementPresent(by.name('password'));

            }
        }

    };

    module.exports = new LoginPage();

}());