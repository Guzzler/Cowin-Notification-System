import React from 'react'
import { Col } from 'antd'
import { isSmallDevice } from '../../../common/utils';


const RegistrationStep = (props) => {
  const {
    number,
    color,
    description,
    Icon,
  } = props;

  const isSmall = isSmallDevice();
  return (
    <Col 
      className={`background-${color} text-${color} border-round padding-half--sides padding-half--ends margin--top`} 
      offset={(!isSmall && number!==1) ? 1 : 0} 
      xs={24} 
      sm={24} 
      md={6}
    >
      <div className={`margin--bottom ${isSmall ? 'f24' : 'f48'}`}>{number}</div>
      <Icon className={`center text-${color} margin-double--bottom ${isSmall ? 'f72' : 'f108'}`} style={{display:'table', margin:'0 auto'}}/>
      <div className='f16 margin--ends margin--sides'>{description}</div>
    </Col>
  )
}

export default RegistrationStep
