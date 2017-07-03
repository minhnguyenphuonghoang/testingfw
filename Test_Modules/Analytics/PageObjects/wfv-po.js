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

    var currentPage = 'wfvPage';
    var chart = require('ProUI-Utils').HighChart;
    var section;

    var WFVPage = function () {

        return {

            get: function (url) {
                return browser.driver.get(url);
                browser.waitForAngular();
            },

            setName: function (username) {
                return elementManager.findElement(currentPage, 'username').sendKeys(username);
            },

            setPassword: function (password) {
                return elementManager.findElement(currentPage, 'password').sendKeys(password);
            },

            clickLogin: function () {
                return elementManager.findElement(currentPage, 'password').sendKeys(protractor.Key.ENTER);
            },

            getLogin: function (url) {
                browser.driver.get(url)
                return browser.driver.isElementPresent(by.id('USER'));
				//return browser.driver.isElementPresent(by.id('username'));
            },

            checkHomePage: function () {
                browser.waitForAngular();
                var logo = elementManager.findElement(currentPage, 'geLogo');
                return logo.isPresent();
            },

            checkDashboardLink: function () {
                var dashboardLink = elementManager.findElement(currentPage, 'dashboardLink');
                return dashboardLink.isPresent();
            },

            checkLogout: function () {
                //browser.waitForAngular();
                return browser.driver.isElementPresent(by.id('username'));
            },

            selectFleetCustomer: function (customerName) {
                var deferred = protractor.promise.defer();
                var fleetTable = elementManager.findElement(currentPage, 'fleetTable');
                fleetTable.all(by.css('tbody tr')).filter(function (row) {
                    return row.element(by.css('a.fleetcustomername'))
                        .getText().then(function (text) {
                            return text === customerName;
                        })
                }).then(function (rows) {
                    if (rows.length == 1) {
                        rows[0].element(by.css('a.fleetcustomername')).click().then(function () {
                            deferred.fulfill();
                        })
                    }
                    else if (rows.length == 0) {
                        deferred.reject(new Error('Customer "' + customerName + '" not found'));
                    }
                    else {
                        deferred.reject(new Error('More than one customers found with name "' + customerName + '"'));
                    }
                })
                return deferred.promise;
            },

            setChart: function () {
				section = elementManager.findElement(currentPage, 'section');
                console.log("test");
                chart.setChartElements(section);
            },

            isChartVisibile: function () {
                return chart.isChartDisplayed();
            },

            getXAxisLabels: function () {
                return chart.getXaxisLabels();
            },

            getYAxisLabels: function () {
                return chart.getYaxisLabels();
            },

            getLegends: function() {
                return chart.getLegendsFromSection();
            }
        }
    };

    module.exports = new WFVPage();
}());