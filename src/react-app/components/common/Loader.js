import React from 'react'
import { Spin, Space } from 'antd';


const Loader = () => {
  return (
    <Space size="middle" className='center'>
      <Spin size="large" />
    </Space>
  )
}

export default Loader
