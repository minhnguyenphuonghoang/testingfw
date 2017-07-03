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
    var hem = new ElementManager('../../../Test_Modules/Highchart/highchart-element-repo.json');
    var section;

    var HighchartPage = function () {

        return {

            setChart: function () {
                section = hem.findElement('lineChartPage', 'lineChartContainer');
                chart.setChartElements(section);
            },

            isChartVisibile: function () {
                return chart.isChartDisplayed();
            },

            getXAxisLabels: function () {
                return chart.getXaxisLabels();
            },

            getYAxisLabels: function () {
                return chart.getYaxisLabels();
            },

            getYaxisText: function () {
            	return chart.getYaxisText();
            },

            getLegends: function() {
                return chart.getLegendsFromSVG();
            },

            getChartData: function(index_data) {
                return chart.getData(index_data);
            },

            compareData: function(data) {
                return chart.compareData(data);
            }

        }

    };

    module.exports = new HighchartPage();

}());