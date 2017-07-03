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


            changeDates: function () {
                return TestHelper.elementToBeClickable("analysisPage", "fromDate").then(function () {
                    return cem.findElement("analysisPage", "fromDate").clear().sendKeys("07/10/2016").then(function () {
                        return TestHelper.elementToBeClickable("analysisPage", "fromTime").then(function () {
                            return cem.findElement("analysisPage", "fromTime").clear().sendKeys("10:00:00 PM").then(function () {
                                return TestHelper.elementToBeClickable("analysisPage", "toDate").then(function () {
                                    return cem.findElement("analysisPage", "toDate").clear().sendKeys("07/13/2016").then(function () {
                                        return TestHelper.elementToBeClickable("analysisPage", "toTime").then(function () {
                                            return cem.findElement("analysisPage", "toTime").clear().sendKeys("10:00:00 PM").then(function () {
                                                return TestHelper.elementToBeClickable("analysisPage", "submitButton");
                                            })
                                        })
                                    })
                                })
                            })
                        })

                    })
                })
            },


            checkChartPage: function () {
                console.log("checking chart element");
                return TestHelper.isElementPresent(currentPage, 'chartHeader')
            },

            setChart: function () {
                console.log("Before")
                section = cem.findElement(currentPage, 'graphWidgetContainer');
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

            getApmChartData: function (startx, starty, endx, index_data, rollrange, rolldirection) {
                return chart.getApmChartData(startx, starty, endx, index_data, rollrange, rolldirection);
            },

            compareData: function(testdata, orgfile) {
                return chart.compareData(testdata, orgfile);
            },

            getTooltipInfo: function(Timestamp, Tagname, needverify, startx, starty, endx, rollrange, rolldirection){
                return chart.getTooltipInfo(Timestamp, Tagname, needverify, startx, starty, endx, rollrange, rolldirection);
            }
        }

    };

    module.exports = new HighchartPage();

}());