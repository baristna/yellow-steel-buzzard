import React, { useEffect, useContext, useState, useImperativeHandle, forwardRef } from 'react'
import HighChart from 'react-highcharts'
import moment from 'moment'
import { Statistic, Card, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import getData from './getData'
import { Spinner } from '../'
import { Context } from '../../store'

export const Chart = forwardRef(({
  metric,
  type = 'time',
  kipAlign = 'left',
}, ref) => {
  const [isFetching, setIsFetching] = useState(false)
  const [state] = useContext(Context)
  const [chartData, setChartData] = useState()

  useImperativeHandle(ref, () => ({
    dataSync() {
      updateData(true)
    },
  }))

  useEffect(() => {
    updateData()
  }, [state.dateRange])

  const updateData = (force) => {
    const { start, end } = state.dateRange

    if (!(start && end)) return

    setIsFetching(true)

    getData({
      metric,
      date_from: start,
      date_to: end,
      type,
      force,
    })
      .then((response) => {
        setIsFetching(false)
        setChartData(response)
      })
  }

  if (isFetching) return <Spinner />

  return (
    chartData ? (
      <div style={{ textAlign: kipAlign }}>
        <Card style={{ marginTop: '16px' }}>
          <HighChart
            config={chartData}
          />
        </Card>
        <Card
          style={{
            marginTop: '16px',
            display: 'inline-block',
          }}
        >
          <Statistic
            style={{ minWidth: '100px' }}
            title={type === 'time' ? (
              <>
                <Tooltip title='
                  Average number of the values between the time range
                '
                >
                  <InfoCircleOutlined style={{ marginRight: '4px' }} />
                </Tooltip>
                Average
              </>
            ) : (
              <>
                Avg. Repo
                <Tooltip title='
                  Average number of the values between the time range per repo
                '
                >
                  <InfoCircleOutlined style={{ marginLeft: '4px' }} />
                </Tooltip>
              </>
            )}
            value={
              chartData.config.isTime ? (
                moment.duration(
                  parseInt(chartData.config.average)
                ).format('HH:mm:ss')
              ) : (
                chartData.config.average.toFixed(2)
              )
            }
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </div>
    ) : null
  )
})
