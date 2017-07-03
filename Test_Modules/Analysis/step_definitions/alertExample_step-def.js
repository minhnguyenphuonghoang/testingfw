/**
 * Main step definition. Add all glue code here in this class
 */
var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {


    'use strict';
    this.Given(/^The application is authenticated$/, function (callback) {
        browser.ignoreSynchronization = true;

        browser.driver.get("http://www.javascriptkit.com/javatutors/alert2.shtml").then(function () {
            cem.findElement('geSSOPage', 'username').sendKeys(commonTestData.sso);
            cem.findElement('geSSOPage', 'password').sendKeys(commonTestData.password);
            cem.findElement( 'geSSOPage', 'password').sendKeys(protractor.Key.ENTER)

            var test = cem.findElement('testDialogPage', 'button');

            //browser.switchTo().frame(test);
            browser.getCurrentUrl().then(function(result){
                console.log(result);
            })
           // test.click();
            TestHelper.elementToBeClickable('testDialogPage', 'button').then(function(){
                TestHelper.alertsIsPresent().then(function(){
                    console.log("Alert is present");
            //browser.sleep(5000);
                //browser.wait(browser.driver.ExpectedConditions.alertIsPresent(), 10000);
                browser.switchTo().alert().accept();
                browser.switchTo().alert().accept();
                    callback();
                    });
               })

           // })

            //test.isPresent().then(function () {
            //    test.click();
            //    browser.pause();
            //    //callback();
            //});
        });
    });

    this.Then(/^I can select Asset Management and view tenant from context$/, function (callback) {
            callback();
    });

};
module.exports = myStepDefinitionsWrapper;









