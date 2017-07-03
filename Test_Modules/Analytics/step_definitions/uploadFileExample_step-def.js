/**
 * Main step definition. Add all glue code here in this class
 */
var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {


    'use strict';

    this.Given(/^The application is authenticated$/, function (callback) {
        //
        browser.driver.get("https://viljamis.com/filetest/").then(function () {
            browser.ignoreSynchronization = true;
            cem.findElement('geSSOPage', 'username').sendKeys(commonTestData.sso);
            cem.findElement('geSSOPage', 'password').sendKeys(commonTestData.password);
            cem.findElement('geSSOPage', 'password').sendKeys(protractor.Key.ENTER).then(function(){
                callback();
            })

        });
    });

    this.Then(/^I can select Analytic Tab and select a file$/, function (callback) {

        var path = require('path');

        var tes= cem.findElement('analyticPage','uploadFile');

        var fileToUpload = '/Users/212556710/Desktop/2.png'
        var  absolutePath = path.resolve(__dirname, fileToUpload);
        TestHelper.uploadFile(fileToUpload);
            cem.findElement('analyticPage','uploadButton2').click().then(function(){
                browser.pause();
        });

    });

};
module.exports = myStepDefinitionsWrapper;









