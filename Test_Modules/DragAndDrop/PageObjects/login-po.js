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


   // var loginUrl = 'http://apm-application-dev.grc-apps.svc.ice.ge.com' ,
   // var testData = require('../../testdata/TestData.js');
   // var helper = require('../../utils/TestHelper.js');
    var authUrl = 'http://apm-token-stage.grc-apps.svc.ice.ge.com/';
    var loginUrl = 'http://apm-application-qa.grc-apps.svc.ice.ge.com' ;


    var LoginPage = function () {

        return {

            getAuthUrl: function() {
                return browser.get(authUrl);
                browser.waitForAngular();

            },

            getUrl: function(url) {

                return browser.get(url);
                browser.waitForAngular();
            },

            get: function () {


                return browser.get(browser.params.login.baseUrl);
                browser.waitForAngular();
            },

            getNameField: function () {
                return element(by.name('username'));
            },
            setName: function (username) {
                return this.getNameField().sendKeys(username);
            },

            getEulaModalBtn: function() {

               return element(by.css('div.modal-content button.btn'));
            },

            getPredixLoginBtn:function(){

                return element(by.css('input.btn'));
            },

            clearName: function () {
                return this.getNameField().clear();
            },
            clickEulaModalBtn: function() {
                    var loginpage = this;
                    //return element.all(by.css('button.close')).get(0).click();
                    return loginpage.getEulaModalBtn()
                        .click()
            },

            getPasswordField: function () {
                return element(by.name('password'));
            },
            setPassword: function (password) {
                return this.getPasswordField().sendKeys(password);
            },
            clearPassword: function () {
                return this.getPasswordField().clear();
            },


            getLoginBtn: function () {
                return element(by.css('input#submitFrm'));
            },
            clickLogin: function () {
  //              input.sendKeys(protractor.Key.ENTER);
                return this.getPasswordField().sendKeys(protractor.Key.ENTER);
 //               return this.getPredixLoginBtn().click();
            },

            getAlertErrorBox: function () {
                return element(by.css('div b'));
            },
            getAlertErrorText: function () {
                return this.getAlertErrorBox().getText();
            },

            getAlertSuccessBox: function () {
                return element(by.css('div.alert-success'));
            },
            getAlertSuccessText: function () {
                return this.getAlertSuccessBox().getText();
            },

            loginAs: function (username, password) {

                var self = this;

                return protractor.promise.all([
                        this.setName(username),
                        this.setPassword(password)
                    ],3000).then(function () {
                        self.clickLogin();
                    });

            },

            getAuthToken: function(username, password) {

                this.loginAs(username,password)

                browser.ignoreSynchronization = true;

                loginPage.getAuthUrl()
                    .then(function () {
                        browser.ignoreSynchronization = true;

                        loginPage.loginAs(browser.params.loginAsAdmin.username, browser.params.loginAsAdmin.password)
                        browser.sleep(3000);
                        element(by.css('div.module-body code')).getText()
                            .then(function(txt){
                                console.log(txt);
                            })


                    });


            },

            invalidLoginErrorMsg: function(){
                return element(by.css('p'));
            },

            loginAsAdmin: function () {
                return this.loginAs(testData.admin_username, testData.admin_password);
            },

            clearAll: function () {
                return protractor.promise.all([
                    this.clearName(),
                    this.clearPassword()
                ]);
            },
            getLogin: function (url) {
                browser.driver.get(url);
                browser.ignoreSynchronization = true;
                browser.manage().deleteAllCookies();
                browser.sleep(10000);
                return browser.driver.findElement(by.xpath('//*[@value="Sign in"]')).isDisplayed();
            }
        }

    };

    module.exports = new LoginPage();

}());