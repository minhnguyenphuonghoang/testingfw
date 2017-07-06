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
	specs: [],

	// Patterns to exclude.
	exclude: [],

	// Organize spec files into suites. To run specific suite, --suite=<name of suite>
	suites: {

		asset: ['../Features/apmLogin.feature','../../Test_Modules/Assets/Features/asset-example.feature'],

		//chart: ['../../Team_Example/Chart/Features/wfvChartExample.feature'],

		//test: ['../../Team_Example/Tub/Features/test.feature'],

		highchart: ['../../Test_Modules/Highchart/Features/Highchart.feature'],

		rest: ["../../Test_Modules/RestAPIExample/Features/rest-example.feature"],

		resthighchart: ["../../Test_Modules/RestAPIExample/Features/rest-example-highchart.feature"],

		deletepage: ['../Features/apmLogin.feature','../../Test_Modules/SinglePage/Features/Singlepage.feature']

},

	// Hooks running in the background
	plugins: [{
		path: '../../node_modules/proui-utils/Compressed_Utils/GeneralHook.js',
	}],

	capabilities: {
		browserName: 'chrome',
//		proxy: {
//			proxyType: 'manual',
//			httpProxy: 'sjc1intproxy01.crd.ge.com:8080',
//			sslProxy: 'sjc1intproxy01.crd.ge.com:8080'
//		},
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

	 //Browser options
	//multiCapabilities: [
	//	// {
	//	// browserName: 'internet explorer',
	//	// platform: 'ANY',
	//	// version: '11'
	//	// },
    //
	//	// {
	//	// browserName: 'firefox',
	//	// },
    //
	//	{
	//		browserName: 'chrome',
	//		count: 1,
	//		shardTestFiles: false,
	//		maxInstances: 1,
	//		'chromeOptions': {
	//			args: ['--no-sandbox', '--test-type=browser'],
	//			// Set download path and avoid prompting for download even though
	//			// this is already the default on Chrome but for completeness
	//			prefs: {
	//				'download': {
	//					'prompt_for_download': false,
	//					'directory_upgrade': true,
	//					'default_directory': 'C:/Jenkins/sharedspace/public/test/e2e-reboot/steps/'
	//				}
	//			}
	//		}
	//	}
    //
	//],

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
		var reportsPath = "./Reports/";

		mkdirp(reportsPath, function (err) {
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
		path = require('path');
		Cucumber = require('cucumber');
		fs = require('fs');

		// Initializing page object variables
		loginPage = require('../PageObjects/apm-login-po.js');
		loginSpec = require('../step_definitions/login-spec.js');
		apmlandingPage = require('../PageObjects/apm-landing-po.js');
		wfvPage = require('../PageObjects/wfv-po.js');
		assetTenantPage = require('../PageObjects/asset-tenant-po.js');

		// Initializing necessary utils from ProUI-Utils module
		TestHelper = require('ProUI-Utils').TestHelper;
		ElementManager = require('ProUI-Utils').ElementManager;
		Logger = require('ProUI-Utils').Logger;
		cem = new ElementManager('../../../Common_Template/common-element-repo.json');
		TestHelper.setElementManager(cem);
        RestHelper = require('ProUI-Utils').RestHelper;

		//commonTestData = require('../TestData/common-test-data.json').data;
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
		login: {
			baseUrl: 'https://apm-tubs-qa2.run.asv-pr.ice.predix.io/tenant0809',
			"username": "tenant0809-smokeuser",
			"password": "Pa55w0rd",
		}
	},

	resultJsonOutputFile: null,

	// If true, protractor will restart the browser between each test.
	// CAUTION: This will cause your tests to slow down drastically.
	restartBrowserBetweenTests: false,

	// Custom framework in this case cucumber
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {

		// define your step definitions in this file
		require: [
            '../step_definitions/env.js',
            '../step_definitions/login-spec.js',
            '../../Test_Modules/Assets/step_definitions/*',
            '../../node_modules/proui-utils/Compressed_Utils/Reporter.js',
            '../../Test_Modules/Highchart/step_definitions/*',
            '../../Test_Modules/RestAPIExample/step_definitions/rest-example-step-def-highchart.js',
			'../../Test_Modules/RestAPIExample/step_definitions/rest-example-step-def.js',
			'../../Test_Modules/SinglePage/Step_Definitions/singlepage-step-def.js'
		],

		//format: 'pretty'
	}
};
