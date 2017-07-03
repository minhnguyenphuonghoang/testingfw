var myStepDefinitionsWrapper;
myStepDefinitionsWrapper = function () {
    'use strict';

    this.Given(/^The application is correctly logged in$/, function (callback) {

        //Using login page object method to check if user has logged in.
        //perfRunner.start();

        loginPage.checkHomePage().then(function (completed) {

            //Calling logger to write specific details
            Logger.info("Asserting if logged in\n");

            // Using the promise returned from checkHomePage as a parameter in TestHelper class to assert if true
            TestHelper.assertTrue(completed, 'Not logged in');
            apmlandingPage.selectAnalysis().then(function () {
                callback();
            })
            //Callback once test is complete
        });
    });

    this.When(/^I go to the dashboard and select a chart from E2E edison$/, function (callback) {
        apmHighChartPage.navigateToAvidChart().then(function () {

            //apmHighChartPage.isChartVisibile().then(function (result) {
            apmHighChartPage.changeDates().then(function () {
                apmHighChartPage.setChart();
                Logger.info("Asserting if chart is visible\n");
                //TestHelper.assertTrue(result, 'Chart is not available');
                callback();
            });
            //})
        });

    });

    this.Then(/^I should be able to see all the chart's details$/, function (callback) {
        //apmHighChartPage.checkChartPage().then(function () {
        console.log("Header loaded. Proceeding to set chart");
        // Setting the Highchart to retrieve information from it

        console.log("After setting section")
        // apmHighChartPage.getData();


        //expect(wideElement.getText()).toEqual('Three');

        apmHighChartPage.isChartVisibile().then(function (result) {
            var wideElement = element(by.js(function () {
                console.log("yea its me")
                var spans = document.querySelectorAll('span');
                for (var i = 0; i < spans.length; ++i) {
                    if (spans[i].offsetWidth > 100) {
                        return spans[i];
                        console.log("executed")
                    }
                    console.log("executed")
                }
                console.log("executed")
            }));
            Logger.info("Asserting if chart is visible\n");

            // TestHelper.assertTrue(result, 'Chart is not available');

            //Retrieving the X-Axis Labels
            apmHighChartPage.getXAxisLabels().then(function (xlabels) {
                Logger.info('x-axis labels : ' + xlabels + '\n' + 'There are ' + xlabels.length + ' labels');
                console.info('x-axis labels : ' + xlabels + '\n' + 'There are ' + xlabels.length + ' labels');
                // Asserting if there are 4 labels on the X-Axis
                //TestHelper.assertEqual(xlabels.length, 6, callback);
                //callback();

                var startx = 300
                var starty = 450
                var endx = 400
                var rollrange = 5
                var rolldirection ="down"


                // // test case 1: verify a tag exit in a time stamp
                //
                // var Timestamp1 ="07/11/16 08:30:00 AM";
                // var Tagname_1 = "EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual"
                // apmHighChartPage.getTooltipInfo(Timestamp1,Tagname_1, true, startx, starty, endx, rollrange, rolldirection).then(function(data){
                //     console.log("data_2 is " +data)
                //     TestHelper.assertTrue(data, callback);
                //     //callback()
                // })
                //
                // // test case 2: verify two tags in a time stamp
                //
                // rollrange = 0;
                // Timestamp1= "07/12/16 12:45:00 AM"
                // Tagname_1 = "EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual,EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual_Smoothed"
                // apmHighChartPage.getTooltipInfo(Timestamp1,Tagname_1, true, startx, starty, endx, rollrange, rolldirection).then(function(data){
                //     console.log("data_3 is :" + data);
                //     TestHelper.assertTrue(data, callback);
                // })
                //
                // //test case 3: get data in in a time range
                //
                // Timestamp1 ="07/11/16 08:30:00 AM,07/11/16 02:00:00 PM";
                // apmHighChartPage.getTooltipInfo(Timestamp1,Tagname_1, false, startx, starty, endx, rollrange, rolldirection).then(function(timerange_data){
                //     console.log("timerange_data is :" + timerange_data);
                //     apmHighChartPage.compareData(timerange_data, "./testRange_data.csv").then(function (result) {
                //         console.log("result is "+ result)
                //         TestHelper.assertTrue(result, callback);
                //     })
                //     //TestHelper.assertEqual(timerange_data.toString(), comparedata, callback);
                // })
                //
                // // test case 4: if a tag is not exit in a time stamp, try to get the tooltip information
                // //             show "no data" under the not exit tag
                //
                // var Timestamp0 ="07/12/16 08:00:00 AM"
                // var Tagname_0 = "EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual, test_teg"
                // apmHighChartPage.getTooltipInfo(Timestamp0,Tagname_0, false, startx, starty, endx, rollrange, rolldirection).then(function(data){
                //     console.log("data_1 is "+data)
                //     var int_1 = data.toString().replace(/\.[0-9]\d*/g, " ")
                //     TestHelper.assertEqual(int_1.toString(), "07/12/16 08:00:00 AM, 1344  temperature,no data", callback);
                //     callback()
                // })

                // test case 5: get all data and compare to the data in the file

                rollrange= 5
                var index_data = "a"
                apmHighChartPage.getApmChartData(startx, starty, endx,index_data, rollrange, rolldirection).then(function(testdata){
                    //console.log("whole data is "+ testdata);
                    apmHighChartPage.compareData(testdata, "./original_data.csv").then(function (result) {
                        console.log("result is "+ result)
                        TestHelper.assertTrue(result, callback);

                    })
                })

                // test case 6: find a tooltip tag in the highchart

                rollrange = 0;
                var index_data = "07/11/16 06:00:00 AM,EXHAUST_TEMP_T48A_EE-43-TI-11243A_Estimate: 0 temperature,EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual: 1357 temperature,EXHAUST_TEMP_T48B_EE-43-TI-11243B_Actual_Smoothed: 1357 temperature,EXHAUST_TEMP_T48A_EE-43-TI-11243A_Actual_Smoothed: 1355.5 temperature";
                apmHighChartPage.getApmChartData(startx, starty, endx, index_data, rollrange, rolldirection).then(function(testdata){
                    if(typeof testdata === "boolean"){
                        TestHelper.assertTrue(testdata, callback);
                        callback();
                    }else {
                        callback()
                    }
                })



                //Retrieving Y-Axis Labels
                // apmHighChartPage.getYAxisLabels().then(function (ylabels) {
                //     Logger.info('y-axis labels : ' + ylabels + '\n' + 'There are ' + ylabels.length + ' labels');
                //     console.info('y-axis labels : ' + ylabels + '\n' + 'There are ' + ylabels.length + ' labels');
                //
                //     // Asserting if there are 4 labels on the Y-Axis
                //     //TestHelper.assertEqual(ylabels.length, 3, callback);
                //     callback();
                // });
            });
        });
    });
    // });
};
module.exports = myStepDefinitionsWrapper;