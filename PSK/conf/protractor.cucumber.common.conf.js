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

		// login: ['../Features/awbLogin_success.feature', '../Features/awbLogin_fail.feature'],
		// logout: ['../Features/awbLogout.feature'],
		search: ['../Features/awbSearch.Query.feature'],

	},


	capabilities: {
		browserName: 'chrome',
		// proxy: {
		// 	proxyType: 'manual',
		// 	httpProxy: 'sjc1intproxy01.crd.ge.com:8080',
		// 	sslProxy: 'sjc1intproxy01.crd.ge.com:8080'
		// },
		count: 1,
		shardTestFiles: true,
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
	
	params: {
		env: 'dev'
	},

	maxSessions: -1,

	allScriptsTimeout: 25000,

	// How long to wait for a page to load.
	getPageTimeout: 650000,

	// Before launching the application
	beforeLaunch: function () {
	},

	// Application is launched but before it starts executing
	onPrepare: function () {
		browser.ignoreSynchronization = true;
		// Create reports folder if it does not exist
		var folderName = (new Date()).toString().split(' ').splice(1, 4).join(' ');
		var mkdirp = require('mkdirp');
		var reportsPath = "./Reports/";
		screenShotPath = "./ScreenShot/";
		mkdirp(screenShotPath, function (err) {
			if (err) {
				console.error(err);
			} else {
			}
		});
		mkdirp(reportsPath, function (err) {
			if (err) {
				console.error(err);
			} else {
			}
		});

		browser.manage().deleteAllCookies();
		browser.manage().timeouts().pageLoadTimeout(50000);
		browser.manage().timeouts().implicitlyWait(30000);
		browser.driver.manage().window().setSize(1600, 1024);
		chai = require('chai');
		expect = chai.expect;
		path = require('path');
		Cucumber = require('cucumber');
		fs = require('fs');
		

		// Initializing page object variables
		loginPage = require('../page/awb-login-po.js');
		tenantPage = require('../page/awb-tenant-page.js');
		homePage = require('../page/awb-home-page.js');
		searchPage = require('../page/awb-search-page.js');

		// Initializing definition file
		// loginSpec = require('../step_definitions/login-spec.js');
		// searchSpec = require('../step_definitions/search-spec.js');


		// Initializing necessary utils from ProUI-Utils module
		TestHelper = require('ProUI-Utils').TestHelper;
		ElementManager = require('ProUI-Utils').ElementManager;
		Logger = require('ProUI-Utils').Logger;
		var dir =  path.resolve(__dirname);
		// cem = new ElementManager('C:/GE_AUTO/Git/ProUI/ProUI-master/AWB/common-element-repo.json');
		cem = new ElementManager(dir+'/common-element-repo.json');
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
			baseUrl: 'https://predix-asset-modeler-ui-aw-mvp3-dev.run.aws-usw02-pr.ice.predix.io',
			"tenantname": "aw-mvp3-dev",
			"username": "johnsmith",
			"Iusername": "Ajohnsmith",
			"password": "bcs",
			"query": "select * from template",
		}
	},

	resultJsonOutputFile: null,

	// If true, protractor will restart the browser between each test.
	// CAUTION: This will cause your tests to slow down drastically.
	restartBrowserBetweenTests: true,

	// Custom framework in this case cucumber
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {

		// define your step definitions in this file
		require: [
			'../step_definitions/login-spec.js',
			'../step_definitions/search-spec.js',
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
