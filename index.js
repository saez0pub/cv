var colors = Highcharts.getOptions().colors,
    categories = [
        "Systèmes",
        "BDD",
        "HA/Web",
        "Virtualisation",
        "Automatisation",
        "Réseau",
        "Divers"
    ],
    data = [
        {
            "y": 100,
            "color": colors[2],
            "drilldown": {
                "name": "Systèmes",
                "categories": [
                    "Linux"
                ],
                "data": [
                    100
                ]
            }
        },
        {
            "y": 100,
            "color": colors[1],
            "drilldown": {
                "name": "BDD",
                "categories": [
                    "MySQL",
                    "Elasticsearch"
                ],
                "data": [
                    90,
                    10
                ]
            }
        },
        {
            "y": 100,
            "color": colors[0],
            "drilldown": {
                "name": "HA/Web",
                "categories": [
                    "HA-Proxy",
                    "Keepalived",
                    "Corosync"
                ],
                "data": [
                    80,
                    10,
                    10
                ]
            }
        },
        {
            "y": 100,
            "color": colors[3],
            "drilldown": {
                "name": "Virtualisation",
                "categories": [
                    "RHVM/Ovirt",
                    "libvirt",
                    "docker",
                    "vagrant"
                ],
                "data": [
                    40,
                    5,
                    40,
                    15
                ]
            }
        },
        {
            "y": 100,
            "color": colors[5],
            "drilldown": {
                "name": "Atomatisation",
                "categories": [
                    "Ansible",
                    "Puppet",
                    "Gitlab-CI",
                    "Ansible AWX"
                ],
                "data": [
                    60,
                    5,
                    15,
                    20
                ]
            }
        },
        {
            "y": 100,
            "color": colors[4],
            "drilldown": {
                "name": "Réseau",
                "categories": [
                    "Cisco ASA",
                    "Juniper",
                    "Stormhield",
                    "Cisco Catalyst",
                    "H3C",
                    "HP Procurve"
                ],
                "data": [
                    60,
                    5,
                    10,
                    10,
                    10,
                    5
                ]
            }
        },
        {
            "y": 100,
            "color": colors[6],
            "drilldown": {
                "name": 'Divers',
                "categories": [
                    "Snort",
                    "Rsyslog",
                    "Logstash",
                    "Kibana",
                    "Grafana",
                    "Telegraf"
                ],
                "data": [
                    20,
                    20,
                    20,
                    20,
                    10,
                    10
                ]
            }
        }
    ],
    domaineData = [],
    competenceData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {

    // add browser data
    domaineData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
    });

    // add version data
    drillDataLen = data[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        competenceData.push({
            name: data[i].drilldown.categories[j],
            y: data[i].drilldown.data[j],
            color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
    }
}

// Create the chart
Highcharts.chart('OAB', {
    chart: {
        
        type: 'pie'
    },
    title: {
        text: 'Repartition des compétences par domaine'
    },
    plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%']
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    series: [{
        name: 'Domaine',
        data: domaineData,
        size: '60%',
        dataLabels: {
            formatter: function () {
                return this.y > 5 ? this.point.name : null;
            },
            color: '#ffffff',
            distance: -30
        }
    }, {
        name: "Temps d'utilisation",
        data: competenceData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
            formatter: function () {
                // display only if larger than 1
                return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                    this.y + '%' : null;
            }
        },
        id: 'competences'
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 400
            },
            chartOptions: {
                series: [{
                    id: 'competences',
                    dataLabels: {
                        enabled: false
                    }
                }]
            }
        }]
    }
});
