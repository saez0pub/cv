

Highcharts.chart('radar', {

    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: '',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Autonomie', 'Efficacité', 'Machine de combat', 'Paranoïa',
                'Convivialité'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 10
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}/10</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: [{
        name: 'Jean Prat',
        data: [10, 10, 10, 9, 10],
        pointPlacement: 'on'
    }]

});
