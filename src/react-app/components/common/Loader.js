import React from 'react'
import { Row, Col } from 'antd'

import chessBoardLoaderImage from '../../../assets/images/chessboard-loader.gif'

const Loader = () => {
  return (
    <Row style={{ width: '100%' }}>
      <Col span={12} offset={6}>
        <img src={chessBoardLoaderImage} alt='chessboard-loader' style={{ opacity: 0.5, width: '100%' }} />
      </Col>
    </Row>
  )
}

export default Loader
