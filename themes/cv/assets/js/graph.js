"use strict";

{{- $seriesNames := dict -}}
{{- $seriesValues := dict -}}
{{ range $lang, $site_data := .Site.Data }}
  {{- $homepage_data := $site_data.homepage -}}
  {{- $seriesName := slice -}}
  {{- $seriesValue := slice }}
  {{ range $i, $v := $homepage_data.radar -}}
    {{- $seriesName = $seriesName | append $v.name -}}
    {{- $seriesValue = $seriesValue | append $v.value -}}
  {{- end -}}
  {{- $seriesNames = merge $seriesNames (dict $lang $seriesName) -}}
  {{- $seriesValues = merge $seriesValues (dict $lang $seriesValue) -}}
{{- end }}
const seriesNames={{ $seriesNames | jsonify }};
const seriesValues={{ $seriesValues | jsonify }};

{{- $site_data_with_target_language := index .Site.Data .Site.Language.Lang -}}
{{-  $homepage_data := $site_data_with_target_language.homepage -}}
{{- with $homepage_data.radar }}
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
      categories: seriesNames[curentLanguage],
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
      data:  seriesValues[curentLanguage],
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

let series;
{{- $datas := dict -}}
{{- $categories := slice -}}
{{ range $lang, $site_data := .Site.Data }}
  {{- $experience_data := $site_data.homepage.experience }}
  {{- $series := slice -}}
  {{- range $i, $v := $experience_data -}}
    {{- $series := slice -}} 
    {{- if $v.graph }}
      {{ range $v.graph }}
        {{- $data := slice }}
        {{- range .data -}}
          {{- $data = $data | append (dict "name" .subcategory "value" .value) -}}
        {{- end -}}
        {{- $serie := dict "name" .category "data" $data -}}
        {{- $series = $series | append $serie -}}
      {{ end }}
    {{- end }}
    {{- $categories = $categories | append (slice $series) -}}
  {{- end }}
  {{- $datas = merge $datas (dict $lang $categories) -}}
{{- end }}

series={{ $datas | jsonify }};

{{ with $homepage_data.experience }}
let container;

{{- range $i, $v := . -}}
container="graph{{ $i }}";
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
  series: series[curentLanguage][{{ $i }}]
});
{{- end -}}
{{- end -}}