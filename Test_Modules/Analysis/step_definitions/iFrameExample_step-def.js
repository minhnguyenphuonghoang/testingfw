/**
 * Main step definition. Add all glue code here in this class
 */
var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {

    'use strict';
    this.Given(/^The application is authenticated$/, function (callback) {
        browser.ignoreSynchronization = true;
        var test;
        browser.driver.get("http://www.w3schools.com/html/html_iframe.asp").then(function () {
            cem.findElement('geSSOPage', 'username').sendKeys(commonTestData.sso);
            cem.findElement('geSSOPage', 'password').sendKeys(commonTestData.password);
            cem.findElement( 'geSSOPage', 'password').sendKeys(protractor.Key.ENTER)


                //Switching to an iFrame locator which is defined in object repository
                TestHelper.iFrameSwitch('testDialogPage', 'iframe').then(function(){
                    console.log("Switched container")
                    callback();
            });
    });
    });

    this.Then(/^I can select Asset Management and view tenant from context$/, function (callback) {
       //After switching to iFrame, I can do anything with the elements inside that iFrame
        TestHelper.getText('testDialogPage','headerCheck').then(function(text){
            console.log("Here is the text: "+ text);

            //When finished using iFrame, switch back to default content
            browser.switchTo().defaultContent();
            callback();
            });
        });

};
module.exports = myStepDefinitionsWrapper;









