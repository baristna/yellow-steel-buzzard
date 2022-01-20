import moment from 'moment'
import { average } from '.'

export const dataParser = ({ data, type }) => {
  let isTime = false
  const values = []
  const categories = []

  if (type === 'time') {
    data[0].values.map((val) => {
      const date = moment(val.date).format('MMM DD')
      let value = (val.values[0] || 0)

      if (typeof value === 'string') {
        value = parseInt(value.replace('s', ''))
        isTime = true
      }

      categories.push(date)
      values.push(value)
    })

    return {
      values,
      categories,
      isTime,
      average: average(values),
    }
  }

  if (type === 'dist') {
    data.map((repo) => {
      let value = repo.values[0].values[0]

      if (typeof value === 'string') {
        value = parseInt(value.replace('s', ''))
        isTime = true
      }

      values.push({
        name: repo.for.repositories[0].split('/')[2],
        y: value,
      })
    })

    return {
      values,
      isTime,
      categories: null,
      average: average(values.reduce((a, c) => [...a, c.y], [])),
    }
  }
}
