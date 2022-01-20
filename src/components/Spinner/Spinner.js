import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const Spinner = () => (
  <div
    style={{
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 48 }} spin />
      }
    />
  </div>
)
