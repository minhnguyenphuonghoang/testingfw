var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {
    'use strict';

    this.Given(/^The OO application is correctly logged in$/, function (callback) {

        //Using login page object method to check if user has logged in.

        loginPageOO.checkHomePageOO().then(function (completed) {

            //Calling logger to write specific details
            Logger.info("Asserting if logged in\n");
            // Using the promise returned from checkHomePage as a parameter in TestHelper class to assert if true
            TestHelper.assertTrue(completed, 'Not logged in');
            //apmlandingPage.selectAnalysis().then(function () {
               callback();
           // })

            //Callback once test is complete
        });

    });

    this.When(/^I go OO Config dashboard and select a chart from BPCANORTH$/, function (callback) {
        //apmHighChartPage.navigateToAvidChart().then(function () {
        ooHighChartPage.navigateToOODashChart().then(function () {
            //apmHighChartPage.isChartVisibile().then(function (result) {
                //apmHighChartPage.changeDates().then(function () {
            ooHighChartPage.setChart();
                    Logger.info("Asserting if chart is visible\n");
                //TestHelper.assertTrue(result, 'Chart is not available');
                callback();
            //});
            //})
        });



    });

    this.Then(/^I should be able to see all the OO DashBoard chart's details$/, function (callback) {
        //apmHighChartPage.checkChartPage().then(function () {
        console.log("Header loaded. Proceeding to set chart");
        // Setting the Highchart to retrieve information from it

        console.log("After setting section")

        function getTimestamp(n) {
            var date = new Date().getTime()
            console.log("date is" + date)
            var date_now = date + n*1000
            var new_date = new Date(date_now).toUTCString().replace(/ GMT$/, "")
            console.log("new_date is" + new_date);
            var p1 = new_date.split(",");
            p1 = p1[1];
            console.log("p1 is" + p1);
            p1 = p1.split(" ");
            console.log("p1 is" + p1.toString());
            var res = p1[p1.length - 1] + " +0000" + p1[2] + " " + p1[1] + "  " + p1[3];
            console.log("res is" + res.toString())
            return res;
        }

        var timestamp_1 = getTimestamp(15)
        var timestamp_2 = getTimestamp(16)

        var time_stamp = timestamp_1+","+ timestamp_2
        var endx = 600
        var startx = 310
        var starty = 450
        var loopTime = 3
        var rollrange = 5
        var rolldirection ="down"
        // ooHighChartPage.getOOChartData(time_stamp, loopTime, startx, starty, endx, rollrange, rolldirection).then(function (data) {
        //     console.log("data is " + data)
        //     TestHelper.assertTrue((data.length > 0));
        //     callback()
        // });
        rollrange = 5
        var timestamp_3 = getTimestamp(550)
        var timestamp_4 = getTimestamp(551)
        time_stamp = timestamp_3+","+ timestamp_4
        ooHighChartPage.getOOChartData(time_stamp, loopTime, startx, starty, endx, rollrange, rolldirection).then(function (data) {
            console.log("data is " + data)
            TestHelper.assertTrue((data.length > 0));
            callback();
        });


    });
};
module.exports = myStepDefinitionsWrapper;