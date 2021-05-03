import React from 'react'
import { Row, Col } from 'antd'
import Particles from 'react-particles-js';


const Loader = () => {
  return (
    <Row style={{ width: '100%' }}>
      <Col span={12} offset={6}>
      <Particles />
      </Col>
    </Row>
  )
}

export default Loader
