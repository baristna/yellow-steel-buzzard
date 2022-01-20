import React, { useState, useMemo, useEffect, useRef, useContext } from 'react'
import moment from 'moment'
import { Tabs as AntTabs, Select, Row, Col, Button, Tooltip, Empty } from 'antd'
import { SyncOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useNavigation } from '../../hooks'
import { SyncBar, TabHead, Title } from './Tabs.styled'
import { Context } from '../../store'
import { Chart, DatePicker } from '../'
import { generateHash } from '../../utils'
import { env, metricNames } from '../../config'

const { TabPane } = AntTabs
const { Option } = Select

export const Tabs = () => {
  const { search, setParams } = useNavigation()
  const [state] = useContext(Context)

  const [lastSync, setLastSync] = useState()
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [activeTab, setActiveTab] = useState()

  const chartLeft = useRef()
  const chartRight = useRef()

  useEffect(() => {
    let targetMetrics = []

    if (search.m) {
      if (!Array.isArray(search.m)) {
        targetMetrics.push(search.m)
      } else {
        targetMetrics = search.m
      }
    }

    targetMetrics = targetMetrics.filter(
      (m) => env.availableMetrics.split(' ').includes(m)
    )

    setSelectedMetrics(targetMetrics)
    setActiveTab(targetMetrics[0])
  }, [])

  useEffect(() => {
    const chartId = generateHash({
      type: 'time',
      metric: activeTab,
      start: state.dateRange.start,
      end: state.dateRange.end,
    })

    setLastSync(
      JSON.parse(sessionStorage.getItem(chartId))?.updated || Date.now()
    )
  }, [activeTab])

  const onNewMetric = (metricName) => {
    setSelectedMetrics([
      ...selectedMetrics,
      metricName,
    ])

    setParams('ADD', { m: [metricName] })
  }

  const tabBarExtraContent = useMemo(() => ({
    left: (
      <Select
        value='Add'
        style={{ width: 150 }}
        size='large'
        onChange={onNewMetric}
      >
        {env.availableMetrics
          .split(' ')
          .map((metric) => (
            <Option
              key={metric}
              value={metric}
              disabled={selectedMetrics.find(
                (selected) => selected === metric
              )}
            >
              {metric}
            </Option>
          ))
        }
      </Select>
    ),
    right: <DatePicker />,
  }), [selectedMetrics])

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      setSelectedMetrics(
        selectedMetrics.filter((metric) => metric !== targetKey)
      )

      setParams('REMOVE', { m: [targetKey] })
    }
  }

  const forceUpdate = () => {
    chartLeft.current.dataSync()
    chartRight.current.dataSync()
    setLastSync(Date.now())
  }

  return (
    <>
      <AntTabs
        type='editable-card'
        onChange={setActiveTab}
        activeKey={activeTab}
        onEdit={onEdit}
        tabBarExtraContent={tabBarExtraContent}
        hideAdd
        destroyInactiveTabPane
      >
        {selectedMetrics.map((metric) => (
          <TabPane tab={metric} key={metric}>
            <TabHead>
              <Title>{metricNames[metric].name}</Title>
              <Tooltip title={metricNames[metric].description}>
                <InfoCircleOutlined
                  style={{ marginLeft: '8px', color: '#999999' }}
                />
              </Tooltip>
              <SyncBar>
                <Tooltip title='
                  The chart data is stored in a cache memmory.
                  To get latest you can sync manually.
                '
                >
                  <InfoCircleOutlined
                    style={{ marginRight: '8px', color: '#999999' }}
                  />
                </Tooltip>
                Last sync {moment.duration(Date.now() - lastSync).humanize()} ago
                <Button
                  style={{ marginLeft: '8px' }}
                  onClick={forceUpdate}
                  type='primary'
                  icon={<SyncOutlined />}
                >
                  Sync Now
                </Button>
              </SyncBar>
            </TabHead>

            <Row gutter={16} style={{ marginTop: '16px' }}>
              <Col span={12}>
                <strong>{metricNames[metric].name}</strong> over time.
                <Chart metric={metric} kipAlign='right' ref={chartLeft} />
              </Col>
              <Col span={12}>
                Distrubution of <strong>{metricNames[metric].name}</strong> over repos.
                <Chart metric={metric} type='dist' ref={chartRight} />
              </Col>
            </Row>
          </TabPane>
        ))}
      </AntTabs>
      {!selectedMetrics.length && (
        <div style={{ marginTop: '128px' }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>
                No metric selected<br />
                To continue select a metric to add
              </span>
            }
          >
            {tabBarExtraContent.left}
          </Empty>
        </div>
      )}
    </>
  )
}
