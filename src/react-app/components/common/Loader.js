import React from 'react'
import { Spin, Space } from 'antd';


const Loader = () => {
  return (
    <div className='center'>
      <Space size="middle" className='center'>
        <Spin size="large" />
      </Space>
    </div>
  )
}

export default Loader
