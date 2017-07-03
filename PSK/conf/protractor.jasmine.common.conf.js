/**
 * Created by 212556710 on 5/9/16.
 */
exports.config = {

    // ---- While testing locally
    sauceUser: null,
    sauceKey: null,
    sauceSeleniumAddress: null,

    directConnect: false,
    firefoxPath: null,


    // ---------------------------------------------------------------------------
    // ----- What tests to run ---------------------------------------------------
    // ---------------------------------------------------------------------------

    // Spec patterns are relative to the location of this config.
    specs: ['../testcase/login.js'
    ],
    suites: {
        login: ['../testcase/login.js'],
    },
    onPrepare: function () {

        var folderName = (new Date()).toString().split(' ').splice(1, 4).join(' ');
        var mkdirp = require('mkdirp');
        screenShotPath = "./ScreenShot/";
        reportPath ='./Reports';
         mkdirp(reportPath, function (err) {
            if (err) {
                console.error(err);
            } else {
            }
        });
        mkdirp(screenShotPath, function (err) {
            if (err) {
                console.error(err);
            } else {
            }
        });

        chai = require('chai');
        expect = chai.expect;
        loginPage = require('../page/apm-login-po.js');
        fs = require('fs');
        TestHelper = require('ProUI-Utils').TestHelper;
        ElementManager = require('ProUI-Utils').ElementManager;
        Logger = require('ProUI-Utils').Logger;
      
        // cem = new ElementManager('../../AWB/common-element-repo.json');
        // TestHelper.setElementManager(cem);
        RestHelper = require('ProUI-Utils').RestHelper;
    },

};
