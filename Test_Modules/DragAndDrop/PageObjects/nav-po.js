/**
 * Created by 212350438 on 5/9/16.
 */

/*
 * navPage
 * This page object is for test navigation of ui-app-hub
 *
 * */

'use strict';

var navPage = function() {

    return {
        getNavBar: function(){
            return element(by.css('aside.pxh-drawer'));
        },
        getTitle: function(){
            return element(by.css('aside.pxh-drawer .pxh-drawer-header a')).getText();
        },
        getNavToggleButton: function(){
            return  element(by.css('body aside.pxh-drawer > div.pxh-drawer-toggle > a'));
        },
        clickNavToggleButton: function(){
            return  this.getNavToggleButton().click();
        },
        getMicroApp: function(appName){
            return  element(by.cssContainingText('body aside.pxh-drawer nav.pxh-navigation ul li a div.pxh-navigation__item-text',appName));
        },
        getSubMenuItem: function(name){

            return element(by.cssContainingText('ul.pxh-navigation__sub-list li a',name));
        },
        clickSubMenuItem: function(name){
            return element(by.cssContainingText('ul.pxh-navigation__sub-list li a',name)).click();

        },
        clickMicroApp: function(appName){
            return  TestHelperPO.elementToBeClickable(element(by.cssContainingText('body aside.pxh-drawer nav.pxh-navigation ul li a div.pxh-navigation__item-text',appName)));
        },
        switchAppTo: function(appName){
            return  this.getMicroApp(appName).click();
        },
        getUserButton: function() {
            return  element(by.css('body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name'));
        },
        clickUserButton: function(){
            return  this.getUserButton().click();
        },
        getUserSettingsButton: function() {
            return  element(by.css('body > aside.pxh-drawer div.pxh-login div.pxh-login__settings'));
        },
        clickUserSettingsButton: function(){
            return  this.getUserSettingsButton().click();
        },
        getUserLoginMenu: function() {
            return  element(by.css('body > aside.pxh-drawer div.pxh-login div.pxh-login-menu--profile ul'));
        },
        getUserSettingsMenu: function() {
            return  element(by.css('body > aside.pxh-drawer div.pxh-login div.pxh-login-menu--settings ul'));
        },
        getUserLogoutButton: function(){
            return element(by.cssContainingText('body > aside.pxh-drawer div.pxh-login-menu--profile ul li a div.pxh-navigation__item-text','Sign Out'));
        },
        clickUserLogoutButton: function(){
            return  this.getUserLogoutButton().click();
        },
        getChromeless: function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                if (url.lastIndexOf('#/') == url.length - 2) {
                    url = url.slice(0, url.length - 2);
                }
                url = url + '?chromeless=true/#/';
                browser.get(url).then(function(url) {
                    return /#/.test(url);
                });
            });
        },
        navigateAwayFromChromeless: function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                if (url.indexOf('?chromeless=true/#/') > -1) {
                    url = url.replace("?chromeless=true/#/", '');
                    browser.get(url).then(function(url) {
                        return /#/.test(url);
                    });
                }
            });
        }
    };
};
module.exports = new navPage();
