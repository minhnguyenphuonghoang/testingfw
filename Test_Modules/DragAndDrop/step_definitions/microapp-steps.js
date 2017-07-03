var chai = require('chai');
var path = require('path');

var Cucumber = require('cucumber');
var fs = require('fs');

var expect = chai.expect;
//var loginPage = require('./../pages/archive/login-po');
//var helper = require('../utils/TestHelper');
//var testData = require('../testdata/TestData.js');
//var pageHeader = require('../pages/archive/page-header-po.js');
var jsonFormatter = Cucumber.Listener.JsonFormatter();




module.exports = function() {


    this.Then(/^it should have navigation element as expected$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        expect(navPage.getNavBar().isPresent()).to.eventually.be.eql(true).notify(callback)


    });

    this.When(/^I click on the first case from the cases inbox$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all(by.css('li.case-inbox-item')).get(0).click().then(function(){
            callback()
        })

    });

    this.Then(/^case details page should display with the required fields$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        expect( element(by.css('div.case-details-header')).isPresent()).to.eventually.be.eql(true)
        expect( element(by.css('button#claim-case-button')).isPresent()).to.eventually.be.eql(true).notify(callback)


    });

    this.When(/^I click on the add profile button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.css('button i.fa-plus')).click().then(function(){
         callback();
        })

    });

    this.Then(/^the add profile template should have the required fields$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        expect( element(by.css('div.alert-profile')).isPresent()).to.eventually.be.eql(true)
        expect( element(by.css('button#profileTypeDropdown span')).getText()).to.eventually.be.eql('Generic')
       expect( element(by.css('button#profileSourceDropdown span')).getText()).to.eventually.be.eql('SmartSignal').notify(callback)

    });

    this.Then(/^it should have navigation title as expected$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        expect(navPage.getTitle()).to.eventually.be.eql('Predix').notify(callback)

    });


    this.When(/^I click on the profile settings menu on the left\-nav bar$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element(by.css('div.pxh-login__caret')).click()
            .then(function(){
               // element.all(by.css('a.pxh-login-menu__link')).get(1).click().then(function(){
                    callback();
                })



    });

    this.Then(/^the add profile template appears with required fields$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        browser.sleep(5000);

        expect(element(by.css('input#profileNameField')).isDisplayed()).to.eventually.be.eql(true);


        expect(element(by.css('button#profileTypeDropdown')).getText()).to.not.equal(" ");

        expect(element(by.css('button#profileSourceDropdown')).getText()).to.not.equal(" ").notify(callback);


    });

    this.Then(/^the Analytic creation page should load with the requried elements$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        expect(element(by.css('div.create button')).isDisplayed()).to.eventually.be.eql(true).notify(callback)

    });



    this.Then(/^I should see the profile and signout options$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
       // expect(element.all(by.css('a.pxh-login-menu__link')).count()).to.eventually.be.eql(2);

        expect(element.all(by.css('a.pxh-login-menu__link')).get(1).getText()).to.eventually.be.eql('Sign Out');

        expect(element.all(by.css('a.pxh-login-menu__link')).get(2).getText()).to.eventually.be.eql('MyProfile');
        callback();
    });

    this.When(/^I click on the signout option$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all(by.css('a.pxh-login-menu__link')).get(1).click().then(function(){
            callback();
        })
    });


    this.Then(/^the "([^"]*)" menu item is present$/, function (arg1, callback) {

        // Write code here that turns the phrase above into concrete actions

        expect(navPage.getMicroApp(arg1).isPresent()).to.eventually.be.eql(true).notify(callback)

    });

    this.Then(/^the "([^"]*)" sub menu item is present$/, function (arg1, callback) {

        // Write code here that turns the phrase above into concrete actions

        expect(navPage.getSubMenuItem(arg1).isPresent()).to.eventually.be.eql(true).notify(callback)

    });

    this.When(/^I click on the "([^"]*)" microapp link on the left nav$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions

        TestHelperPO.isElementPresent(element(by.css('body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name'))).then(function () {

            navPage.clickMicroApp(arg1).then(function () {

                analysisPage.getContextBrowser().then(function (isPresent) {
                    console.log("Context browser is displayed: " + isPresent);
                    callback();
                });
            });
        });
    });


    this.Then(/^the alert profiles listings page should load$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions


        expect(element.all(by.repeater('profile in profileList')).count()).to.not.equal(0).notify(callback)


    });


    this.When(/^I click on the "([^"]*)" microapp link from the left nav$/, function (arg1, callback) {
//
//        browser.waitForAngular();
//        browser.sleep( 10000 );
        browser.driver.isElementPresent( by.css( 'body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name' ) ).then( function (isPresent) {
            isPresent = (isPresent) ? true : browser.wait( function () {
                return browser.driver.isElementPresent( by.css( 'body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name' ) );
            }, 5000 );

        } ).then( function () {

                navPage.clickMicroApp(arg1)
                    .then( function () {

                       callback();

                    } )


            } )



    });

    this.When(/^I click on the "([^"]*)" microapp link from the left nav if applicable "([^"]*)"$/, function (arg1,arg2, callback) {
//
//        browser.waitForAngular();
//        browser.sleep( 10000 );
        if (arg2 == "analysisManager") {

        browser.driver.isElementPresent(by.css('body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name')).then(function (isPresent) {
            isPresent = (isPresent) ? true : browser.wait(function () {
                return browser.driver.isElementPresent(by.css('body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name'));
            }, 5000);

        }).then(function () {

            navPage.clickMicroApp(arg1)
                .then(function () {

                    callback();

                })
        })

    } else if ((arg2 == "create")||(arg2 == "createAndView")||(arg2 == "view")){
            // do nothing
            callback();

        }

    });

    this.When(/^the "([^"]*)" sub menu item is clicked$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        navPage.getSubMenuItem(arg1).click();
        callback();
    });


    this.When(/^I click on the "([^"]*)" microapp link from the left nav for the dashboard page to load$/, function (arg1, callback) {
//
//        browser.waitForAngular();
//        browser.sleep( 10000 );
        browser.driver.isElementPresent( by.css( 'body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name' ) ).then( function (isPresent) {
            isPresent = (isPresent) ? true : browser.wait( function () {
                return browser.driver.isElementPresent( by.css( 'body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name' ) );
            }, 5000 );

        } ).then( function () {

                navPage.clickMicroApp(arg1)
                    .then( function () {

                        browser.waitForAngular();
                        browser.driver.isElementPresent( by.css( 'div#columnBrowser' ) ).then( function (isPresent) {
                            isPresent = (isPresent) ? true : browser.wait( function () {
                                return browser.driver.isElementPresent( by.css( 'div#columnBrowser' ) );
                            }, 15000 );

                        } )

                            .then( function () {
                                callback();
                            } );


                    } )


            } )



    });


    this.AfterFeatures(function (features, callback) {


        jsonFormatter.log = function (json) {
            var obj = JSON.parse(json),
                featureName,
                snapshotPath = path.resolve('./Reports'),
                filepath;


            if (obj && obj[0]) {
// Or make a uniquer name
                featureName = obj[0].name || 'noName';

// overwrite id, name and uri to get unique report per feature
                obj[0].id = obj[0].name = obj[0].uri = featureName;

                filepath = path.resolve(snapshotPath, 'cucumber.' + featureName + '..report.json');
                console.log(snapshotPath + '********************');
                console.log(filepath + 'AAA');
                fs.writeFile(filepath, JSON.stringify(obj), function (error) {
                    if (error) {
                        throw error;
                    }
                });
            }
        };
        callback();

    });

    this.registerListener(jsonFormatter);



};