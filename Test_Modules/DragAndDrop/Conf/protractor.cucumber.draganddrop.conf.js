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

		dragAndDrop: ["../Features/dragAndDrop.feature"]

	},

	// Hooks running in the background
	plugins: [{
		path: '../../../node_modules/proui-utils/Compressed_Utils/GeneralHook.js',
	}],

	// Browser options
	multiCapabilities: [
		// {
		// browserName: 'internet explorer',
		// platform: 'ANY',
		// version: '11'
		// },

		// {
		// browserName: 'firefox',
		// },

		{
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
		}

	],

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
		loginPage = require('../PageObjects/login-po.js');
		analysisPage = require('../PageObjects/analysis-dash-po.js');
		navPage= require('../PageObjects/nav-po.js')

		// Initializing necessary utils from ProUI-Utils module
		TestHelper = require('ProUI-Utils').TestHelper;
		TestHelperPO = require('ProUI-Utils').TestHelperPO;
		ElementManager = require('ProUI-Utils').ElementManager;
		Logger = require('ProUI-Utils').Logger;
		cem = new ElementManager('../../../Common_Template/common-element-repo.json');
		TestHelper.setElementManager(cem);

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
			username: '502386343',
			password: 'APM2014Test',

			// admin_username:'acs0510-admin',// QA env
			//  admin_username:'patch20150520-admin',// preprod env
			// admin_password:'test',

			// analyst_username:'tenant0609-smokeuser',// QA env
			// analyst_username:'patch20150520user',// preprod env
			// analyst_username:'tenant0624-smokeuser',// rc2 env

			// Users for acs testing
			// avid_mgr_username:'tenant0609-smokeuser',// QA env
			// avid_mgr_username:'patch20150520user',// preprod env
			// avid_mgr_username:'tenant0624-smokeuser',// rc2 env

			// analysis only users
			admin_username:'acs_analysis_admin',// dev2 / qa2 env
			admin_password:'testacs01',
			avid_mgr_username:'acs_analysis_mgr',// dev2 /qa2 env
			avid__mgr_password:'testacs01',
			//avid_mgr_username:'sample-admin',// dev2
			//avid__mgr_password:'test123',
			avid_create_username:'acs_analysis_create',
			avid_viewonly_username:'acs_analysis_view',
			avid_createView_username:'acs_analysis_createView',
			avid_user_password:'testacs01',

			baseUrl: 'http://apm-application-dev.grc-apps.svc.ice.ge.com',
			//  testUrl: 'https://apm-application-preprod.run.asv-pr.ice.predix.io/sample'
			// testUrl: 'https://apm-qa.grc-apps.svc.ice.ge.com/tenant0609'   // QA env
			//  testUrl: 'https://preprod-apm.predix.com/patch20150520'   // preprod env
			// testUrl:'https://apm-tubs-rc2.run.asv-pr.ice.predix.io/tenant0624',   // rc2 env
			analyst_username:'acs_analysis_mgr',// qa2 env
			//analyst_username:'sample-admin',// dev2 env
			analyst_password:'testacs01', //qa2
			//analyst_password:'test123', //dev2
			testUrl:'https://apm-tubs-qa2.run.asv-pr.ice.predix.io/tenant0809'  // qa2 env
			//testUrl:'https://apm-tubs-qa2.run.asv-pr.ice.predix.io/tenant0626'   // qa2 env
			//testUrl:'https://apm-tubs-dev2.run.asv-pr.ice.predix.io/regression'   // dev2 env
			//testUrl:'https://apm-tubs-dev2.run.asv-pr.ice.predix.io/sample'   // dev2 env

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
			'../../../Common_Template/step_definitions/env.js',
			'./../../../node_modules/proui-utils/Compressed_Utils/Reporter.js',
			'../step_definitions/*'
		],

		format: 'pretty'
	}
};
