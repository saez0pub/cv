"use strict";

{{- with .Site.Data.radar }}
{{- $seriesName := slice -}}
{{- $seriesValue := slice }}
{{ range $i, $v := . -}}
  {{ $name := i18n $v.name}}
  {{- $seriesName = $seriesName | append $name -}}
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


{{ with .Site.Data.skills }}

let container;

{{- range $i, $v := . -}}
{{- $series := slice -}} 
{{- if $v.graph }}
  {{ range $v.graph }}
    {{- $data := slice }}
    {{- range .data -}}
      {{- $data = $data | append (dict "name" .subcategory "value" .value) -}}
    {{- end -}}
    {{ $categoryName :=  i18n (lower .category) | humanize }}
    {{- $serie := dict "name" $categoryName "data" $data -}}
    {{- $series = $series | append $serie -}}
    {{ end }}
container="graph{{ $i }}";
Highcharts.chart(container, {
  chart: {
    type: 'packedbubble'
    {{ if $v.height }},height: "{{ $v.height }}"{{ end }}
  },
  title: {
    text: '<div class="bg-light border-bottom p-2 font-weight-bold text-secondary">{{ i18n "skills" }}</div>'
  },
  tooltip: {
    useHTML: true,
    pointFormat: '<b>{point.name}</b>'
  },
  plotOptions: {
    packedbubble: {
      minSize: '45%',
      maxSize: '300%',
      zMin: 0,
      zMax: 1000,
      Draggable: true,
      layoutAlgorithm: {
        splitSeries: false,
        gravitationalConstant: 0.02,
      },
      dataLabels: {
        enabled: true,
        format: '<div class="text-center text-wrap">{point.name}</div>',
        style: {
          color: 'black',
          textOutline: 'none',
          fontWeight: 'normal'
        },
        useHTML: true
      }
    }
  },
  series: {{ $series | jsonify }}
});
  {{- end -}}
{{- end -}}
{{- end -}}