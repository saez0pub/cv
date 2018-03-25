var colors = Highcharts.getOptions().colors,
    OABcategories = [
        "Systèmes",
        "BDD",
        "HA/Web",
        "Virtualisation",
        "Automatisation",
        "Réseau",
        "Divers"
    ],
    OABdata = [
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
                    "Corosync",
                    "Apache",
                    "Tomcat",
                ],
                "data": [
                    20,
                    5,
                    5,
                    40,
                    30,
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
    OABdataLen = OABdata.length,
    drillDataLen,
    brightness;


// Build the data arrays
for (i = 0; i < OABdataLen; i += 1) {

    domaineData.push({
        name: OABcategories[i],
        y: OABdata[i].y,
        color: OABdata[i].color
    });

    // add version data
    drillDataLen = OABdata[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        competenceData.push({
            name: OABdata[i].drilldown.categories[j],
            y: OABdata[i].drilldown.data[j],
            color: Highcharts.Color(OABdata[i].color).brighten(brightness).get()
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

// Cheops
var colors = Highcharts.getOptions().colors,
    CHEOPScategories = [
        "Systèmes",
        "BDD",
        "HA/Web",
        "ERP",
        "Supervision",
        "Virtualisation",
        "Réseau",
        "Sauvegarde",
        "Divers"
    ],
    CHEOPSdata = [
        {
            "y": 100,
            "color": colors[2],
            "drilldown": {
                "name": "Systèmes",
                "categories": [
                    "HP/UX",
                    "Linux"
                ],
                "data": [
                    50,
                    50
                ]
            }
        },
        {
            "y": 100,
            "color": colors[1],
            "drilldown": {
                "name": "BDD",
                "categories": [
                    "Oracle",
                    "MySQL",
                    "Elasticsearch"
                ],
                "data": [
                    40,
                    50,
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
                    "Citrix Netscaler",
                    "Redhat cluster suite",
                    "Apache"
                ],
                "data": [
                    30,
                    20,
                    50
                ]
            }
        },
        {
            "y": 100,
            "color": colors[0],
            "drilldown": {
                "name": "ERP",
                "categories": [
                    "SAP ECC6/ECC5/47/46/40B",
                    "SAP BW 7.0",
                ],
                "data": [
                    95,
                    5
                ]
            }
        },
        {
            "y": 100,
            "color": colors[3],
            "drilldown": {
                "name": "Supervision",
                "categories": [
                    "Nagios",
                    "Thruk",
                    "Cacti",
                    "PNP4Nagios",
                    "Icinga",
                    "Gearmand",
                    "HPSIM",
                    "SNMP"
                ],
                "data": [
                    65,
                    5,
                    5,
                    3,
                    2,
                    5,
                    5,
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
                    "VMware Vsphere",
                    "HyperV"
                ],
                "data": [
                    95,
                    5,
                ]
            }
        },
        {
            "y": 100,
            "color": colors[5],
            "drilldown": {
                "name": "Sauvegarde",
                "categories": [
                    "Dataprotector",
                    "Symantec Backup Exec",
                    "TINA"
                ],
                "data": [
                    90,
                    5,
                    5
                ]
            }
        },
        {
            "y": 100,
            "color": colors[4],
            "drilldown": {
                "name": "Réseau",
                "categories": [
                    "Fortinet",
                    "NetAsq",
                    "Cisco PIX",
                    "H3C",
                    "HP Procurve",
                    "HP IMC"
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
                    "GLPI",
                    "OCS Inventory",
                    "mediawiki",
                    "Rsyslog",
                    "Logstash",
                    "Kibana"
                ],
                "data": [
                    55,
                    10,
                    20,
                    5,
                    5,
                    5
                ]
            }
        }
    ],
    domaineData = [],
    competenceData = [],
    i,
    j,
    CHEOPSdataLen = CHEOPSdata.length,
    drillDataLen,
    brightness;


// Build the data arrays
for (i = 0; i < CHEOPSdataLen; i += 1) {

    domaineData.push({
        name: CHEOPScategories[i],
        y: CHEOPSdata[i].y,
        color: CHEOPSdata[i].color
    });

    // add version data
    drillDataLen = CHEOPSdata[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        competenceData.push({
            name: CHEOPSdata[i].drilldown.categories[j],
            y: CHEOPSdata[i].drilldown.data[j],
            color: Highcharts.Color(CHEOPSdata[i].color).brighten(brightness).get()
        });
    }
}

// Create the chart
Highcharts.chart('CHEOPS', {
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
var colors = Highcharts.getOptions().colors,
    AREXIAcategories = [
        "Systèmes",
        "BDD",
        "ERP",
        "Sauvegarde"
    ],
    AREXIAdata = [
        {
            "y": 100,
            "color": colors[2],
            "drilldown": {
                "name": "Systèmes",
                "categories": [
                    "HP/UX",
                    "Linux",
                    "FreeBSD"
                ],
                "data": [
                    90,
                    5,
                    5
                ]
            }
        },
        {
            "y": 100,
            "color": colors[1],
            "drilldown": {
                "name": "BDD",
                "categories": [
                    "Oracle",
                    "MySQL"
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
                "name": "ERP",
                "categories": [
                    "SAP 47/46/40B",
                    "SAP BW 7.0"
                ],
                "data": [
                    80,
                    10,
                ]
            }
        },
        {
            "y": 100,
            "color": colors[3],
            "drilldown": {
                "name": "Sauvegarde",
                "categories": [
                    "Dataprotector",
                    "fbackup"
                ],
                "data": [
                    90,
                    10
                ]
            }
        }
    ],
    domaineData = [],
    competenceData = [],
    i,
    j,
    AREXIAdataLen = AREXIAdata.length,
    drillDataLen,
    brightness;


// Build the data arrays
for (i = 0; i < AREXIAdataLen; i += 1) {

    domaineData.push({
        name: AREXIAcategories[i],
        y: AREXIAdata[i].y,
        color: AREXIAdata[i].color
    });

    // add version data
    drillDataLen = AREXIAdata[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        competenceData.push({
            name: AREXIAdata[i].drilldown.categories[j],
            y: AREXIAdata[i].drilldown.data[j],
            color: Highcharts.Color(AREXIAdata[i].color).brighten(brightness).get()
        });
    }
}

// Create the chart
Highcharts.chart('AREXIA', {
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
