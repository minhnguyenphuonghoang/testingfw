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
    specs: ['../../Team_Example/Chart/Features/wfvChartExample.feature'
    ],


    // Patterns to exclude.
    exclude: [],


    // Organize spec files into suites. To run specific suite, --suite=<name of suite>
    suites: {
        analytic: [
            '/Users/212556710/WebstormProjects/ProUI/Team_Example/Analytics/step_definitions/analyticsE2E-spec.js'
        ],
    },

    // Browser options
    capabilities: {
        browserName: 'chrome',
        count: 1,
        shardTestFiles: false,

        maxInstances: 1,

        'chromeOptions': {
            args: ['--no-sandbox', '--test-type=browser'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': 'C:/Jenkins/sharedspace/public/test/e2e-reboot/steps/'

                }
            }
        }
    },

    // Hooks running in the background
    plugins: [{
        path: '../../node_modules/proui-utils/Compressed_Utils/GeneralHook.js',
    }],



    multiCapabilities: [],

    params: {
        env: 'dev'

    },


    maxSessions: -1,


    allScriptsTimeout: 250000,

    // How long to wait for a page to load.
    getPageTimeout: 650000,


    // Before launching the application
    beforeLaunch: function () {
    },

    // Application is launched but before it starts executing
    onPrepare: function () {

        // Create reports folder if it does not exist
        var folderName = (new Date()).toString().split(' ').splice(1, 4).join(' ');
        var mkdirp = require('mkdirp');
        var reportsPath = "./Reports/" ;

        mkdirp(reportsPath, function(err) {
            if (err) {
                console.error(err);
            } else {
            }
        });

        browser.manage().deleteAllCookies();
        browser.manage().timeouts().pageLoadTimeout(50000);
        browser.manage().timeouts().implicitlyWait(50000);
        browser.driver.manage().window().setSize(1280, 1440);

        chai = require('chai');
        expect = chai.expect;
        path = require('path') ;
        Cucumber = require('cucumber') ;
        fs = require('fs') ;

        // Initializing page object variables
        loginPage = require('../PageObjects/apm-login-po.js');
        loginSpec = require('../step_definitions/login-spec.js')
        apmlandingPage = require('../PageObjects/apm-landing-po.js');
        wfvPage = require('../PageObjects/wfv-po.js');

        // Initializing necessary utils from ProUI-Utils module
        TestHelper = require('ProUI-Utils').TestHelper;
        ElementManager = require('ProUI-Utils').ElementManager;
        Logger = require('ProUI-Utils').Logger;
        elementManager = new ElementManager('../../../Common_Template/ObjectRepository/APM_ObjectRepository.json');
        TestHelper.setElementManager(elementManager);
    },

    // A callback function called once tests are finished
    onComplete: function () {

    },


    // A callback function called once tests are cleaning up
    onCleanUp: function (exitCode) {

    },

    // A callback function after tests are launched
    afterLaunch: function () {

    },

// Browser parameters for feature files.
    params: {

        login:{

            baseUrl: 'http://apm-application-qa.grc-apps.svc.ice.ge.com/regression',
            "username": "qa-admin",
            "password": "test",
        }

    },

    resultJsonOutputFile: null,

    // If true, protractor will restart the browser between each test.
    // CAUTION: This will cause your tests to slow down drastically.
    restartBrowserBetweenTests: false,


    jasmineNodeOpts: {
        // If true, display spec names.
        isVerbose: false,

        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 750000,

        realtimeFailure: true
    }
};
