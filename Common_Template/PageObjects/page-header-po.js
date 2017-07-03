/**
 * Copyright (c) 2013 - 2014 GE Global Research. All rights reserved.
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

(function () {

    'use strict';

    var PageHeader = function () {

        return {

            getAlertsTab : function () {
                return element(by.cssContainingText('li a.dropdown-toggle', 'Alerts'));
            },

            getAlertsInbox : function () {
                return element.all(by.css('span.labellinks')).get(0);
            },

            getAlertsHistory : function () {
                return element(by.cssContainingText('span.labellinks', 'History'));
            },

            getAdminTab : function () {
                return element(by.cssContainingText('a.dropdown-toggle', 'Admin'));
            },
            getMonitoringTab : function () {
                return element(by.cssContainingText('li a.dropdown-toggle', 'Monitoring'));
            },

            getApmTitle : function () {

                return element(by.cssContatainingText('a span','Asset Performance Management'));
            },

            getUserDropDown : function () {
                return element.all(by.css('button.dropdown-toggle')).get(1);

            },
            getLogOutOption : function () {
                return element(by.cssContainingText('li a','Logout'));
            },
            getViewProfile : function () {
                return element.all(by.cssContainingText('li a','View Profile')).get(0);
            },
            getUsersLink : function () {
                return element(by.cssContainingText('span.ng-binding', 'Users'));
            },

            getRolesLinkFromLanding : function() {

                return element(by.cssContainingText('span.ng-binding', 'Roles'));
            },
            getRolesLink : function () {
                return element(by.cssContainingText('li a', 'Roles'));
            },

            getAlertHistoryLink : function () {

                return element(by.cssContainingText('li a', 'Alert History'))
            },

            getLandingCover : function(){
                return element(by.css('div.landingcover'));
            },
            getHelpBtn : function(){
                return element.all(by.css('a.btn i.icon-question-sign')).get(0);
            },

            clickAuthPageLogout: function() {

                return element.all(by.css('ul.dropdown-menu.pull-right li a')).get(3).click();
            },

            clickViewProfile : function() {
                return this.getViewProfile().click();

            },

            clickHeaderLogOut: function() {

                return element(by.css('div.logoutlink a')).click();
            },

            // TODO :  add properties and accessors

            logout : function () {

                var header = this;
                return header.getUserDropDown()
                .click()
                .then(function() {

                    element.all(by.cssContainingText('li a','Logout')).get(1).click() ;

                },30000);
            },

            authlogout : function () {

                var header = this;
              return  element.all(by.css('button.dropdown-toggle')).get(1)
                    .click()
                    .then(function() {

                        element.all(by.css('ul.dropdown-menu.pull-right li a')).get(4).click() ;

                    },30000);


            },


            navTo : function (tab) {
                var nameFxnMap = {
                    alerts: 'getAlertsTab',

                    admin: 'getAdminTab'

                };

                var isAngularPage = /(orchestrations|dispatchRules|assetGroups|projects)/.test(tab);
                var header = this;
                var deferred = protractor.promise.defer();

                this[nameFxnMap[tab]]()
                    .click()
                    .then(function() {
                        header.handleBrowserAlert("accept");
                        browser.ignoreSynchronization = !isAngularPage; //For Angular page, set ignoreSynchronization to false
                        deferred.fulfill();
                    });
                return deferred.promise;
            },


            viewProfile : function() {

                var header = this;
                return header.getUserDropDown()
                    .click()
                    .then(function() {
                        header.getViewProfile().click()
                    });

            },

            accessUsersPage : function() {

                var header = this;
                return header.navTo('admin')

                    .then(function() {
                        header.getUsersLink().click()
                    });

            },

            accessRolesPage : function() {

                var header = this;
                return header.navTo('admin')

                    .then(function() {
                        header.getRolesLink().click()
                    });

            },

            accessAlertHistoryPage : function() {

                var header = this;
                return header.navTo('alerts')

                    .then(function() {
                        header.getAlertHistoryLink().click()
                    });


            },


            handleBrowserAlert : function(action) {
                   try {
                       browser.driver.switchTo().alert()
                           .then(
                           function (alert) {
                               (action == "accept") ? alert.accept() : alert.dismiss();
                           },
                           function (err) {
                           }
                       );
                   }
                catch(ignore){}
             }
        }

    };




    module.exports = new PageHeader();

}())
