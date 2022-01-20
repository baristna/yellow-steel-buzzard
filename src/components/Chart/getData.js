import { request, chartConfig, generateHash } from '../../utils'

const getData = async ({
  date_from,
  date_to,
  metric,
  type,
  force,
}) => {
  const params = {
    metrics: [metric],
    date_from,
    date_to,
    group: type === 'dist',
    granularities: [type === 'dist' ? 'all' : 'day'],
  }

  const objectHash = generateHash({
    type,
    metric,
    start: date_from,
    end: date_to,
  })

  const cachedData = sessionStorage.getItem(objectHash)

  if (!force && cachedData) {
    return chartConfig({
      metric,
      type,
      data: JSON.parse(cachedData).data,
    })
  }

  return await request.post('/', params)
    .then((response) => {
      const chartData = chartConfig({
        metric,
        type,
        data: response.data.calculated,
      })

      sessionStorage.setItem(
        objectHash,
        JSON.stringify({
          data: response.data.calculated,
          updated: Date.now(),
        })
      )
      return chartData
    })
}

export default getData
