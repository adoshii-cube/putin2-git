selectedRegionId = 1;
selectedCircleId = 0;
selectedCityId = 0;
selectedRoleId = 0;

drillDownRegion = "";
drillDownCircle = "";

text = "";
$(document).ready(function () {

    var chartGetCandidatesPerMonthId = 'get-candidates-per-month';
    createCandidatesPerMonthChart(chartGetCandidatesPerMonthId);

    var chartGetLocationCountId = 'get-location-count';
    createLocationCountChart(chartGetLocationCountId);

    var chartGetRoleCountId = 'get-role-count';
    createRoleCountChartOnLoad(chartGetRoleCountId);
//    createRoleCountChart(chartGetRoleCountId);

    //On Page Load
    $("select option").each(function () {
        if ($(this).text() === $("#dropdown_region option:selected").text() ||
                $(this).text() === $("#dropdown_circle option:selected").text() ||
                $(this).text() === $("#dropdown_city option:selected").text() ||
                $(this).text() === $("#dropdown_role option:selected").text()
                )
        {
            $(this).attr("selected", "selected");
        }
    });

});

//On dropdown Update - REGION
$('#dropdown_region').on('change', function () {
    $("#dropdown_region option").each(function () {
        $(this).removeAttr("selected");
        if ($(this).text() === $("#dropdown_region option:selected").text()) {
            $(this).attr("selected", "selected");
        }
    });
    selectedRegionId = $(this).val();
    updateValuetoAjax('Region', selectedRegionId);
});

//On dropdown Update - CIRCLE
$('#dropdown_circle').on('change', function () {
    $("#dropdown_circle option").each(function () {
        $(this).removeAttr("selected");
        if ($(this).text() === $("#dropdown_circle option:selected").text()) {
            $(this).attr("selected", "selected");
        }
    });
    selectedCircleId = $(this).val();
    updateValuetoAjax('Circle', selectedCircleId);
});

//On dropdown Update - CITY
$('#dropdown_city').on('change', function () {
    $("#dropdown_city option").each(function () {
        $(this).removeAttr("selected");
        if ($(this).text() === $("#dropdown_city option:selected").text()) {
            $(this).attr("selected", "selected");
        }
    });
    selectedCityId = $(this).val();
    updateValuetoAjax('City', selectedCityId);
});

//On dropdown Update - ROLE
$('#dropdown_role').on('change', function () {
    $("#dropdown_role option").each(function () {
        $(this).removeAttr("selected");
        if ($(this).text() === $("#dropdown_role option:selected").text()) {
            $(this).attr("selected", "selected");
        }
    });
    selectedRoleId = $(this).val();
    updateValuetoAjax('Role', selectedRoleId);
});

function createCandidatesPerMonthChart(chartId) {

    var obj = $('#object').val();
    var jsonObj = $.parseJSON(obj);
    var series = [];

    for (var i = 0; i < jsonObj.length; i++) {
        series.push([Date.UTC(jsonObj[i].year, jsonObj[i].month, jsonObj[i].day), jsonObj[i].count]);
    }

    Highcharts.chart(chartId, {
        chart: {
            type: "graphType",
//            zoomType: 'x',
            height: 250,
            style: {
                fontFamily: 'Roboto'
            },
            spacingBottom: 45,
            spacingTop: 45,
            spacingLeft: 15,
            spacingRight: 15
        },
        credits: false,
        title: {
            text: 'Candidate Applications Per Month',
            align: 'left',
            y: -10
//            margin: 0,
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {//custom date formats for different scales
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%e. %b',
                week: '%e. %b',
                month: '%b', //month formatted as month only
                year: '%Y'
            },
            tickInterval: 30 * 24 * 3600 * 1000 // interval of 1 day
        },
        yAxis: {
            title: {
                text: '# of Applications per month'
            }
        },
        colors: ['#303f9f'],
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        legend: {
            enabled: false
        },
        series: [{
                type: 'column',
                name: '# of Applications ',
                data: series
            }]
    });
}

function createLocationCountChart(chartId) {
    var defaultTitle = "Applications by Location";
    var drilldownTitle = "Applications for ";

    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
                base = '#7986CB',
                i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 15).get());
        }
        return colors;
    }());

    var regionObj = $('#jArrayRegionCount').val();
    var jsonRegionObj = $.parseJSON(regionObj);
    var regionSeries = [];
    for (var i = 0; i < jsonRegionObj.length; i++) {
        regionSeries.push({"name": jsonRegionObj[i].regionName, "y": jsonRegionObj[i].count, "drilldown": "R" + jsonRegionObj[i].regionId});
    }

    var circleObj = $('#jArrayCircleCount').val();
    var jsonCircleObj = $.parseJSON(circleObj);
    var eastData = [];
    var northData = [];
    var southData = [];
    var westData = [];
    for (var i = 0; i < jsonCircleObj.length; i++) {
        if (jsonCircleObj[i].regionName === "East") {
            eastData.push({"name": jsonCircleObj[i].circleName, "y": jsonCircleObj[i].count, "drilldown": "C" + jsonCircleObj[i].circleId});
        } else if (jsonCircleObj[i].regionName === "North") {
            northData.push({"name": jsonCircleObj[i].circleName, "y": jsonCircleObj[i].count, "drilldown": "C" + jsonCircleObj[i].circleId});
        } else if (jsonCircleObj[i].regionName === "South") {
            southData.push({"name": jsonCircleObj[i].circleName, "y": jsonCircleObj[i].count, "drilldown": "C" + jsonCircleObj[i].circleId});
        } else if (jsonCircleObj[i].regionName === "West") {
            westData.push({"name": jsonCircleObj[i].circleName, "y": jsonCircleObj[i].count, "drilldown": "C" + jsonCircleObj[i].circleId});
        }
    }

    var circleSeries = [];
    for (var i = 0; i < jsonRegionObj.length; i++) {
        if (jsonRegionObj[i].regionName === "East") {
            circleSeries.push({"id": "R" + jsonRegionObj[i].regionId, "name": jsonRegionObj[i].regionName, "data": eastData});
        } else if (jsonRegionObj[i].regionName === "North") {
            circleSeries.push({"id": "R" + jsonRegionObj[i].regionId, "name": jsonRegionObj[i].regionName, "data": northData});
        } else if (jsonRegionObj[i].regionName === "South") {
            circleSeries.push({"id": "R" + jsonRegionObj[i].regionId, "name": jsonRegionObj[i].regionName, "data": southData});
        } else if (jsonRegionObj[i].regionName === "West") {
            circleSeries.push({"id": "R" + jsonRegionObj[i].regionId, "name": jsonRegionObj[i].regionName, "data": westData});
        }
    }

    var cityObj = $('#jArrayCityCount').val();
    var jsonCityObj = $.parseJSON(cityObj);
    var circleCityMap = {};
    for (var i = 0; i < jsonCityObj.length; i++) {
        if ("C" + jsonCityObj[i].circleId in circleCityMap) {
            var dataCircle = circleCityMap["C" + jsonCityObj[i].circleId];
            dataCircle.push([jsonCityObj[i].cityName, jsonCityObj[i].count]);
            circleCityMap["C" + jsonCityObj[i].circleId] = dataCircle;
        } else {
            var dataCircle = [];
            dataCircle.push([jsonCityObj[i].cityName, jsonCityObj[i].count]);
            circleCityMap["C" + jsonCityObj[i].circleId] = dataCircle;
        }
    }

    for (var key in circleCityMap) {
        circleSeries.push({"id": key, "name": "Count", "data": circleCityMap[key]});
    }

    var chart = new Highcharts.chart(chartId, {
        chart: {
//            height: 310,
            type: 'pie',
            events: {
                drilldown: function (e) {
                    chart.setTitle({text: drilldownTitle + e.point.name});
                    var roleCountTitle = 'Applications by role for ' + e.point.name;
                    if (drillDownRegion === "") {
                        drillDownRegion = e.seriesOptions.id;
                    } else if (drillDownRegion !== "" && drillDownCircle === "") {
                        drillDownCircle = e.seriesOptions.id;
                    }
                    $.ajax({
                        type: "POST",
                        data: {
                            region: drillDownRegion,
                            circle: drillDownCircle
                        },
                        url: "roleCount.jsp",
                        success: function (res) {
                            createRoleCountChart("get-role-count", res, roleCountTitle);
                        },
                        error: function (res, err) {
                            console.log("error ::::::::: " + err);
                        }
                    });
                },
                drillup: function (e) {
                    chart.setTitle({text: defaultTitle});
                    if (drillDownCircle !== "") {
                        drillDownCircle = "";
                        chart.setTitle({text: "Applications for " + e.seriesOptions.name});
                        roleCountTitle = "Applications by role for " + e.seriesOptions.name;
                    } else if (drillDownCircle === "" && drillDownRegion !== "") {
                        drillDownRegion = "";
                        roleCountTitle = "Applications by Role";
                    }

                    $.ajax({
                        type: "POST",
                        data: {
                            region: drillDownRegion,
                            circle: drillDownCircle
                        },
                        url: "roleCount.jsp",
                        success: function (res) {
                            createRoleCountChart("get-role-count", res, roleCountTitle);
                        },
                        error: function (res, err) {
                            console.log("error ::::::::: " + err);
                        }
                    });
                },
//                click: function (e) {
//                    
//                },

                load: function (event) {
                    var total = 0;
                    for (var i = 0, len = this.series[0].yData.length; i < len; i++) {
                        total += this.series[0].yData[i];
                    }
                    text = this.renderer.text(
                            'Total: ' + total,
                            this.plotLeft,
                            this.plotTop - 20
                            ).attr({
                        zIndex: 5
                    }).add();
                },
                redraw: function (event) {
                    var total = 0;
                    for (var i = 0, len = this.series[0].yData.length; i < len; i++) {
                        total += this.series[0].yData[i];
                    }
                    text.destroy();
                    text = this.renderer.text(
                            'Total: ' + total,
                            this.plotLeft,
                            this.plotTop - 20
                            ).attr({
                        zIndex: 5
                    }).add();
                }
            },
            style: {
                fontFamily: 'Roboto'
            },
            spacingBottom: 45,
            spacingTop: 45,
            spacingLeft: 15,
            spacingRight: 15
        },
        credits: false,
        title: {
            text: defaultTitle,
            align: 'left',
            y: -10
        },
        xAxis: {
            categories: true
        },
        drilldown: {
            drillUpButton: {
//                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0,
                    align: 'left',
                    verticalAlign: 'top'
                },
                theme: {
                    fill: 'white',
                    stroke: '#303f9f',
                    states: {
                        hover: {
                            fill: '#C5CAE9'
//                            stroke: 'transparent'
                        }
                    }
                }

            },
            series: circleSeries
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                shadow: false,
                showInLegend: true
            },
            pie: {
//                size: '80%',
            }
        },
        legend: {
            enabled: true,
            floating: false,
            verticalAlign: 'bottom',
            align: 'center',
            y: 50
        },
        series: [{
                name: 'Count',
                colorByPoint: true,
                data: regionSeries
            }]
    });
}

function createRoleCountChart(chartId, data, title) {

    var roleSeries = [];

    for (var i = 0; i < data.length; i++) {
        roleSeries.push({"name": data[i].name, "y": data[i].count});
    }
    Highcharts.setOptions({
        colors: ['#303F9F', '#1976D2', '#0288D1', '#0097A7', '#00796B', '#388E3C', '#689F38', '#AFB42B', '#FBC02D', '#FFA000', '#F57C00', '#E64A19', '#d32f2f', '#C2185B', '#7B1FA2', '#512DA8']
    });

    // Create the chart
    var chart = new Highcharts.Chart(chartId, {
        chart: {
            type: 'bar',
//            height: 310,
//            renderTo: chartId,
            style: {
                fontFamily: 'Roboto'
            },
            spacingBottom: 45,
            spacingTop: 45,
            spacingLeft: 15,
            spacingRight: 15
        },
        credits: false,
        title: {
            text: title,
            align: 'left',
            y: -10
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Count'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
                name: 'Count',
                colorByPoint: true,
                data: roleSeries
            }]
    });
}

function createRoleCountChartOnLoad(chartId) {

    var roleCount = $('#jArrayRoleCount').val();
    var jsonObj = $.parseJSON(roleCount);
    var chartCountTitle = 'Applications by Role';
    createRoleCountChart(chartId, jsonObj, chartCountTitle);
}

function updateValuetoAjax(key, value) {
    if (key === 'Region') {
        makeAjaxRequest(value, selectedCircleId, selectedCityId, selectedRoleId);
    } else if (key === 'Circle') {
        makeAjaxRequest(selectedRegionId, value, selectedCityId, selectedRoleId);
    } else if (key === 'City') {
        makeAjaxRequest(selectedRegionId, selectedCircleId, value, selectedRoleId);
    } else if (key === 'Role') {
        makeAjaxRequest(selectedRegionId, selectedCircleId, selectedCityId, value);
    }
}

function makeAjaxRequest(regionId, circleId, cityId, roleId) {
    $('#candidateTable').hide();
    $('#loader').css('display', 'block');
    $('form select').prop('disabled', true);
    $('form select').parent().addClass("is-disabled");
    $.ajax({
        type: "POST",
        data: {
            region: regionId,
            circle: circleId,
            city: cityId,
            role: roleId
        },
        url: "candidateTable.jsp",
        success: function (res) {
            $('#loader').css('display', 'none');
            $("#candidateTable").html(res);
            $('form select').removeAttr("disabled");
            $('form select').parent().removeClass("is-disabled");
            $('#candidateTable').show();
            componentHandler.upgradeDom();
        }
    });
}