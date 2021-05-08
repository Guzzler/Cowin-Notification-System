import React from 'react'
import { Spin, Space } from 'antd';


const Loader = (props) => {
  return (
    <div className='center' style={props.style || {}}>
      <Space size="middle" className='center'>
        <Spin size="large" />
      </Space>
    </div>
  )
}

export default Loader
