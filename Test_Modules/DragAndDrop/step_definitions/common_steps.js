/**
 * Created by 502535160 on 12/30/15.
 */


var tagname;

var jsonFormatter = Cucumber.Listener.JsonFormatter();


var _tkn_;


module.exports = function () {
//*************************************Start scenario*************************************

    this.Given(/^I go to url$/, function (callback) {

        browser.ignoreSynchronization = true;

        loginPage.getUrl(browser.params.login.testUrl).then(function(){
            analysisPage.getUserName().then(function () {
                callback();
            });
        })

    });

    this.Then( /^the page title should contain "([^"]*)" or "([^"]*)"$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.ignoreSynchronization = true
        console.log( "Checking page title..." );


        browser.driver.getTitle().then( function (title) {
            console.log( "Title is " + title );
            // expect( arg1 + arg2 ).to.contain( title );
            callback();
        } );
    } );


//*************************************End scenario**************************************

    //*************************************Start scenario*************************************


    this.When( /^I login as "([^"]*)" and "([^"]*)"$/, function (user, pword, callback) {
        browser.ignoreSynchronization = true;


        loginPage.loginAs( user, pword ).then( function () {
            browser.sleep( 10000 );
            console.log( 'Login done' );
//            browser.ignoreSynchronization = false;
//            browser.waitForAngular();
            analysisPage.getAnalysisTab().isPresent().then( function (isPresent) {
                console.log( "Analysis tab is displayed: " + isPresent );

            } );
        } ).then( function () {
                callback();

            } );


    } );

    this.When(/^I log out$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.css('div.pxh-login__caret')).click()
            .then(function(){
                element.all(by.css('a.pxh-login-menu__link')).get(1).click().then(function(){
                    callback();
                })

            })

    });




    this.When(/^a user having a "([^"]*)" is logged in$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        console.log('Permission of the user is  ' +  arg1);

        if(arg1 == 'viewonly'){
            loginPage.loginAs( browser.params.login.viewonly_username , browser.params.login.viewonly_password ).then( function () {

                browser.sleep( 10000 );
                console.log( 'Login done' );

            } ).then( function () {
                    callback();

                } );


        }
        if(arg1 == 'createall'){

            loginPage.loginAs( browser.params.login.createall_username , browser.params.login.createall_password ).then( function () {

                browser.sleep( 10000 );
                console.log( 'Login done' );

            } ).then( function () {
                    callback();

                } );


        }

    });


    this.When(/^a user with "([^"]*)" authorization is logged in$/, function (permission, callback) {
        browser.ignoreSynchronization = true;
        console.log('Permission of the user is: ' +  permission);

        if(permission === 'create') {
            loginPage.loginAs(browser.params.login.avid_create_username , browser.params.login.avid_user_password).then(function () {
                    callback();
                });
        }

        if(permission === 'view') {
            loginPage.loginAs(browser.params.login.avid_viewonly_username , browser.params.login.avid_user_password).then(function () {
                    callback();
                });
        }

        if(permission === 'createAndView') {
            loginPage.loginAs(browser.params.login.avid_createView_username, browser.params.login.avid_user_password).then(function () {
                    callback();
                });
        }

        if(permission === 'analysisManager') {
            loginPage.loginAs(browser.params.login.avid_mgr_username, browser.params.login.avid__mgr_password).then(function () {
                    callback();
                });
        }

    });



    this.Given(/^I perform a sample test on the demo url$/, function (callback) {
        browser.get('http://juliemr.github.io/protractor-demo/');
        element(by.model('first')).sendKeys(1);
        element(by.model('second')).sendKeys(2);

        element(by.id('gobutton')).click();

        callback();
    });


    this.When(/^I login with username and password$/, function (callback) {
        browser.ignoreSynchronization = true;


        loginPage.loginAs( browser.params.login.analyst_username , browser.params.login.analyst_password ).then( function () {

            browser.sleep( 10000 );
            console.log( 'Login done' );

        } ).then( function () {
                callback();

            } );


    } );

    this.When(/^I login with admin credentials$/, function (callback) {
        loginPage.loginAs( browser.params.login.admin_username , browser.params.login.admin_password ).then( function () {

            browser.sleep( 10000 );
            console.log( 'Login done' );

        } ).then( function () {
                callback();

            } );
    });



    this.Then( /^the landing page should contain "([^"]*)" and "([^"]*)" tabs$/, function (arg1, arg2, callback) {
        //browser.ignoreSynchronization = false;


        //Counting total number of left tabs
        //analysisPage.getAllLeftTab().count().then( function (count) {
        //    console.log( "Total number of tabs on left navigation: " + count );

        //Checking if analysis tab is present
        analysisPage.getAnalysisTab().then(function (isAnalysisTabPresent) {
            console.log("Analysis tab is displayed: " + isAnalysisTabPresent);


            //checking if dashboard tab is present
            analysisPage.getDashboardTab().then(function (isDashboardTabPresent) {
                console.log("Dashboard tab is displayed: " + isDashboardTabPresent);

                //Expecting only 1 Analysis tab
                element.all(by.cssContainingText('.pxh-navigation__link', arg1)).count().then(function (count) {
                    //       analysisPage.getAnalysisTab().count().then(function (count) {
                    console.log('Checking for one anaylysis tab. Number of analysis tab ' + count);
                    expect(count).to.equal(1);
                    callback();
                })
            })
        })
    });




//*************************************End scenario**************************************


//*************************************Start scenario*************************************
    this.Then( /^the left nav\-bar should contain the username, tooltip and gear icon\.$/, function (callback) {

        browser.ignoreSynchronization = false;
        browser.waitForAngular();

        analysisPage.getLoggedProfileImage().isDisplayed()
            .then( function (value) {
                console.log( "Logged profile image is displayed: " + value );
                expect( value ).to.equal( true )
            } )
        analysisPage.getLoggedUserName().isDisplayed()
            .then( function (value) {
                console.log( "Logged user name is displayed: " + value );
                expect( value ).to.equal( true )
            } )
        analysisPage.getGearIcon().isDisplayed()
            .then( function (value) {
                console.log( "Gear icon is displayed: " + value );
                expect( value ).to.equal( true )
            } )
        analysisPage.getLogoutMenu().isDisplayed()
            .then( function (value) {
                console.log( "Logout menu is displayed: " + value );
                expect( value ).to.equal( true )
                callback()
            } )


    } );
//*************************************End scenario***************************************

// *************************************Start scenario*************************************


    this.Given( /^I relaunch the url "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions

        loginPage.getUrl( arg1 )
            .then( function () {


                browser.driver.isElementPresent( analysisPage.getAllLeftTab() ).then( function (isPresent) {
                    isPresent = (isPresent) ? true : browser.wait( function () {
                        return;
                    }, 30000 );

                } ).then( function () {
                        browser.sleep( 20000 );
                        callback();

                    } )


            } )
    } );

//*************************************End scenario***************************************

// *************************************Start scenario*************************************
//    ****Select asset and open context browser

    this.When( /^I click "([^"]*)" from the context browser$/, function (arg1, callback) {
        browser.ignoresynchronization = false;
        browser.waitForAngular();
        browser.sleep(20000);

        analysisPage.getContextColumnBrowser().isPresent().then( function (isPresent) {
            console.log( "Context column browser is displayed: " + isPresent );
            browser.waitForAngular();


        } ,25000)


            .then( function () {
                analysisPage.clickAsset( arg1 )
                    .then( function () {
                        browser.waitForAngular();
                        browser.sleep( 20000 );

                        browser.wait(function() {
                            return $('.spinner').isDisplayed().then(function(result){return !result});
                        }, 30000).then(function(){
                        console.log( arg1 + " is clicked." );
                        callback();
                            })
                    } )
            } )
    } );

    this.When( /^I click inner node "([^"]*)" from the context browser$/, function (arg1, callback) {

        analysisPage.clickAsset( arg1 ).then( function () {
            callback();
        })
    });

 /*   this.When( /^I click on the open button$/, function (callback) {
        browser.ignoresynchronization = false;
        browser.sleep(5000);
        browser.waitForAngular();
        analysisPage.getOpenAssetButton().click()
            .then( function () {
                browser.waitForAngular();
                console.log( 'Asset opened.' );

                browser.driver.isElementPresent(by.css('.spinner') ).then( function (isPresent) {
                    isPresent = (isPresent) ? true : browser.wait( function () {
                        return;
                    }, 30000 );

                } )

              .then(function(){


                        callback();

                    })


            } )
    } );

*/
    this.When( /^I click on the open button$/, function (callback) {
        analysisPage.getOpenAssetButton().then(function(){
            console.log( 'Asset opened.' );
            callback();
        })
    });

    //*************************************End scenario***************************************


    //Setting the asset type
    this.When(/^I click on View Profile$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        element.all( analysisPage.getAllToolTipNav() ).get( 0 ).click()
            .then( function (txt) {
                console.log( "Clicked on view profile" );
                browser.sleep(10000);
                callback();
            } )

    });

    this.When(/^I edit the profile$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getEditProfile().click().then(function(){
            console.log("Clicked on edit profile");
            browser.sleep(2000);
            callback();
        })
    });

    this.When(/^I select Asset Display Name to "([^"]*)"$/, function (assetDisplayName, callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getSelectAssetName(assetDisplayName).click().then(function(){
            console.log(assetDisplayName + " is selected");
            callback();
        })
    });

    this.When(/^I save profile$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        analysisPage.getSaveProfileButton().click().then()
        {
            console.log('Profile is saved') ;
            browser.sleep(3000);
            callback();
        }

    });

    this.When(/^I login as username and password$/, function (callback) {
        browser.ignoreSynchronization = true;


        loginPage.loginAs( browser.params.login.analyst_username , browser.params.login.analyst_password ).then( function () {
            browser.sleep( 10000 );
            console.log( 'Login done' );
            browser.ignoreSynchronization = false;
            browser.waitForAngular();
            analysisPage.getAnalysisTab().isPresent().then( function (isPresent) {
                console.log( "Analysis tab is displayed: " + isPresent );

            } );
        } ).then( function () {
                callback();

            } );


    });

    this.Given(/^I relaunch the url$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.ignoreSynchronization = true;

        loginPage.getUrl(browser.params.login.testUrl )

            .then( function () {


                browser.driver.isElementPresent( analysisPage.getAllLeftTab() ).then( function (isPresent) {
                    isPresent = (isPresent) ? true : browser.wait( function () {
                        return;
                    }, 30000 );

                } ).then( function () {
                        browser.sleep( 20000 );
                        callback();

                    } )


            } )

    });


    this.Then(/^Asset display name is set to "([^"]*)"$/, function (assetDisplayName, callback) {
            analysisPage.getAssetName().getText().then(function(assetName){
                expect(assetName ).to.equal(assetDisplayName);
                console.log('Asset name from UI: ' + assetName) ;
                callback();
            });

        });

        this.When(/^the feature is completed json report should be generated with the name "([^"]*)"$/, function (arg1, callback) {


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



//***************************** RASHMI *******************************************




