import { dataParser, timeValueFormatter } from './'
import { metricNames } from '../config'

export const chartConfig = ({
  metric,
  type,
  data,
}) => {
  const { isTime, values, categories, average } = dataParser({ data, type })

  return {
    config: {
      average,
      isTime,
    },
    chart: {
      type: type === 'time' ? 'areaspline' : 'column',
    },
    title: { text: '' },
    subtitle: { text: '' },
    legend: { enabled: false },
    series: [{
      name: metric,
      data: values,
      color: '#127EEB',
      colorByPoint: (type === 'dist'),
    }],
    xAxis: {
      categories,
      type: 'category',
    },
    yAxis: {
      title: { text: metricNames[metric].name },
      plotLines: [{
        color: '#127EEB',
        value: average,
        width: average && 1,
        zIndex: 4,
        dashStyle: 'LongDash',
      }],
      ...(isTime ? {
        type: 'time',
        labels: { formatter: timeValueFormatter },
      } : {}),
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2,
      },
      column: {
        colors: ['#FF7426', '#FFC406', '#9360E2', '#25C6CC'],
      },
      series: {
        animation: false,
        ...(
          (type === 'dist') ? {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              ...(isTime ? {
                formatter: timeValueFormatter,
              } : {}),
            },
          } : {}
        ),
      },
    },
    tooltip: {
      ...(isTime ? {
        formatter: timeValueFormatter,
      } : {}),
    },
  }
}
