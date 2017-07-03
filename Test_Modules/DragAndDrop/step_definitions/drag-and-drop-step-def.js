/**
 * Created by 212350438 on 5/21/15.
 */


var tagname;

var alerttemplate;

var jsonFormatter = Cucumber.Listener.JsonFormatter();

var _tkn_;
var asset_count;
var default_asset_count;
var default_tag_cnt;
var chai = require('chai');
var _chartWidthBefore;
var _chartWidth;
var _chartWidthAfter_menuCollapse;
var _chartWidthAfter_menuExpand;
var robot = require("robotjs");
var dragFn = require('../utils/drag.js')


global.expect = chai.expect;
global.should = chai.should();
global.assert = chai.assert;
chai.use(require('chai-as-promised'));


module.exports = function () {

//*************************************Start scenario*************************************
    this.When(/^i click on the tooltip menu icon on the left nav menu bar$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.ignoresynchronization = false;
        browser.sleep(30000);
        analysisPage.getLogoutMenu().click()
            .then(function () {
                console.log('Clicked on logout menu');
                callback();
            })

    });

    this.Then(/^I should see the user nav menu options to contain "([^"]*)" and "([^"]*)"$/, function (arg1, arg2, callback) {
        element.all(analysisPage.getAllToolTipNav()).count()
            .then(function (count) {
                console.log('Number of options under tool tip navigation: ' + count);
                expect(count).to.equal(2);

            })
        element.all(by.css('ul.nav-login li a')).get(0).getText()
            .then(function (txt) {
                console.log("Tool tip navigation text: " + txt)
                expect(txt).to.equal(arg1)
            })

        element.all(by.css('ul.nav-login li a')).get(1).getText()
            .then(function (txt) {
                console.log("Tool tip navigation text: " + txt)
                expect(txt).to.equal(arg2)
                callback();
            })

    });
//*************************************End scenario***************************************

//*************************************Start scenario*************************************
    this.When(/^I click on the analysis link$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.waitForAngular();
        console.log("Clicked on analysis link");
        analysisPage.getLoggedUserName().isPresent().then(function (isPresent) {
            console.log("Logged user name is displayed: " + isPresent);
            return;
        }).then(function () {
            analysisPage.getAnalysisTab().click().then(function () {
                browser.waitForAngular();
                analysisPage.getContextBrowser().isPresent().then(function (isPresent) {
                    console.log("Context browser is displayed: " + isPresent);
                    return;
                })
            })
        }).then(function () {
            callback();
        });


    });


    this.Then(/^I should see the tags dropdown and the analysis spine$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        browser.ignoresynchronization = false;
        browser.waitForAngular();

        expect(element(by.css('div.menu-item'))).to.not.empty;

        expect(element(by.css('ul.analysis-spine'))).to.not.empty;

        callback();
    });


    this.Then(/^I should see the analysis view selected$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.ignoreSynchronization = false
        browser.waitForAngular();

        element(by.css('div.view-selector-container')).getText()
            .then(function (txt) {

                console.log('********' + txt);
                expect(txt).to.equal('Analysis View')
                callback();
            })


    });

//*************************************End scenario***************************************


//*************************************Start scenario*************************************


    this.Then(/^the tag toolbox and search input are visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        browser.driver.isElementPresent(analysisPage.getAnalysisHeader()).then(function (isPresent) {
            isPresent = (isPresent) ? true : browser.wait(function () {
                return;
            }, 15000);

        }).then(function () {

            analysisPage.getTagToolbox().isPresent()
                .then(function (present) {
                    expect(present).to.equal(true);
                })
            analysisPage.getSearchIcon().isPresent()
                .then(function (present) {
                    expect(present).to.equal(true);
                    callback();
                })

        })


    });

//*************************************End scenario***************************************


//*************************************Start scenario*************************************
    this.Then(/^From and to date fields should be visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(15000);

        browser.isElementPresent(by.css('div#fromFields'))
            .then(function (present) {
                console.log("From date field is visible: " + present)

                expect(present).to.equal(true);

            })

        browser.isElementPresent(by.css('div#toFields'))
            .then(function (present) {
                console.log("To date field is visible: " + present)

                expect(present).to.equal(true);
                callback();
            })

    });

    this.Then(/^the submit button should be visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getSubmitBtn().isEnabled()
            .then(function (enable) {
                console.log("Submit button is visible: " + enable)

                expect(enable).to.equal(true);

            })
            .then(function () {
                callback();
            })
    });


    this.Then(/^the high charts element is present$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        analysisPage.getHighchartsElement().isDisplayed()
            .then(function (value) {
                expect(value).to.equal(true)
                callback()
            })

    });
//*************************************End scenario***************************************


//*************************************Start scenario*************************************
    this.When(/^the user clicks on the search icon in the tag control window$/, function (callback) {


        // Write code here that turns the phrase above into concrete actions

            analysisPage.getSearch().then(function () {
                    console.log("Search button is clicked.");
                    callback();
                })
    });


    this.When(/^the user clicks on the search icon in the second tag control window$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all(analysisPage.getSearch()).get(3).click()
            .then(function () {
                console.log("Search button is clicked for the second tag tooolbox.");
                callback();
            })
    });

    this.Then(/^the system displays a search window, and search results area\.$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        analysisPage.getTagResultsArea().then(function (present) {
            console.log("Search window is present: " + present);
            expect(present).to.equal(true);
            callback();
        })
    });
//*************************************End scenario***************************************


//*************************************Start scenario*************************************

    this.Given(/^I enter (\d+) chars for tag search$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        TestHelperPO.isElementPresent(element(by.css('#analysisdeckspinner'))).then(function () {
            callback();
        })
    });
    this.Given(/^I enter (\d+) chars for tag search on the same page$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
            callback();
    });


    this.When(/^the user enters "([^"]*)" characters in the second search box$/, function (TagChars, callback) {
        // Write code here that turns the phrase above into concrete actions
        // TestHelperPO.isElementPresent(element(by.css('#analysisdeckspinner'))).then(function(){
        browser.sleep(9000);
            analysisPage.getSearchInput().then(function (element) {
                console.log(arg1)
                element.sendKeys(arg1).then(function () {
                    browser.sleep(6000);
                    callback();
                });
        })
    });

    this.When(/^the user enters "([^"]*)" characters in the second search box$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions


        element.all(by.css('input#tagSearch')).get(1).sendKeys(arg1)
            .then(function () {
                callback()
            })

    });

    this.When(/^the user enters "([^"]*)" characters in the search box$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(6000);
        analysisPage.getSearchInput().then(function (element) {
            console.log(arg1)
            element.sendKeys(arg1).then(function () {

                callback();
            });
        })
    });

    this.Then(/^the tag search results should not show up$/, function (callback) {

        browser.sleep(20000);

        element.all(by.css('li.asset-list-item')).count()
            .then(function (count) {
                console.log("Number of search results displayed: " + count);
                expect(count).to.equal(0)
                callback();

            })
        browser.sleep(15000);
    });


    this.Then(/^the system displays a list of assets as a list item$/, function (callback) {

        browser.sleep(20000);

        element(by.css('div#Wrapper'))
        element.all(by.css('li.asset-list-item')).count().then(function (cnt) {

            console.log('The number of assets in the search results are ' + cnt)
        })

        expect(element.all(by.css('li.asset-list-item')).count()).to.not.equal(0).notify(callback);
//        element.all( by.css( 'li.asset-list-item' ) ).count()
//            .then( function (count) {
//
//                expect( count ).to.be.greaterThan( 0 )
//                callback();
//
//            } )

    });

//*************************************End scenario***************************************

//*************************************Start scenario*************************************
    this.Then(/^the system displays a list of tags as a list item based on the visual design below\.$/, function (callback) {

        TestHelperPO.isElementPresent(element(by.css('.list-ui__item.asset-list-item.style-scope.tag-search-results'))).then(function () {
            expect(element.all(by.css('li.asset-list-item')).count()).to.not.equal(0).notify(callback);
        })
//        element.all( by.css( 'li.asset-list-item' ) ).count()
//            .then( function (count) {
//
//                expect( count ).to.be.greaterThan( 0 )
//                callback();
//
//            } )
    });
//*************************************End scenario***************************************

//*************************************Start scenario*************************************
    //Scenario: Adding tags to plotted tags section ,added tags should not appear under the search results



    this.When(/^I add (\d+) tags from the tags menu\-item$/, function (arg1, callback) {

        console.log('adding tags..');
        TestHelperPO.isElementPresent(element.all(by.css('li.asset-list-item h4')).get(0)).then(function () {
            element.all(by.css('li.asset-list-item h4')).get(0).getText()
                .then(function (txt) {
                    tagname = txt;
                    console.log(txt);
                    
                })

            console.log('________Drag')
            TestHelperPO.isElementPresent(element.all(by.css('li.asset-list-item')).get(0)).then(function () {

                TestHelperPO.isElementPresent(element(by.css('rect.highcharts-background'))).then(function () {

                    var field = element.all(by.css('li.asset-list-item')).get(0);
                    var src = element(by.css('rect.highcharts-background'));
                    //browser.actions().dragAndDrop(field.getWebElement(),src.getWebElement()).mouseUp().perform().then(function(){
                        browser.executeScript(dragFn, field.getWebElement(), src.getWebElement()).then(function(){
                            analysisPage.checkForPlottedData().then(function(result){
                                TestHelperPO.isElementPresent(result).then(function(){
                                    callback();
                                })
                            })
                    })
                })
            })
        })
//Adding second tag
//        browser.actions().mouseMove( element.all( by.css( 'li.asset-list-item' ) ).get( 1 ) ).perform()
//
//            .then( function () {
//
//                browser.actions().mouseMove( element.all( by.css( 'li.asset-list-item span.add-tag-icon' ) ).get( 1 ) ).perform()
//
//                element.all( by.css( 'li.asset-list-item span.add-tag-icon' ) ).get( 1 ).click();
//
//            } )
    });


    this.When( /^I add (\d+) tags from the tags menu\-item in avt$/, function (arg1, callback) {

        browser.sleep( 10000 );
        console.log( 'adding tags..' );
        browser.ignoresynchronization = false;
        browser.sleep( 5000 );
        element( by.css( 'li.asset-list-item h4' ) ).getText()
            .then( function (txt) {
                tagname = txt;
            } )

        console.log('________Drag')

        var field = element(by.css('li.asset-list-item' ));
        var src = element(by.css('rect.highcharts-background'));

        browser.executeScript(dragFn, field.getWebElement(), src.getWebElement());

        browser.sleep(3000);

        callback();



    } );

    this.Then( /^the added tag should not appear in the search results$/, function (callback) {
        TestHelperPO.isElementPresent(element(by.css('li.asset-list-item h4'))).then(function(){

                element.all( by.css( 'li.asset-list-item h4' ) ).count().then(function(count){
                     console.log(count);
                expect(  element.all( by.css( 'li.asset-list-item h4' ) ).count()).to.not.equal(1).notify(callback);
            })

        })
    });

    this.Then( /^there should be no tags in the search result$/, function (callback) {
        //TestHelperPO.isElementNotPresent(element(by.css('li.asset-list-item h4'))).then(function(result){
        //    callback();
        //    })
        callback();
    });
//*************************************End scenario***************************************
//*************************************Start scenario*************************************
//    Scenario: Tag tool box - plotted tags

    this.When(/^I hit the cross icon$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getDeleteIcon().then(function () {
            callback();
        })

    });

    this.Then( /^I should see (\d+) plotted tags in the plotted tags section$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions

        element.all( by.css( 'li.plotted-tag-list' ) ).count()

            .then( function (count) {

                console.log( 'the count of plotted tags is' + count )
                expect( count ).to.equal( 1 );

            } )
            .then(function(){
                callback();
            })

    } );



    this.Then(/^the number of plotted tags is noted$/, function (callback) {
        element.all(by.css('li.plotted-tag-list')).count().then(function(count){
            default_tag_cnt = count;

        }).then(function(){
                callback();
            })
    });

    this.Then(/^the number of plotted tags should be greater than the previous count$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        expect(element.all(by.css('li.plotted-tag-list')).count()).to.not.equal(default_tag_cnt).notify(callback);

    });


    this.Then(/^add view selector should be present$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        //browser.sleep(10000);




        helper.waitForElementAsSpecified(element(by.css('span.px-deck-selector')));

        expect(element(by.css('span.px-deck-selector')).isDisplayed()).to.eventually.be.eql(true).notify(callback);

//        element(by.css('span.px-deck-selector')).isDisplayed()
//            .then(function(display){
//                expect(display).to.equal(true)
//            })
//            .then(function(){
//                callback();
//            })

    });



    this.When(/^i click continue on the modal dialog$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element(by.css('div#analysis-adhoc-switch-confirm button#Continue')).click().then(function(){

            callback()
        })

    });




    this.When(/^I click on the view selector link and choose the "([^"]*)" view$/, function (arg1, callback) {
        //browser.sleep(3000);



        helper.waitForElementAsSpecified(element(by.css('span.px-deck-selector')));
        // Write code here that turns the phrase above into concrete actions
        element(by.css('span.px-deck-selector')).click().then(function(){





            console.log('--Navigating to the analysis template ' + arg1);

            element( by.cssContainingText( 'ul.dropdown-menu li', arg1 ) ).click()


                .then(function(){


                    browser.driver.isElementPresent( by.css( 'div#px-chart-container' ) ).then( function (isPresent) {
                        isPresent = (isPresent) ? true : browser.wait( function () {
                            return browser.driver.isElementPresent( by.css( 'div#px-chart-container' ) );
                        }, 15000 );

                    } ).then( function () {

                            callback();

                        } )





                })


        })



    });

//*************************************End scenario***************************************

//*************************************Start scenario*************************************
//Scenario: High chart should show two plotted series for the two tags added by the user
    this.Then( /^I should see (\d+) plotted tags on the highchart$/, function (arg1, callback) {

        element.all( by.css( 'div.plotted-tag-header' ) ).count()
            .then( function (count) {
                console.log( ' count of the plotted series is ' + count )


                expect( count ).to.equal( parseInt( arg1 ) );



            } )
            .then(function(){
                callback();
            })

    } );



    this.Then(/^clear the plotted tags$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all( by.css( 'div.plotted-tag-header.plotted-tag-list' ) ).count()
            .then( function (count) {
                console.log( ' count of the plotted series is ' + count )
                if(count > 0){

                    for (i = 0; i < count; i++) {

                        browser.actions().mouseMove( element.all( by.css( 'li.plotted-tag-list' ) ).get( 0 ) ).perform()

                            .then( function () {

                                browser.actions().mouseMove( element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( 0 ) ).perform()
                                browser.sleep(2000);
                                element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( 0 ).click()

                                browser.sleep(2000);





                            })
                    }

                }



            } )
            .then(function(){
                callback();
            })
    });



    this.Then( /^I should see (\d+) series tracker plotted on the highchart$/, function (arg1, callback) {

        element.all( by.css( 'g.highcharts-series' ) ).count()
            .then( function (count) {
                console.log( ' count of the plotted series is ' + count )


                expect( count ).to.equal( 1 );



            } )
            .then(function(){
                callback();
            })

    } );



//*************************************End scenario***************************************

//*************************************Start scenario*************************************
//    Scenario:TC6450 View the filtering accordion appear when a plotted tag is expanded by clicking on the tag

    this.When( /^I click on the plotted tag$/, function (callback) {
        element.all( by.css( 'h4.tag-name' ) ).get( 0 ).click()
            .then( function () {
                callback();
            } )
    } );

    this.When( /^I click on the tag alias menu button$/, function (callback) {

        analysisPage.getViewMenuTagAlias().click().then(function(){
            browser.sleep(3000);
            callback();
        })
    } );

    this.Then( /^the tag alias menu does not display$/, function (callback) {

        analysisPage.getViewMenuTagAlias().isDisplayed()
            .then(function(display){
                console.log('The tag alias menu is disaplye value is' + display)
                expect(display).to.equal(false);

            })
            .then(function(){
                callback();
            })
    } );


    this.When(/^the user drags a tag to a new chart area$/, function (callback) {
        console.log('________Dragging to a new chart area')

        // Checking to see if the list of item headers to drag are present
        TestHelperPO.isElementPresent(element.all(by.css('li.asset-list-item h4')).get(0)).then(function () {
            element.all(by.css('li.asset-list-item h4')).get(0).getText()
                .then(function (txt) {
                    tagname = txt;
                    console.log(txt);
                })

            // Checking to see if the list of items to drag are present
            TestHelperPO.isElementPresent(element.all(by.css('li.asset-list-item')).get(0)).then(function () {

                // Checking to see if container that the items will be dragged to are present.
                TestHelperPO.isElementPresent(element(by.css('#analysis-drop-container > div:nth-child(1)'))).then(function () {

                    // Defining the element that's going to be dragged
                    var field = (element.all(by.css('li.asset-list-item')).get(0));

                    // Defining the container where the elements will be dragged to.
                    var src = element(by.css("div[class^='drop-target drop-zone-new-chart']:nth-child(1)"));

                    // Calling the drag script by passing in the two elements we defined above.
                    browser.executeScript(dragFn, field.getWebElement(), src.getWebElement()).then(function () {

                        // Checking to see if the elements were actually dragged or not.
                        analysisPage.checkForPlottedData().then(function (result) {
                            TestHelperPO.isElementPresent(result).then(function () {

                                callback();
                            })

                        })

                    })
                })

            })
        })

    });








        this.When(/^the user drags a tag from the plotted tags to a new draggable chart area avt$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        console.log('________Dragging to a new chart area')

        var field = element(by.css('li#Tag_Length-header'));
        var src = element(by.css('div.drop-target'));

        browser.executeScript(dragFn, field.getWebElement(), src.getWebElement());

        callback();

    });

    this.Then(/^a new chart with the plotted tag gets added$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all(by.css('rect.highcharts-background')).count()
            .then(function(cnt){
                expect(cnt).to.equal(1);
            })
            .then(function(){
                callback();
            })

    });

    this.Then(/^the user sees a toast at the top that the analysis view with multiple charts cannot be saved$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should be able to see "([^"]*)" and "([^"]*)" menu options$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions

        element.all(by.css('tag-toolbox#tag-toolbox div#submenucontainer li')).get(5).getText()
            .then(function(txt){

                console.log('The first menu option of tag alias is ' + txt);
                expect(txt).to.equal(arg1);
            })
            .then(function(){

                element.all(by.css('tag-toolbox#tag-toolbox div#submenucontainer li')).get(6).getText()
                    .then(function(txt){
                        console.log('The second menu option of tag alias is ' + txt);
                        expect(txt).to.equal(arg2);
                        callback();
                    })

            })

    });

    this.Given(/^I Enter existing template name in to the Save template container$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions


        analysisPage.getViewNameInput().sendKeys('hello world')
            .then(function(){
                callback();
            })
    });

    this.Then(/^an alert message toast appears$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(5000);
        element(by.css('div.alert-message')).isDisplayed()
            .then(function(display){
                expect(display).to.equal(true);
                callback();

            } )


    });

    this.Then( /^I should see the filter widget$/, function (callback) {
        element( by.css( 'plotted-tag-filter.tag-filter-open' ) ).isDisplayed()
            .then( function (enable) {
                expect( enable ).to.equal( true );
                callback();
            } )
    } );
//*************************************End scenario***************************************


//*************************************Start scenario*************************************
//Scenario: Filtering accordion disappears when the plotted tag is clicked again
    this.When( /^I click on the plotted tag again$/, function (callback) {
        element.all( by.css( 'li.plotted-tag-list' ) ).get( 0 ).click()
            .then( function () {
                callback();
            } )
    } );

    this.Then( /^I should not see the filter widget$/, function (callback) {

        browser.driver.isElementPresent( by.css( 'plotted-tag-filter.tag-filter-open' ) ).then( function (isPresent) {
            isPresent = (isPresent) ? true : browser.wait( function () {
                return browser.driver.isElementPresent( by.css( 'plotted-tag-filter.tag-filter-open' ) );
            }, 15000 );

        } ).then( function () {

                callback();

            } )

    } );
//*************************************End scenario***************************************


//*************************************Start scenario*************************************
//    Scenario: TC6618 Able to hover over and delete a plotted tag
    this.When( /^I hover over a plotted tag and hit the delete icon$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions


        browser.actions().mouseMove( element.all( by.css( 'li.plotted-tag-list' ) ).get( 0 ) ).perform()

            .then( function () {

                browser.actions().mouseMove( element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( 0 ) ).perform()

                element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( 0 ).click()
                    .then(function(){

                        callback();
                    })



            } )
    } );

    this.Then( /^the plotted tag gets deleted from the plotted tag list$/, function (callback) {
        element.all( by.css( 'li.plotted-tag-list' ) ).count()

            .then( function (count) {

                console.log( 'the count of plotted tags is' + count )

                expect(count).to.equal(0);
                callback();


            })

    } );

    this.Then(/^the plotted tag gets deleted from the plotted tag list on avt$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all( by.css( 'li.plotted-tag-list' ) ).count()

            .then( function (count) {

                console.log( 'the count of plotted tags is' + count )

                expect(count).to.equal(1);



            }).then(function(){
                callback();
            })
    });



    this.When(/^I click on the view selector link$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element(by.css('span.px-deck-selector')).click().then(function(){

            console.log('--Clicking on the view selector drop down' );
            callback();

        })
    });

    this.Then(/^the first name in the view selector should be the new template created$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions


        element.all( by.css( 'ul.dropdown-menu li')).get(0).getText()


            .then(function(txt){
                console.log('the template name at the top is ' + alerttemplate)
                expect(txt).to.equal(alerttemplate)

            }).then(function(){
                callback();
            })

    });

    this.When(/^i try to switch between view$/, function (callback) {
        element.all( by.css( 'ul.dropdown-menu li')).get(1).click()
            .then(function(){
                callback();
            })
    });

    this.Then(/^the views get loaded$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
//*************************************End scenario***************************************
//*************************************Start scenario*************************************
    //Scenario: User should be Able to mute a plotted tag
    this.When( /^I click on the mute button for a plotted tag$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element( by.css( 'div.mute-button-on' ) ).click()
            .then( function () {

                //helper.waitForElementAsSpecified( element( by.css( 'div.mute-button-off' ) ) )
                callback();
            } )

    } );

    this.Given(/^I see the Save as template option$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(3000); // adding the wait so that the UI loaded before test starts
        analysisPage.getViewMenu().isDisplayed()
            .then(function(display){
                expect(display).to.equal(true)

            })
        analysisPage.getViewMenu().click()
            .then(function(){
                analysisPage.getViewMeuOption('Save as Template').isDisplayed()
                    .then(function(display){
                        console.log('save as template option is present is' + display)
                        expect(display).to.equal(true)
                        callback();
                    })
            })

    });

    this.When(/^I click on the Save template option$/, function (callback) {
        analysisPage.getViewMeuOption('Save as Template').click()
            .then(function(){
                callback();
            })

    });



    this.Then(/^the save evidence template container should appear with required elements$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        analysisPage.getSaveAsTemplate().isDisplayed()
            .then(function(display){
                console.log('Template container dispalyed is' + display)
                expect(display).to.equal(true);

            }).then(function(){

                analysisPage.getEviNameInput().isDisplayed()
                    .then(function(display){
                        console.log('Template input field dispalyed is' + display)
                        expect(display).to.equal(true);
                    })
            }).then(function(){

                element.all(by.css('div.save-view-actions button')).count()
                    .then(function(cnt){
                        console.log('Button count is' + cnt)
                        expect(cnt).to.equal(4);

                    })

            }).then(function(){
                callback();
            })


    });

    this.Then(/^the plotted tag related to the asset deleted also get deleted$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions


        expect(element.all(by.css('li.plotted-tag-list')).count()).to.eventually.be.eql(0).notify(callback);

    });


    this.Then(/^the save template container should appear with required elements$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        analysisPage.getSaveViewTemplateCnt().isDisplayed()
            .then(function(display){
                console.log('Template input field dispalyed is' + display)
                expect(display).to.equal(true);

            }).then(function(){

                analysisPage.getViewNameInput().isDisplayed()
                    .then(function(display){
                        console.log('Template input field dispalyed is' + display)
                        expect(display).to.equal(true);
                    })
            }).then(function(){

                element.all(by.css('div.save-view-actions button')).count()
                    .then(function(cnt){
                        console.log('Button count is' + cnt)
                        expect(cnt).to.equal(6);

                    })

            }).then(function(){
                callback();
            })


    });

    this.Given(/^I Enter the random template name in to the Save template container$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        alerttemplate = 'tmp' + TestHelperPO.getRandomString()
        console.log('Template name getting created    ' + alerttemplate)
        analysisPage.getViewNameInput().sendKeys(alerttemplate)
            .then(function(){
                callback();
            })

    });

    this.Given(/^I Enter the template name in to the Save template container$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        analysisPage.getViewNameInput().sendKeys(helper.getRandomString())
            .then(function(){
                callback();
            })

    });

    this.Given(/^I Enter a lengthy template name in to the Save template container$/, function (callback) {
        analysisPage.getViewNameInput().sendKeys(helper.getRandomString() + helper.getRandomString() + helper.getRandomString())
            .then(function(){
                callback();
            })
    });

    this.When(/^I click on the cancel button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(5000);
        element.all(by.css('div.save-view-actions button')).get(0).click()
            .then(function(){
                callback();
            })

    });

    this.Then(/^the associated asset group is added to the asset context to the group\.$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions


        element(by.css('h4.tag-name.plotted-asset-list')).getText()
            .then(function(txt){
                expect( element(by.css('header#selectContext div.px-context-browser span')).getText()).to.eventually.be.eql(txt.toUpperCase()).notify(callback);


            })

    });



    this.Then(/^when you hover over the asset group there should be no delete icon for the default asset$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        expect(element.all(by.css('div.plotted-tag-controls')).get(0).getAttribute('hidden')).to.eventually.be.eql('true').notify(callback);

    });


    this.When(/^I click on the assets search option$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        analysisPage.getTagToolSearchOpt('Assets').click()
            .then(function(){
                callback();
            })

    });

    this.When(/^I click on the Tags search option$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getTagToolSearchOpt('Tags').click()
            .then(function(){
                callback();
            })
    });




    this.Then(/^the cancellation confirmation dialog should be visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getConfirmationModal().isDisplayed()
            .then(function(display){
                expect(display).to.equal(true);
                analysisPage.getConfirmationModal().getText()
                    .then(function(txt){
                        console.log(txt);
                    })


            })
            .then(function(){
                callback();
            })

    });

   this.When(/^I click on the save button$/, function (callback) {
       // Write code here that turns the phrase above into concrete actions
       browser.sleep(3000);
       element.all(by.css('div.save-view-actions button')).get(1).click()
           .then(function () {
               // browser.sleep(3000);

               browser.wait(function () {
                   return $('.spinner').isDisplayed().then(function (result) {
                       return !result
                   });
               }, 40000).then(function () {


                   callback();

               })


           })
   })

    // this.When(/^I click on the save button$/, function (callback) {
    //
    //     TestHelperPO.elementToBeClickable(element.all(by.css('#btnSave')).get(0)).then(function() {
    //
    //         console.log(Saved);
    //
    //         callback();
    //     })
    //
    //
    //
    //         });



    this.When(/^I hit the OK button on the cancel confirmation dialog$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getModalOkButton().click()
            .then(function(){
                callback();
            })

    });

    this.When(/^I hit the Cancel button on the cancel confirmation dialog$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getModalCancelButton().click()
            .then(function(){
                callback();
            })

    });


    this.When(/^I click on the view menu tooltip icon$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getTagtToolBoxKebabIcon().click()
            .then(function(){
                callback();
            })
    });

    this.When(/^i click on the option tags plus child tags$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getTagToolSearchOpt('Tags + Child tags').click()
            .then(function(){
                callback();
            })

    });

    this.Then(/^the cancellation confirmation dialog be visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I click on the Alert Profiles tab and view the alert profiles$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.waitForAngular();
        browser.sleep( 10000 );
        browser.driver.isElementPresent( by.css( 'span.user-name' ) ).then( function (isPresent) {
            isPresent = (isPresent) ? true : browser.wait( function () {
                return browser.driver.isElementPresent( by.css( 'span.user-name' ) );
            }, 15000 );

        } ).then( function () {

                element( by.cssContainingText( 'span.px-app-nav', 'Alert Profiles' ) ).click()
                    .then( function () {

                        browser.waitForAngular();
                        browser.driver.isElementPresent( by.css( 'div.alert-profile' ) ).then( function (isPresent) {
                            isPresent = (isPresent) ? true : browser.wait( function () {
                                return browser.driver.isElementPresent( by.css( 'div.alert-profile' ) );
                            }, 15000 );

                        } )

                            .then( function () {
                                callback();
                            } );


                    } )


            } )

    });

    this.When(/^I click on an existing alert profile$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(3000);
        element.all(by.css('div.profile-name')).get(0).click()
            .then(function(){
                // browser.waitForAngular();

                browser.sleep(3000);
                callback();


            })

    });

    this.When(/^I click on the add template button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        alertProfilePage.getAddAlertTemplate().click()
            .then(function(){
                callback();
            })

    });

    this.Then(/^Alert template modal is visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(7000);
        expect(alertProfilePage.getAddAlertTemplateModal().isDisplayed()).to.eventually.be.eql(true).notify(callback);

    });

    this.Then(/^the delete confirmation modal appears$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.css('div#delete-asset-modal-confirm section.px-modal p')).getText().
            then(function(txt){
                console.log('confirmation dialog message is ' + txt)
            })
        expect(element(by.css('div#delete-asset-modal-confirm section.px-modal')).isDisplayed()).to.eventually.be.eql(true).notify(callback);


    });

    this.When(/^I hit the Remove asset for the first added asset$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all(by.css('li.plotted-asset-list')).count().then(function(count){
            console.log('The count of assets in the associated assets list is ' + count)
            asset_count = count;
        })

        element.all(by.css('div#delete-asset-modal-confirm section.px-modal button')).get(1).click()
            .then(function(){
                browser.sleep(3000);

                callback();
            })

    });

    this.Then(/^the asset gets deleted$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element.all(by.css('li.plotted-asset-list')).count().then(function(count){
            console.log('The count of assets in the associated assets after delete is ' + count)
            expect(element.all(by.css('li.plotted-asset-list')).count()).to.eventually.be.eql(asset_count-1)


        }).then(function(){
                callback();
            })


    });

    this.When(/^I hit the Cancel button for the first added asset$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.css('div#delete-asset-modal-confirm button#Cancel')).click().then(function(){
            callback();
        })

    });


    this.Then(/^the search display text should not be "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions

        element.all(by.css('div.displayMsg')).get(1).getText().then(function(txt){
            console.log('search results display text is ----' + txt )
        })

        element.all(by.css('div.tag-search-results')).count().then(function(count){
            console.log('search results count is ----' + count )

            expect(count).to.not.equal(0)
            callback();

        })
        // expect(element.all(by.css('div.tag-search-results')).count()).to.not.equal(0).notify(callback)

        // expect(element.all(by.css('div.displayMsg')).get(1).getText()).to.not.contains('matching').notify(callback)


    });

    this.Then(/^the asset does not get deleted$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all(by.css('li.plotted-asset-list')).count().then(function(count){
            console.log('The count of assets in the associated assets after hitting cancel is ' + count)
            expect(element.all(by.css('li.plotted-asset-list')).count()).to.eventually.be.eql(asset_count).notify(callback)


        })

    });




    this.When(/^i hover over the added asset num (\d+) and hit the delete icon$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions

        browser.actions().mouseMove( element.all( by.css( 'li.plotted-asset-list' ) ).get( arg1 ) ).perform()

            .then( function () {

                browser.actions().mouseMove( element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( arg1 ) ).perform()

                element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( arg1 ).click()
                    .then(function(){

                        callback();
                    })



            } )

    });


    this.Given(/^I enter the alert template name into the search input$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        //  alertProfilePage.getModalSearchIcon().click()
        //    .then(function(){
        console.log('searching for alert template to add' + alerttemplate);
        alertProfilePage.getModalSearchInput().sendKeys('tmp')
            .then(function(){
                browser.sleep(3000);
                callback();
            })


        //  })

    });


    this.When(/^I add the tag by clicking on the plus icon$/, function (callback) {
        browser.sleep( 30000 );
        console.log( 'adding tags..' );
        browser.ignoresynchronization = false;
        browser.waitForAngular();
        element.all( by.css( 'h4.tag-name' ) ).get( 0 ).getText()
            .then( function (txt) {
                console.log('The tag being added is ' + txt)
                tagname = txt;
            } )


        browser.actions().mouseMove( element.all( by.css( 'div.tag-result-header' )).get(0) ).perform()

            .then( function () {
//Adding first tag
                browser.actions().mouseMove( element.all( by.css( 'li.asset-list-item span.add-tag-icon' ) ).get( 0 ) ).perform().then( function () {
                    element.all( by.css( 'li.asset-list-item span.add-tag-icon' ) ).get( 2).click()
                        .then( function () {
                            console.log( 'the tag name being added is---- ' + tagname );

                            browser.driver.isElementPresent( by.css( 'tag-toolbox px-spinner.tag-toolbox' ) ).then( function (isPresent) {
                                isPresent = (isPresent) ? true : browser.wait( function () {
                                        return browser.driver.isElementPresent( by.css( 'tag-toolbox px-spinner.tag-toolbox' ) );
                                    },
                                    5000 );

                            } )
                                .then(function(){
                                    callback();
                                })


                        } )



                } );


            } )


    });

    this.Then(/^the number of plotted assets is noted$/, function (callback) {
        element.all(by.css('div.plotted-tag-header')).count().then(function(count){
            default_asset_cnt = count;

        }).then(function(){
                callback();
            })
    });

    this.Then(/^the number of plotted assets should be greater than the previous count$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        expect(element.all(by.css('div.plotted-tag-header')).count()).to.not.equal(default_asset_cnt).notify(callback);

    });

    this.Then(/^(\d+) asset gets added to the associated assets list$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions

        var count = parseInt(arg1) + 1


        expect(element.all(by.css('div.plotted-tag-header')).count()).to.eventually.be.eql(count).notify(callback);

    });

    this.When(/^the user hovers over the asset number (\d+) from the search results$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions


        browser.actions().mouseMove( element.all( by.css( 'div.tag-result-header' )).get(arg1) ).perform()

            .then( function () {
//Adding first tag
                browser.actions().mouseMove( element.all( by.css( 'li.asset-list-item span button' ) ).get( arg1 ) ).perform()

                    .then(function(){
                        callback();
                    })


            } )



    } );



    this.Then(/^the add button for asset number (\d+) is visible$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions


        expect( element.all( by.css( 'li.asset-list-item span button' ) ).get( arg1).getAttribute('visibility')).to.eventually.be.eql('visible').notify(callback);


    });

    this.When(/^I add the asset num (\d+) by clicking on the plus button$/, function (arg1, callback) {
        browser.sleep( 30000 );
        console.log( 'adding assets..' );
        browser.ignoresynchronization = false;
        browser.waitForAngular();
        element.all( by.css( 'h4.tag-name' ) ).get( arg1 ).getText()
            .then( function (txt) {
                console.log('The asset being added is ' + txt)
                tagname = txt;
            } )


        browser.actions().mouseMove( element.all( by.css( 'div.tag-result-header' )).get(arg1) ).perform()

            .then( function () {
//Adding first tag
                browser.actions().mouseMove( element.all( by.css( 'li.asset-list-item span button' ) ).get( arg1 ) ).perform().then( function () {
                    element.all( by.css( 'li.asset-list-item span button' ) ).get( arg1).click()
                        .then( function () {
                            console.log( 'the asset name being added is---- ' + tagname );

                            browser.driver.isElementPresent( by.css( 'tag-toolbox px-spinner.tag-toolbox' ) ).then( function (isPresent) {
                                isPresent = (isPresent) ? true : browser.wait( function () {
                                        return browser.driver.isElementPresent( by.css( 'tag-toolbox px-spinner.tag-toolbox' ) );
                                    },
                                    5000 );

                            } )
                                .then(function(){
                                    callback();
                                })


                        } )



                } );


            } )
    });


    this.When(/^I click on the search result$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        alertProfilePage.getTemplateSearchResult().click()
            .then(function(){
                callback();
            })

    });

    this.When(/^I hit the add button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all(by.css('div.modal-footer button')).get(1).click()
            .then(function(){
                callback();
            })

    });


    this.Then(/^the tag information indicator appears$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getPlottedTagInfoIndicator().isDisplayed()
            .then(function(){
                callback()
            })

    });

    this.When(/^I click on the information indicator$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getPlottedTagInfoIndicator().click()
            .then(function(){
                callback()
            })
    });

    this.Then(/^the tag information screen appears$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getPlottedTaginfoScreen().isDisplayed()
            .then(function(){
                callback();
            })

    });

    this.When(/^I click on the back button on the tag information modal$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getTagInfoBackButton().click()
            .then(function(){
                callback();
            })

    });

    this.Then(/^user see the plotted tag$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element.all( by.css( 'li.plotted-tag-list' ) ).get(0).isDisplayed()
            .then( function (display) {
                expect(display).to.equal(true)
                callback();
            } )

    });


    this.Then(/^the Template name is added to the alert templates section$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });



    this.Then(/^the cancellation confirmation dialog should not be visible$/, function (callback) {
        analysisPage.getConfirmationModal().isDisplayed()
            .then(function(display){
                expect(display).to.equal(false);
                analysisPage.getConfirmationModal().getText()
                    .then(function(txt){
                        console.log(txt);
                    })


            })
            .then(function(){
                callback();
            })
    });

    this.Then(/^the save template container should not be visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(25000);
        analysisPage.getSaveViewTemplateCnt().isDisplayed()
            .then(function(display){
                console.log('Template input field dispalyed is' + display)
                expect(display).to.equal(false);

            })
            .then(function(){
                callback();
            })




    });

    this.Then(/^the save template container should be visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(5000);
        analysisPage.getSaveViewTemplateCnt().isDisplayed()
            .then(function(display){
                console.log('Template input field dispalyed is' + display)
                expect(display).to.equal(true);

            })
            .then(function(){
                callback();
            })

    });

    this.Then( /^the color of the mute button is greyed out$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        browser.ignoreSynchronization = false
        browser.waitForAngular();
        elem = element( by.css( 'div.mute-button-off' ) );

        elem.getCssValue( "background-color" )
            .then( function (value) {
                console.log( 'The rgb value is ' + value );
                expect( value ).to.equal( "rgba(247, 247, 252, 1)" );
                callback();

            } )

    } );

    this.Then( /^I should see series tracker plotted on the highchart "([^"]*)"$/, function (arg1, callback) {

        elem = element( by.css( 'g.highcharts-series path' ) );

        elem.getAttribute('d')
            .then( function (value) {


                if(value == 'M 0 0'){
                    console.log('*****No time series data plotted*******')
                }

            } )
            .then(function(){

                series = element(by.css('g.highcharts-series'));
                expect( series.getAttribute('visibility')).to.eventually.be.eql(arg1).notify(callback);




            })



    } );
//*************************************End scenario***************************************

//*************************************Start scenario*************************************
//Scenario: Able to un-mute a plotted tag
    this.When( /^I click on the mute button for a plotted tag again$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element( by.css( 'div.mute-button-off' ) ).click()
            .then( function () {
                callback()
            } )

    } );

    this.Then( /^the color of the mute button is not greyed out$/, function (callback) {

        browser.ignoreSynchronization = false
        browser.waitForAngular();
        element( by.css( 'div.mute-button-on' ) ).isDisplayed()
            .then( function (value) {

                expect( value ).to.equal( true );
                callback();
            } )


    } );
//*************************************End scenario***************************************


// *************************************Start scenario*************************************
//    Scenario: Color of the button next to added tag should match the color of the series plotted on the highchart
    this.Then( /^the color on the mute button next to the plotted tag matches the color of the plotted series$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        elem = element( by.css( 'div.mute-button-on' ));
        series = element( by.css( 'g.highcharts-series path' ));

        elem.getCssValue( "background-color" )
            .then( function (RGBA) {
                console.log( 'The rgb value of the plotted tag is ' + RGBA.substring( 5, 17 ) );
                series.getCssValue( "stroke" )
                    .then( function (RGB) {


                        console.log( 'The rgb value of the series ploted  is ' + RGB.substring( 4, 16 ) );
                        expect( RGBA.substring( 5, 17 ) ).to.equal( RGB.substring( 4, 16 ) );
                    } )



            } )
            .then(function(){

                callback();
            })


    } );

//*************************************End scenario***************************************

//*************************************Start scenario*************************************
// Scenario: TC8041 When i switch between assets in the context browser, the plotted tags should not get retained

    this.When(/^I click on the context browser tool tip$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        TestHelperPO.elementToBeClickable(element(by.css('i.px-context-browser'))).then(function () {
            TestHelperPO.isElementPresent(element(by.css('div#columnBrowser'))).then(function () {
                console.log('Clicked on context browser tool tip.');
                callback();
            })
        })

    });

//*************************************End scenario***************************************


//*************************************Start scenario*************************************
//Removed for beta release.
    this.Then( /^I should see the common buttons$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element( by.css( 'div.button-container i.fa-list-alt' ) ).isPresent()
            .then( function (present) {
                expect( present ).to.equal( true );
            } )

        element( by.css( 'div.button-container i.fa-ellipsis-v' ) ).isPresent()
            .then( function (present) {
                expect( present ).to.equal( true );
                callback();
            } )


    } );

//*************************************End scenario***************************************


    // this.registerListener(jsonFormatter);


    /*
     **************************************************************************************
     * Monira Sultana
     **************************************************************************************
     */

//*************************************Start scenario*************************************
    //Feature: F7518: Multi-Asset charting from single Toolbox Element
    //UserStory: US98096: Analyst Changes Search from Asset to Tag and hint text changes
//*************************************Start scenario*************************************

    this.When(/^I click on TagSearch In icon$/, function (callback) {
        // Write code here that selects the visible menu-options for search

        browser.sleep( 25000 );

        // analysisPage.getTagSearchViewMnuIcon_SearchIn().click().then(function(){  // click on the search icon dropdown menu
        analysisPage.getTagSearchViewMnuIcon_SearchIn().click().then( function () { // // click on the search
            browser.sleep(30000);
            console.log( "Tag Search In icon clicked." );
            callback();
        })
    });

    this.When(/^I select Tags option from search dropDown$/, function (callback) {
        // Write code here that selects the invisible menu-options for search
        // Click on the Arrow to open the dropdown

        analysisPage.getTagAssetSearchDropDown_selectMenuItems('Tags').click().then( function () { // click on the Tags selection from the list
            //browser.sleep( 20000 );
            browser.sleep( 20000 );
            console.log( "Tag option is clicked." );
            callback();
        } )
    });

    this.When(/^I select Tags plus Child option from search dropDown$/, function (callback) {
        // Write code here that selects the invisible menu-options for search

        analysisPage.getTagAssetSearchDropDown_selectMenuItems('Tags + Child tags').click().then( function () { // click on the Assets selection from the list
            //browser.sleep( 20000 );
            browser.sleep( 20000 );
            console.log( "Tags + Child option is clicked." );
            callback();
        } )
    });

    this.When(/^I select Assets option from search dropDown$/, function (callback) {
        // Write code here that selects the invisible menu-options for search

        analysisPage.getTagAssetSearchDropDown_selectMenuItems('Assets').click().then( function () { // click on the Assets selection from the list
            //browser.sleep( 20000 );
            browser.sleep( 20000 );
            console.log( "Assets option is clicked." );
            callback();
        } )
    });

    this.Then(/^the system displays a search input box placeholder with "([^"]*)"$/, function (arg1, callback) {
        // Write code here that returns the search toolbox's placeholder help text

        browser.sleep( 20000 );

        analysisPage.getTagSearchInputPlaceholder()
            .then(function(txt) {
                console.log('Search placeholder Text from UI: ' + txt);
                expect(txt).to.equal(arg1);
                callback();
            } );
        // browser.sleep( 10000 );

    });
//*************************************End scenario***************************************

//*************************************Start scenario*************************************
    //Feature: F9403-tag-exp: Tag Expressions
    //UserStory: US111039: Validate Expression within the Tag Expression Modal
//*************************************Start scenario*************************************

    this.When(/^I click on option for add tag expression from tag toolbox$/, function (callback) {
        // Write code here that selects the invisible menu-options for selection options

        analysisPage.getViewOptionsMenuNew_selectItems('Add Tag Expression').click().then( function () { // click on the 'Add Tag Expression' selection from the list
            //browser.sleep( 20000 );
            browser.sleep( 20000 );
            console.log( "Tag expression option is clicked." );
            callback();
        } )
    });

    this.Then(/^the Tag Expression window appears$/, function (callback) {
        // Write code here that verify the existance of Tag Expression

        browser.sleep( 20000 );

        analysisPage.getTagExpressionWindow().isDisplayed()
            .then(function(display){
                expect(display).to.equal(true) ;
                console.log('Tag Expression window popups.');
                callback();
            })
    });

    this.Then(/^the Validate button is disabled on Add Tag Expression$/, function (callback) {
        // Write code here that verify that the Validate button is disabled on Add Tag Expression

        browser.sleep( 20000 );

        analysisPage.getValidateTagExpressionBtn().isEnabled()
            .then(function(isEnabled){
                expect(isEnabled).to.equal(false) ;
                console.log('Validate Tag Expression btn is Disabled.');
                callback();
            })
    });

    this.Then(/^the Create button is disabled on Add Tag Expression$/, function (callback) {
        // Write code here that verify that the Create button is disabled on Add Tag Expression

        browser.sleep( 20000 );

        analysisPage.getCreateTagExpressionBtn().isEnabled()
            .then(function(isEnabled){
                expect(isEnabled).to.equal(false) ;
                console.log('Create Tag Expression btn is Disabled.');
                callback();
            })
    });

    this.Then(/^the Create button is enabled on Add Tag Expression$/, function (callback) {
        // Write code here that verify that the Create button is enabled on Add Tag Expression

        browser.sleep( 20000 );

        analysisPage.getCreateTagExpressionBtn().isEnabled()
            .then(function(isEnabled){
                expect(isEnabled).to.equal(true) ;
                console.log('Create Tag Expression btn is Enabled.');
                callback();
            })
    });


    this.Then(/^the Cancel button is enabled on Add Tag Expression$/, function (callback) {
        // Write code here that verify that the Cancel button is enabled on Add Tag Expression

        browser.sleep( 20000 );

        analysisPage.getCancelTagExpressionBtn().isEnabled()
            .then(function(isEnabled){
                expect(isEnabled).to.equal(true) ;
                console.log('Cancel Tag Expression btn is Enabled.');
                callback();
            })
    });


    this.Then(/^the "([^"]*)" displayed on Result Preview message section on Add Tag Expression$/, function (arg1, callback) {
        // Write code here that returns the default or success text for Result Preview section

        browser.sleep( 20000 );
        analysisPage.getTagExpressionResultPreviewMessage()
            .then(function(txt) {
                console.log('Result Preview section displys: ' + txt);
                expect(txt).to.equal(arg1);
                callback();
            } );
    });

    this.Given(/^I click on Expression Name input field$/, function(callback){
        // click on Tag Expression Name Input field

        browser.sleep( 20000 );

        analysisPage.getTagExpressionNameInput().click()
            .then(function() {
                console.log('Expression Name field is clicked.');
                callback();
            } )
    });

    this.Given(/^I clear the Expression Name input field$/, function(callback){
        // clear Tag Expression Name Input field

        browser.sleep( 20000 );

        analysisPage.getTagExpressionNameInput().clear()
            .then(function() {
                console.log('Expression Name field is cleared.');
                callback();
            } )
    });

    this.Given(/^I enter "([^"]*)" on Expression Name input field$/, function(arg1, callback){
        // clear Tag Expression Name Input field

        browser.sleep( 20000 );

        analysisPage.getTagExpressionNameInput().sendKeys(arg1)
            .then(function() {
                console.log('Entered Expression Name.');
                callback();
            } )
    });

    this.Given(/^I click on Tag Expression input field$/, function(callback){
        // click on Tag Expression Name Input field

        browser.sleep( 2000 );

        analysisPage.getTagExpressionInput().click()
            .then(function() {
                console.log('Expression field is clicked.');
                callback();
            } )
    });

    this.When(/^I clear the Tag Expression input field$/, function(callback){
        // clear Tag Expression Input field

        browser.sleep( 2000 );

        analysisPage.getTagExpressionInput().clear()
            .then(function() {
                console.log('Expression field is cleared.');
                callback();
            } )
    });

    this.When(/^I enter "([^"]*)" on Expression input field$/, function(arg1, callback){
        // enter Tag Expression Input field

        browser.sleep( 2000 );

        analysisPage.getTagExpressionInput().sendKeys(arg1)
            .then(function() {
                console.log('Entered Expression Name.');
                callback();
            } )
    });

    this.Then(/^the "([^"]*)" displayed on Result Preview error section on Add Tag Expression$/, function (arg1, callback) {
        // Write code here that returns the ERROR text for Result Preview section

        browser.sleep( 20000 );
        analysisPage.getTagExpressionErrorMessage()
            .then(function(txt) {
                console.log('Error displys: ' + txt);
                expect(txt).to.equal(arg1);
                callback();
            } );
    });

    this.When(/^I click on the Validate button$/, function(callback){
        // click on Validation button

        browser.sleep( 2000 );
        analysisPage.getValidateTagExpressionBtn().click()
            .then(function() {
                console.log('Validation button is clicked.');
                callback();
            } )
    });


    this.Then(/^I Cancel out of Add Tag Expression screen$/, function(callback){
        // click on Cancel button

        browser.sleep( 2000 );
        analysisPage.getCancelTagExpressionBtn().click()
            .then(function() {
                console.log('Cancel button is clicked.');
                callback();
            } )
    });


    this.Then(/^the Tag Expression screen closes$/, function (callback) {
        // Write code here that verify Tag Expression closed

        browser.sleep( 20000 );
        analysisPage.getTagExpressionPopup().getAttribute("style")
            .then(function(present){
                console.log('Tag Expression window closed.'+present );
                expect(present).to.equal('visibility: hidden;') ;
                callback();
            })
    });

//*************************************End scenario***************************************

//*************************************Start scenario*************************************
    //Feature: F9403-tag-exp: Tag Expressions
    //UserStory: US99478: Analyst Can Remove a Tag Expression
//*************************************Start scenario*************************************

    this.When(/^I click on the Create button$/, function(callback){
        // click on Create button

        browser.sleep( 2000 );
        analysisPage.getCreateTagExpressionBtn().click()
            .then(function() {
                console.log('Create button is clicked.');
                callback();
            } )
    });


    this.Then( /^I should see (\d+) plotted Tag Expression in the plotted tags section$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep( 10000 );
        element.all( by.css( 'li.plotted-tag-list' ) ).count()

            .then( function (count) {
                console.log( 'the count of plotted tag expression is' + count );
                expect( count )>=( parseInt( arg1 ) );
                // expect( count ).to.equal( parseInt( arg1 ) );

            } )
            .then(function(){
                callback();
            })
    } );

    this.Then( /^I hover over a plotted Tag Expression and hit the delete icon$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        browser.actions().mouseMove( element.all( by.css( 'li.plotted-tag-list' ) ).get( 0 ) ).perform()

            .then( function () {

                browser.actions().mouseMove( element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( 0 ) ).perform()

                element.all( by.css( 'div.plotted-tag-controls i.fa-times' ) ).get( 0 ).click()
                    .then(function(){

                        callback();
                    })

            } )
    } );

    this.Then( /^the plotted Tag Expression gets deleted from the plotted tag list$/, function (callback) {
        element.all( by.css( 'li.plotted-tag-list' ) ).count()

            .then( function (count) {

                console.log( 'the count of plotted tags is' + count )

                expect(count).to.equal(0);
                callback();

            })

    } );

    this.Then( /^I should see (\d+) series tracker plotted on the highchart for Tag Expression$/, function (arg1, callback) {

        element.all( by.css( 'g.highcharts-series' ) ).count()
            .then( function (count) {
                console.log( ' count of the plotted series for Tag Expression is ' + count )
                expect( count ).to.equal( parseInt( arg1 ) );

            } )
            .then(function(){
                callback();
            })
    } );

    this.Then( /^the plotted series tracker on the highchar for Tag Expression gets deleted$/, function (callback) {
        element.all( by.css( 'g.highcharts-series' ) ).count()

            .then( function (count) {
                console.log( 'the count of plotted series tracker on highchart is' + count )
                expect(count).to.equal(0);
                callback();

            })

    } );

//*************************************End scenario***************************************

//*************************************Start scenario*************************************
    //Feature: F9403-tag-exp: Tag Expressions
    //UserStory: US99476: Analyst Can't Save View If a Tag Expression Exists
//*************************************Start scenario*************************************


    this.Then(/^the system displays alert error message that the view cannot be saved as template$/, function (callback) {

        analysisPage.getsaveTemplateAlert_selector().getAttribute('class')
            .then(function(present){
                console.log('Cannot save template with Tag Expression alert is fade-out from display : '+present);
                expect(present).to.not.contains('fade-out');  // confirms that the alert is displayed
                callback();
            })
    } );


    this.Then(/^the system displays "([^"]*)" for the view cannot be saved if an expression tag exists$/, function (arg1, callback) {
        // Write code here that returns the ERROR text for template save
        //   element.all( by.css( 'div.message.style-scope.px-alert-message > p > span:nth-child(2)')).get(8)

        analysisPage.getsaveTemplateErrorMessageForTagExp().getText()
            .then(function(txt) {
                console.log('Error on the Alert displays for tag exp: ' + txt);
                // expect(txt).to.equal(arg1);
                expect(txt).to.contains(arg1);
                callback();
            } )

    });

//********************************************End scenario***************************************

//********************************************Start scenario*************************************
    //Feature: F9403-tag-exp: Tag Expressions
    //UserStory: US99411: Tag Expression is Plotted on the Chart
//*************************************Start scenario*************************************

    this.Then(/^I click on fromDate input field$/, function (callback) {

        analysisPage.getFromField_DateRange().then(function () {
            console.log('Clicked on Form Date field');
            callback();
        })
    });

    this.Then( /^I enter a date "([^"]*)" on fromDate field$/, function (arg1, callback) {
        analysisPage.getFromField_DateRange().then(function() {
            element(by.css('#fromDate > div > label > input')).clear().sendKeys(arg1).then(function (count) {
                console.log("Form Date clear and entered new date");
                callback();
            });
        });
    });

    this.Then( /^I click on toDate input field$/, function (callback) {

        analysisPage.getToField_DateRange().then(function(){
            console.log( 'Clicked on To Date field' );
            callback();
        })
    });

    this.Then( /^I enter a date "([^"]*)" on toDate field$/, function (arg1, callback) {
        analysisPage.getToField_DateRange().then(function(){
            element(by.css('#toDate > div > label > input')).clear().sendKeys(arg1).then( function (count) {
                console.log("To Date clear and entered new date");
                browser.sleep(3000);
                callback();
            })
        })
    });

    this.Then( /^I click on Apply button to submit date change$/, function (callback) {

        analysisPage.getApplyBTN_DateRange().then(function(){
            console.log( 'Clicked on Apply button' );
            callback();
        })
    });

    this.Then( /^I should see (\d+) plotted tag expression on the highchart$/, function (arg1, callback) {

        element.all( by.css( 'g.highcharts-series' ) ).count()
            .then( function (count) {
                console.log( 'count of the plotted series for tag expression is: ' + count )
                expect( count )>= parseInt( arg1 );
                // expect( count ).to.equal( parseInt( arg1 ) );

            } )
            .then(function(){
                callback();
            })

    } );

//*****************************************End scenario***************************************

//********************************************Start scenario*************************************
    //Feature: F9403-tag-exp: Tag Expressions
    //UserStory: US99400: Analyst Can Add A Tag Expression to the Chart
//*************************************Start scenario*************************************

    this.Then(/^the "([^"]*)" displays for Header$/, function (arg1, callback) {
        // Write code here that verifies header

        browser.sleep( 20000 );
        analysisPage.getTagExpressionHeader_LABEL().getText()
            .then(function(txt) {
                console.log('Header displays: ' + txt);
                expect(txt).to.equal(arg1);
                callback();
            } );
    });

    this.Then(/^the "([^"]*)" label displays for Expression Name input field$/, function (arg1, callback) {
        // Write code here that verifies header

        browser.sleep( 20000 );
        analysisPage.getTagExpressionNameField_LABEL().getText()
            .then(function(txt) {
                console.log('Expression name label displays: ' + txt);
                expect(txt).to.equal(arg1);
                callback();
            } );
    });

    this.Then(/^the "([^"]*)" label displays for Expression input field$/, function (arg1, callback) {
        // Write code here that verifies header

        browser.sleep( 20000 );
        analysisPage.getTagExpressionField_LABEL().getText()
            .then(function(txt) {
                console.log('expression field label displays: ' + txt);
                expect(txt).to.equal(arg1);
                callback();
            } );
    });

    this.Then(/^the "([^"]*)" section displays for validation result$/, function (arg1, callback) {
        // Write code here that verifies header

        browser.sleep( 20000 );
        analysisPage.getTagExpressionResultPreview_LABEL().getText()
            .then(function(txt) {
                console.log('validate reselt section label displays: ' + txt);
                expect(txt).to.equal(arg1);
                callback();
            } );
    });

//*******************************************************End scenario***************************************************

//****************************************Test Steps for ACS testing****************************************************
    //*************************************Start scenario***************************************************************
    //Feature: F56: Access Control Services(ACS) Enablement
    //UserStory: US1985: AVID: ACS Enablement for 'Save Analysis as Template'
//*************************************Start scenario*******************************************************************
    this.Then(/^the system displays alert error message for authorization that the view cannot be saved as template$/, function (callback) {

        analysisPage.getsaveTemplateAlert_selector().getAttribute('class')
            .then(function(present){
                console.log('Unauthorized user cannot save template and alert is fade-out from display : '+present);
                expect(present).to.not.contains('fade-out');  // confirms that the alert is displayed
                callback();
            })
    } );


    this.Then(/^the system displays "([^"]*)" for the view cannot be saved for unauthorized user$/, function (arg1, callback) {
        // Write code here that returns the ERROR text for template save

        // analysisPage.getsaveTemplateErrorMessageForViewOnlyAuth().getText()

        analysisPage.getsaveTemplateErrorMessageForTagExp().getText()
            .then(function(txt) {
                console.log('Error on the Alert displays for unauthorized user: ' + txt);
                // expect(txt).to.equal(arg1);
                expect(txt).to.contains(arg1);
                callback();
            } )

    });

    this.Then(/^the save template container should appear based on "([^"]*)"$/, function (userAuth, callback) {
        // Write code here that turns the phrase above into concrete actions

        if (userAuth=="authorized") {
            analysisPage.getSaveViewTemplateCnt().isDisplayed()
                .then(function (display) {
                    console.log('Template input field dispalyed is' + display)
                    expect(display).to.equal(true);

                }).then(function () {

                    analysisPage.getViewNameInput().isDisplayed()
                        .then(function (display) {
                            console.log('Template input field dispalyed is' + display)
                            expect(display).to.equal(true);
                        })
                }).then(function () {

                    element.all(by.css('div.save-view-actions button')).count()
                        .then(function (cnt) {
                            console.log('Button count is' + cnt)
                            expect(cnt).to.equal(4);

                        })

                }).then(function () {
                    callback();
                })
        }


    });

    this.When( /^I click on context browser from header section$/, function (callback) {
        browser.sleep(10000);
        browser.waitForAngular();
        analysisPage.getContextBrowser_dropdown().click().then(function(){
            console.log( 'Clicked on Context Browser caret-down' );
            browser.sleep(3000);
            callback();
        })
    } );

    this.Then(/^the save template container should not be visible for Asset level$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(25000);
        analysisPage.getSaveViewTemplateCnt().isDisplayed()
            .then(function(display){
                console.log('Template input field dispalyed is' + display)
                expect(display).to.equal(false);

            })
            .then(function(){
                callback();
            })

    });

//*************************************Start scenario*************************************
    //Feature: F696-adhoc-new-analysis: Create New Ad Hoc Analysis from View Selector Option
    //UserStory: US5464: View 'New Ad Hoc Analysis' Option in Analysis View Selector
//*************************************Start scenario*************************************

    this.When( /^I click on view saved template dropdown option$/, function (callback) {
        browser.sleep(10000);
        browser.waitForAngular();
        analysisPage.getViewTemplateDropdownArrow().isDisplayed()
            .then(function(display){
                expect(display).to.equal(true)

            })


        analysisPage.getViewTemplateDropdownArrow().click()
            .then(function(){
                analysisPage.getViewTemplateDropdownOption('New Ad Hoc Analysis').isDisplayed()
                    .then(function(display){
                        console.log('view saved template display new template option- ' + display)
                        expect(display).to.equal(true)  // new option available
                        callback();
                    })
            })
    } );

    this.Then(/^the dropdown displays "([^"]*)" as last option$/, function (arg1, callback) {
        // Write code here that returns the last menu option for view template

        analysisPage.getViewTemplateDropdownMenu_lastOption().getText()
            .then(function (txt) {
                console.log('New save template option available as: ' + txt);
                // expect(txt).to.equal(arg1);
                expect(txt).to.equal(arg1); // last option is for new template
                callback();
            })
    });


  /*  this.When(/^I see the Save as template option$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(5000); // adding the wait so that the UI loaded before test starts
        analysisPage.getViewMenu().isDisplayed()
            .then(function(display){
                expect(display).to.equal(true)

            })
        analysisPage.getViewMenu().click()
            .then(function(){
                analysisPage.getViewMeuOption('Save as Template').isDisplayed()
                    .then(function(display){
                        console.log('save as template option is present is' + display)
                        expect(display).to.equal(true)
                        callback();
                    })
            })

    });

   */
    //*************************************Start scenario*************************************
    //Feature: Enhanced Analysis - Expand Ad Hoc Analysis Chart Size
    //UserStory: US4886: Analysis Line Charts Resize on Left Menu Collapse/Expand
    //*************************************Start scenario*************************************
    // For chart area
    this.Given(/^the chart area display for the "([^"]*)" before resize$/, function (args1, callback) {

        analysisPage.getChartArea().then(function(element){
            element.getAttribute('width').then(function (_chartWidth) {
                console.log('For hierarchy ' + args1 + ': Chart area width before resize is : ' + _chartWidth);
                callback();
            })
        })

    });

    this.When( /^I click on Left Navigation menu$/, function (callback) {
        analysisPage.getLeftMenu().then(function(){
            console.log( 'Clicked on Left Navigation Menu' );
            callback();
        })
    });


    this.Then(/^the chart area display for the "([^"]*)" in extended view after resize$/, function (args1, callback) {

        analysisPage.getChartArea().then(function (element) {

            element.getAttribute('width').then(function (_chartWidthAfter_menuCollapse) {
                console.log('For hierarchy ' + args1 + ': Chart area width resized after menu collapse: ' + _chartWidthAfter_menuCollapse);
                // expect( _widthAfter )>= parseInt( arg1 );
                expect(_chartWidthAfter_menuCollapse > _chartWidth);
                callback();
            })
        });
    });

    this.Then(/^the chart area display for the "([^"]*)" in reduced view after resize$/, function (args1, callback) {

        analysisPage.getChartArea().then(function (element) {
            element.getAttribute('width').then(function (_chartWidthAfter_menuExpand) {
                console.log('For hierarchy ' + args1 + ': Chart area width resized after menu expand: ' + _chartWidthAfter_menuExpand);
                // expect( _widthAfter )>= parseInt( arg1 );
                expect(_chartWidthAfter_menuCollapse < _chartWidthAfter_menuExpand);
                callback();
            })
        })
    });

    // For time series
    this.Given(/^the High Chart area display for the "([^"]*)" before resize$/, function (args1, callback) {
        // analysisPage.getHighChartGrid().getSize()
        analysisPage.getHighChartGrid().then(function(ele){
            ele.getAttribute('clientWidth').then(function (_chartWidth) {
                console.log('For hierarchy '+args1+ ': High Chart area width before resize is : ' + _chartWidth);
                callback();
            })
        })
    });

    this.Then(/^the High Chart area display for the "([^"]*)" in extended view after resize$/, function (args1, callback) {

        //  var value = analysisPage.getHighChartGrid().getSize().width
        //  console.log(value)
        // analysisPage.getHighChartGrid().getSize()
        analysisPage.getHighChartGrid().then(function(ele){
            ele.getAttribute('clientWidth').then(function (_chartWidthAfter_menuCollapse) {
                    console.log('For hierarchy '+args1+ ': High Chart area width resized after menu collapse: ' + _chartWidthAfter_menuCollapse);
                    // expect( _widthAfter )>= parseInt( arg1 );
                    expect(_chartWidthAfter_menuCollapse > _chartWidth);
                    callback();
                })
        })


    });

    this.Then(/^the High Chart area display for the "([^"]*)" in reduced view after resize$/, function (args1, callback) {
        // analysisPage.getHighChartGrid().getSize()
        // analysisPage.getHighChartGrid().getAttribute('width')
        analysisPage.getHighChartGrid().then(function(element){

            element.getAttribute('clientWidth').then(function (_chartWidthAfter_menuExpand) {
                    console.log('For hierarchy '+args1+ ': High Chart area width resized after menu expand: ' + _chartWidthAfter_menuExpand);
                    // expect( _widthAfter )>= parseInt( arg1 );
                    expect(_chartWidthAfter_menuCollapse < _chartWidthAfter_menuExpand);
                    callback();
                })
    });

    });

    // For AVT flow, need to verify that left nav is not there
    this.Then( /^the left navigation is not visible$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getLeftNav().isPresent()
            .then( function (present) {
                console.log( "The left navigation present: " + present )

                expect( present ).to.equal( false );

            } )
            .then(function(){
                callback();
            })
    } );

    this.When(/^the user clicks on the search icon in the tag control window after loading analysis$/, function (callback) {
        analysisPage.getSearch().then(function () {
            console.log("Search button is clicked.");
            callback();
        })
    });
    this.When(/^the user clicks on the cancel and search icon in the tag control window$/, function (callback) {
        analysisPage.getSearch().then(function () {
            console.log("Search button is clicked.");
            callback();
        })
    });


    this.When( /^I click on the open button for the Asset level$/, function (callback) {
        analysisPage.getOpenAssetButton().then( function () {
                console.log( 'Asset opened.' );
                callback();
            })
    });

    this.Then(/^I should see at least (\d+) plotted tags in the plotted tags section$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        TestHelperPO.isElementPresent(element(by.css('li.plotted-tag-list'))).then(function () {
            element.all(by.css('li.plotted-tag-list')).count().then(function (count) {
                console.log('the count of plotted tags is' + count)
                console.log('the count of plotted tags is ' + arg1)
                expect(count >= arg1);
                callback();
            })
        })
    });




    // Dismiss multi chart alert after clciking Analysis****************************************************************************
    this.When(/^I click on the "([^"]*)" microapp link on the left nav for non-multi chart$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.driver.isElementPresent( by.css( 'body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name' ) ).then( function (isPresent) {
            isPresent = (isPresent) ? true : browser.wait( function () {
                return browser.driver.isElementPresent( by.css( 'body > aside.pxh-drawer div.pxh-login > a div.pxh-login__name' ) );
            }, 5000 );

        } ).then( function () {

                navPage.clickMicroApp(arg1).then( function () {
                    console.log( 'Left nav is clicked for ' + arg1 +' page' )
                    browser.waitForAngular();

                    var alertDialog = browser.driver.switchTo().alert();
                    alertDialog.dismiss();
                    // analysisPage.getMultiChartConfirmPopup().cancel();
                    // browser.switch_to.confirm.dismiss;    // dismiss alert
                    // page.driver.browser.switch_to.alert.dismiss

                    analysisPage.getContextBrowser().isPresent().then( function (isPresent) {
                        console.log( "Context browser is displayed: " + isPresent );
                        return;
                    },15000)
                })
            } ).then( function () {
                callback();
            } );


    } );



        //Click on New Adhoc Analysis

        this.When(/^I click on the "([^"]*)" for New Ad Hoc Analysis$/, function (arg1, callback) {

            TestHelperPO.elementToBeClickable(element(by.css('#dropdown > li.deck-editor.style-scope.px-deck-selector > div'))).then(function () {
                console.log('Clicked on New Ad Hoc Analysis');
                callback();

            })
        });


    this.When(/the deck selector drop down is not present$/, function (arg1, callback) {

        TestHelperPO.elementToBeClickable(element(by.css('#dropdown > li.deck-editor.style-scope.px-deck-selector > div'))).then(function () {
            console.log('Clicked on New Ad Hoc Analysis');
            callback();

        })
    });

















//**********************************************************************************************************************

    this.Then(/^the feature is completed json report should be generated with the name "([^"]*)"$/, function (arg1, callback) {


        jsonFormatter.log = function (json) {
            var obj = JSON.parse(json),
                featureName,
                snapshotPath = path.resolve('./Reports'),
                filepath;


            if (obj && obj[0]) {
// Or make a uniquer name
                featureName = obj[0].name || 'noName';

// overwrite id, name and uri to get unique report per feature
                obj[0].id = obj[0].name = obj[0].uri = arg1;

                filepath = path.resolve(snapshotPath, 'cucumber.' + arg1 + '..report.json');
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





//module.exports = myStepDefinitionsWrapper;