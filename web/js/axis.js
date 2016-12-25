selectedRegionId = 1;
selectedCircleId = 0;
selectedCityId = 0;
selectedRoleId = 0;


$(document).ready(function () {
    $('.mdl-layout__tab').on('click', function () {
//        if ($('a.is-active').attr('href') === '#scroll-tab-1') {
//            alert("SCROLL TAB 1");
//        }
//        if ($('a.is-active').attr('href') === '#scroll-tab-2') {
//            alert("SCROLL TAB 2");
//        }
    });
//    if ($('a.is-active').attr('href') === '#scroll-tab-1') {
//        alert("SCROLL TAB 1");
//    }
//    if ($('a.is-active').attr('href') === '#scroll-tab-2') {
//        alert("SCROLL TAB 1");
//    }
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
    
    for(var i=0; i<jsonObj.length ; i++){
        series.push([Date.UTC(jsonObj[i].year, jsonObj[i].month, jsonObj[i].day), jsonObj[i].count]);
    }
    
    Highcharts.chart(chartId, {
        chart: {
            zoomType: 'x',
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
            text: 'Candidate Applications Per Month'
        },
//        subtitle: {
//            text: document.ontouchstart === undefined ?
//                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
//        },
        xAxis: {
            type: 'datetime'
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
    var defaultTitle = "Overall Location Count";
    var drilldownTitle = "Location Count by ";

    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
                base = '#7986CB',
                i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());

    var chart = new Highcharts.chart(chartId, {
        chart: {
//            height: 300,
            type: 'pie',
            events: {
                drilldown: function (e) {
                    chart.setTitle({text: drilldownTitle + e.point.name});
                    console.log("DRILL DOWN");
                    var roleCountTitle = 'Role Drill DOWN';
                    data = [{
                            name: 'Tooltip Text',
                            colorByPoint: true,
                            data: [{
                                    name: 'Animals',
                                    y: 5
                                }, {
                                    name: 'Fruits',
                                    y: 2
                                }, {
                                    name: 'Cars',
                                    y: 4
                                }]
                        }];
                    createRoleCountChart("get-role-count", data, roleCountTitle);
//                    alert("DRILL DOWN ALERT");
                },
                drillup: function (e) {
                    chart.setTitle({text: defaultTitle});
                    console.log("DRILL UP");
                    var roleCountTitle = 'Role Drill UP';
                    data = [{
                            name: 'Tooltip Text',
                            colorByPoint: true,
                            data: [{
                                    name: 'Animals2',
                                    y: 5
                                }, {
                                    name: 'Fruits3',
                                    y: 2
                                }, {
                                    name: 'Cars4',
                                    y: 4
                                }]
                        }];
                    createRoleCountChart("get-role-count", data, roleCountTitle);
//                    alert("DRILL UP ALERT");
                },
                click: function (e) {
//                    console.log("Hey, there")
//                    alert("Oops, I just got clicked !!! ")
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
            text: defaultTitle
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
            series: [{
                    id: 'fru',
                    name: 'Fruits',
                    data: [
                        ['Apples', 4],
                        ['Pears', 6],
                        ['Oranges', 2],
                        ['Grapes', 8]
                    ]
                }, {
                    id: 'carz',
                    name: 'Cars',
                    data: [{
                            name: 'Toyota',
                            y: 4,
                            drilldown: 'toyota'
                        },
                        ['Volkswagen', 3],
                        ['Opel', 5]
                    ]
                }, {
                    id: 'toyota',
                    name: 'Toyota',
                    data: [
                        ['RAV4', 3],
                        ['Corolla', 1],
                        ['Carina', 4],
                        ['Land Cruiser', 5],
                        {name: ' drilldownToyota',
                            y: 10,
                            drilldown: 'dummy'}
                    ]
                }, {
                    id: 'dummy',
                    name: 'DUMB',
                    data: [
                        ['x', 25],
                        ['y', 50]]
                }]
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
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
        series: [{
//                RASHMI
                name: 'Overview',
                colorByPoint: true,
                data: [{
                        name: 'Fruits',
                        y: 10,
                        drilldown: 'fru'
                    }, {
                        name: 'Cars',
                        y: 12,
                        drilldown: 'carz'
                    }, {
                        name: 'Countries',
                        y: 8
                    }]
            }]
    });
}

function createRoleCountChart(chartId, data, title) {

    Highcharts.setOptions({
        colors: ['#303F9F', '#1976D2', '#0288D1', '#0097A7', '#00796B','#388E3C','#689F38','#AFB42B','#FBC02D','#FFA000','#F57C00','#E64A19','#d32f2f', '#C2185B', '#7B1FA2', '#512DA8']
    });
    
    // Create the chart
    var chart = new Highcharts.Chart(chartId, {
        chart: {
            type: 'bar',
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
            text: title
        },
        xAxis: {
            type: 'category'
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
        series: data
    });
}

function createRoleCountChartOnLoad(chartId) {
    var chartCountTitle = 'Role Count on pg Load';
    data = [{
            name: 'On Load',
            colorByPoint: true,
            data: [{
                    name: 'A',
                    y: 5
                }, {
                    name: 'B',
                    y: 2
                }, {
                    name: 'C',
                    y: 4
                }]
        }];
    createRoleCountChart(chartId, data, chartCountTitle);
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
            $("#candidateTable").html(res);
        }
    });
}