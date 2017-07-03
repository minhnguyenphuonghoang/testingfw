/**
 * Copyright (c) 2013 - 2015 GE Global Research. All rights reserved.
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

(function () {
    'use strict';

    var chart = require('ProUI-Utils').HighChart;
    var section;
    var currentPage = "dashboardPage"

    var HighchartPage = function () {

        return {

            navigateToChart: function () {
                return TestHelper.isElementPresent("highChartsHomepage", 'contextNameList').then(function () {
                    return TestHelper.elementToBeClickable(currentPage, 'e2eEdisonEnterpriseDiv').then(function () {
                        return TestHelper.elementToBeClickable(currentPage, 'azPrescottSiteDiv').then(function () {
                            return TestHelper.isElementPresent(currentPage, 'azPrescottSiteDivCheck').then(function () {
                                return TestHelper.elementToBeClickable(currentPage, 'azPrescottSiteButton').then(function () {
                                    return TestHelper.isElementPresent(currentPage, 'dropDownDashboardCheck').then(function () {
                                        //return TestHelper.isElementPresent(currentPage, 'cardDiv').then(function () {
                                            return TestHelper.elementToBeClickable(currentPage, 'dropDownDashboard').then(function () {
                                                return TestHelper.elementToBeClickable(currentPage, 'newDashboardNavigation').then(function () {
                                                //return TestHelper.elementToBeClickable(currentPage, 'graphNewTab').then(function () {
                                                //    browser.getAllWindowHandles().then(function (handles) {
                                                //        var secondWindowHandle = handles[1];
                                                //        browser.switchTo().window(secondWindowHandle).then(function () { //the focus moves on new ta
                                                //            console.log("Made it to the second window")
                                                //        });
                                                //     });
                                                //});
                                                //browser.sleep(5000);
                                            });
                                        //});
                                        });

                                    });
                                });
                            });
                        });
                    });
                });
            },
            navigateToAvidChart: function () {
                return TestHelper.elementToBeClickable("analysisPage", 'avidChartEnterprise').then(function () {
                    return TestHelper.elementToBeClickable("analysisPage", 'avidChartSite').then(function () {
                        return TestHelper.elementToBeClickable("analysisPage", 'avidChartSegment').then(function () {
                            return TestHelper.elementToBeClickable("analysisPage", 'avidChartAsset').then(function () {
                                return TestHelper.elementToBeClickable("analysisPage", 'avidChartAssetChild02').then(function () {
                                    return TestHelper.isElementPresent("analysisPage", 'avidChartAssetChild02Button').then(function () {
                                        return TestHelper.elementToBeClickable("analysisPage", 'avidChartAssetChild02Button').then(function () {
                                            return TestHelper.isElementPresent("analysisPage", 'svgCheck').then(function () {
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            },

            navigateToOODashChart: function () {
                return TestHelper.elementToBeClickable("OODashPage", 'bpAssetEnterpriseForTest').then(function () {
                    return TestHelper.elementToBeClickable("OODashPage", 'bpCaNorthSite').then(function () {
                        return TestHelper.elementToBeClickable("OODashPage", 'bpCaNorthSiteButton').then(function () {
                            return TestHelper.elementToBeClickable("OODashPage", 'menuDropDownArrow').then(function () {
                                return TestHelper.elementToBeClickable("OODashPage", 'ooDashboard').then(function () {
                                    // return TestHelper.isElementPresent("analysisPage", 'svgCheck').then(function () {
                                    // });
                                })
                            });
                        });
                    });
                });
            },



            checkChartPage: function () {
                console.log("checking chart element");
                return TestHelper.isElementPresent(currentPage, 'chartHeader')
            },

            setChart: function () {
                console.log("Before")
                section = cem.findElement(currentPage, 'OOgraphWidgetContainer');
                console.log("After getting section")
                chart.setChartElements(section);
            },

            isChartVisibile: function () {
                return chart.isChartDisplayed();
            },

            getXAxisLabels: function () {
                return chart.getXaxisLabels();
            },

            getYAxisLabels: function () {
                return chart. getYaxisLabels();
            },

            getYaxisText: function () {
                return chart.getYaxisText();
            },

            getLegends: function () {
                return chart.getLegendsFromSVG();
            },

            getData: function (index_data) {
                return chart.getData(index_data);
            },

            getOOChartData: function (time_stamp, loopTime, startx, starty, endx, rollrange, rolldirection) {
                return chart.getOOChartData(time_stamp, loopTime, startx, starty, endx, rollrange, rolldirection);
            },
            compareData: function(data) {
                return chart.compareData(data);
            },

            getTooltipInfo: function(Timestamp, Tagname, needverify){
                var alltagvalue = chart.getTooltipInfo(Timestamp, Tagname, needverify);
                //console.log("alltagvalue is" + alltagvalue);
                return alltagvalue;
            }
        }

    };

    module.exports = new HighchartPage();

}());