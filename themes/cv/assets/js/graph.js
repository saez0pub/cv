"use strict";

{{ $site_data_with_target_language := index .Site.Data .Site.Language.Lang -}}
{{- $homepage_data := $site_data_with_target_language.homepage -}}
{{- with $homepage_data.radar -}}
{{- $seriesName := slice -}}
{{- $seriesValue := slice -}}
{{- range $i, $v := . -}}
{{- $seriesName = $seriesName | append $v.name -}}
{{- $seriesValue = $seriesValue | append $v.value -}}
{{- end -}}

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
      categories: {{ $seriesName | jsonify }},
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
      name: '{{ with site.Params.author }}{{ . }}{{ end }}',
      data:  {{ $seriesValue | jsonify }},
      pointPlacement: 'on'
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal'
        },
        pane: {
          size: '70%'
        }
      }
    }]
  }
});
{{ end }}


{{- with $homepage_data.experience -}}
let container;
let categories;
let data;
{{- range . -}}
{{- if .graph -}}
{{- $series := slice -}}
{{- range .graph -}}
  {{- $data := slice -}}
  {{- range .data -}}
    {{- $data = $data | append (dict "name" .subcategory "value" .value) -}}
  {{- end -}}
  {{- $serie := dict "name" .category "data" $data -}}
  {{- $series = $series | append $serie -}}
{{- end }}
container="graph{{ anchorize .when }}";
Highcharts.chart(container, {
  chart: {
    type: 'packedbubble'
  },
  title: {
    text: '{{ site.Params.graphtitle }}'
  },
  tooltip: {
    useHTML: true,
    pointFormat: '<b>{point.name}:</b>'
  },
  plotOptions: {
    packedbubble: {
      minSize: '40px',
      maxSize: '300px',
      zMin: 0,
      zMax: 1000,
      Draggable: true,
      layoutAlgorithm: {
        enableSimulation: false,
        splitSeries: false,
        gravitationalConstant: 0.001
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        style: {
          color: 'black',
          textOutline: 'none',
          fontWeight: 'normal'
        }
      }
    }
  },
  series: {{ $series | jsonify }}
});
{{- end -}}
{{- end -}}
{{- end -}}