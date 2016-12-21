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
    createRoleCountChart(chartGetRoleCountId);

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



//    $('select option').each(function () {
//        $("select").on("change", function () {
//            var selected = $(this).val();
//            $("#results").html("You selected: " + selected + $("select option:selected").val());
//        });
//    });
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
//        makeAjaxRequest(selectedRegionId, selectedCircleId, selectedCityId, selectedRoleId);
    //        $("#results").html("You selected: " + selected);
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
//        makeAjaxRequest(selectedRegionId, selectedCircleId, selectedCityId, selectedRoleId);
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
//        makeAjaxRequest(selectedRegionId, selectedCircleId, selectedCityId, selectedRoleId);
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
//        makeAjaxRequest(selectedRegionId, selectedCircleId, selectedCityId, selectedRoleId);
});

function createCandidatesPerMonthChart(chartId) {
    Highcharts.chart(chartId, {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Roboto'
            },
            spacingBottom: 45,
            spacingTop: 45,
            spacingLeft: 15,
            spacingRight: 15
        },
        credits: false,
        colors: ['#303f9f'],
        legend: {
            enabled: false
        },
        title: {
            text: 'Candidate Applications per Month'
        },
        subtitle: {
            text: 'Source: Hirecraft'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Applications'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        scrollbar: {
            enabled: false
        },
        series: [{
                name: 'Number of Applications',
                data: [250, 279, 349, 614, 529, 576, 489, 513, 327, 376, 423, 321]

            }]
    });
}

function createLocationCountChart(chartId) {
    var defaultTitle = "Overall Location Count";
    var drilldownTitle = "Location Count by ";

    var chart = new Highcharts.chart(chartId, {
        chart: {
//            height: 300,
            type: 'pie',
            events: {
                drilldown: function (e) {
                    chart.setTitle({text: drilldownTitle + e.point.name});
                    console.log("DRILL DOWN");
//                    alert("DRILL DOWN ALERT");
                },
                drillup: function (e) {
                    chart.setTitle({text: defaultTitle});
                    console.log("DRILL UP");
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
                            fill: '#C5CAE9',
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
                    enabled: true
                },
                shadow: false,
                showInLegend: true
            },
            pie: {
//                size: '80%',
            }
        },
        series: [{
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

function createRoleCountChart(chartId) {
    var defaultTitle = "Basic drilldown";
    var drilldownTitle = "More about ";

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
            spacingRight: 15,
            events: {
                drilldown: function (e) {
                    chart.setTitle({text: drilldownTitle + e.point.name});
                },
                drillup: function (e) {
                    chart.setTitle({text: defaultTitle});
                }
            }
        },
        credits: false,
        title: {
            text: defaultTitle
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
                    enabled: true,
                }
            }
        },
        series: [{
                name: 'Things',
                colorByPoint: true,
                data: [{
                        name: 'Animals',
                        y: 5,
                        drilldown: 'animals'
                    }, {
                        name: 'Fruits',
                        y: 2,
                        drilldown: 'fruits'
                    }, {
                        name: 'Cars',
                        y: 4,
                        drilldown: 'cars'
                    }]
            }],
        drilldown: {
            drillUpButton: {
                relativeTo: 'spacingBox',
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
                            fill: '#C5CAE9',
//                            stroke: 'transparent'
                        }
                    }
                }

            },
            series: [{
                    id: 'animals',
                    data: [
                        ['Cats', 4],
                        ['Dogs', 2],
                        ['Cows', 1],
                        ['Sheep', 2],
                        ['Pigs', 1]
                    ]
                }, {
                    id: 'fruits',
                    data: [
                        ['Apples', 4],
                        ['Oranges', 2]
                    ]
                }, {
                    id: 'cars',
                    data: [
                        ['Toyota', 4],
                        ['Opel', 2],
                        ['Volkswagen', 2]
                    ]
                }]
        }
    })
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
            // We'll put some code here in a minute
            $("#candidateTable").html(res);
        }
    });

}