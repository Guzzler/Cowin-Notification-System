import React from 'react'
import { Col } from 'antd'


const RegistrationStep = (props) => {
  const {
    number,
    color,
    description,
    Icon,
  } = props;
  return (
    <Col className={`background-${color} text-${color} border-round padding-half--sides padding-half--ends margin--top margin-double--left`} xs={22} sm={22} md={6}>
      <div className='f48 margin--bottom'>{number}</div>
      <Icon className={`center text-${color} margin-double--bottom f108`} style={{display:'table', margin:'0 auto'}}/>
      <div className='f18 margin--ends margin--sides'>{description}</div>
    </Col>
  )
}

export default RegistrationStep
