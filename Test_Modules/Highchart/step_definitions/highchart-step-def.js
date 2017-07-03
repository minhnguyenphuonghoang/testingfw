/**
 * Main step definition. Add all glue code here in this class
 */

var myStepDefinitionsWrapper = function () {
	var highchartPage = require('../PageObjects/Highchart-po.js');
	var hem = new ElementManager('../../../Test_Modules/Highchart/highchart-element-repo.json');
	var testData = require('../TestData/highchart-test-data.json').data;

	geSSOLogin = function () {
		// pass through GE SSO page
		cem.findElement('geSSOPage', 'username').sendKeys(commonTestData.sso);
		cem.findElement('geSSOPage', 'password').sendKeys(commonTestData.password);
		cem.findElement( 'geSSOPage', 'password').sendKeys(protractor.Key.ENTER)
	}

	//'use strict';
	this.Given(/^I navigate (.*)$/, function (env, callback) {
		browser.driver.get(env).then(function () {
			browser.ignoreSynchronization = true;
		 	//geSSOLogin();

			TestHelper.setElementManager(hem);
			TestHelper.isElementPresent('homePage', 'lineChartLink').then(function () {
				callback();
			});
		});
	});

	this.When(/^I click on Line chart$/, function (callback) {
		TestHelper.elementToBeClickable('homePage', 'lineChartLink').then(function () {
			callback();
		});
	});

	this.Then(/^I should see the chart loaded$/, function (callback) {
		// Setting the Highchart to retrieve information from it
		highchartPage.setChart();

		highchartPage.isChartVisibile().then(function (result) {
			Logger.info("Asserting if chart is visible\n");
			TestHelper.assertTrue(result, 'Chart is not available');
			callback();
		});
	});

	this.Given(/^The chart is loaded/, function (callback) {
		//Checking to see if the Highchart is visible
		highchartPage.isChartVisibile().then(function (result) {
			Logger.info("Asserting if chart is visible\n");
			TestHelper.assertTrue(result, 'Chart is not available');
			callback();
		})
	});

	this.Then(/^I can view the chart details$/, function (callback) {
		//Getting Highchart data and storing it into a file
			//highchartPage.getData();

		// Retrieving the X-Axis Labels
		highchartPage.getXAxisLabels().then(function (xlabels) {
			Logger.info('x-axis labels : ' + xlabels + '\n' + 'There are ' + xlabels.length + ' labels');
			console.info('x-axis labels : ' + xlabels + '\n' + 'There are ' + xlabels.length + ' labels');

			// Asserting if there are 12 labels on the X-Axis
			//TestHelper.assertEqual(xlabels.length, testData.xlabels.length, callback);
		});

		//Retrieving Y-Axis Labels
		highchartPage.getYAxisLabels().then(function (ylabels) {
			Logger.info('y-axis labels : ' + ylabels + '\n' + 'There are ' + ylabels.length + ' labels');
			console.info('y-axis labels : ' + ylabels + '\n' + 'There are ' + ylabels.length + ' labels');

			// Asserting if there are 8 labels on the Y-Axis
			//TestHelper.assertEqual(ylabels.length, testData.ylabels.length, callback);
		});

		//Retrieving Y-Axis Text
		highchartPage.getYaxisText().then(function (ytext) {
			Logger.info('YText : ' + ytext + '\n');
			console.log('YText : ' + ytext + '\n');

			// Asserting if the Y-Axis text is equal to a string
			//TestHelper.assertInclude(ytext, testData.ytext, callback);

			console.log('I will start here');
			var index_data = "Sunday Jun 9 2013 USD to EUR: 0.7574";
			highchartPage.getData().then(function(found){
				if(typeof found === 'boolean' ){
					console.log("found it")
					callback();
				}else{
					console.log("not found it");
					callback();
				}
			});

			// highchartPage.getData().then(function(data){
			// 	console.log('size is :' + data.length);
			// 	console.log("Exited out of get Data" + data)
			// 	console.log(" comparing data");
			// 	var test = data
			// 	highchartPage.compareData(test).then(function(result){
			// 		if(result){
			// 			console.log(" passed");
			// 			callback();
			// 		}else {
			// 			console.log(" falied");
			// 			callback();
			// 		}
			// 	});
			// });

			//Retrieving the Legends
			highchartPage.getLegends().then(function (legends) {
				// Asserting to see if the second legend is equal to New York
				//TestHelper.assertEqual(legends[1], testData.legends[1], callback);
				Logger.info('legends : ' + legends + '\n');
				console.log('legends : ' + legends + '\n');
				callback();
			});



		});






	});
};
module.exports = myStepDefinitionsWrapper;