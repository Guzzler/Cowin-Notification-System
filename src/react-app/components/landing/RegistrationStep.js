import React from 'react'
import { Col } from 'antd'
import { isSmallDevice } from '../../../common/utils';
import info from '../../../assets/images/info.svg';
import notif from '../../../assets/images/notif.svg';
import data from '../../../assets/images/data.svg';


const RegistrationStep = (props) => {
  const {
    number,
    color,
    description,
    Icon,
    iconsrc,
  } = props;

  const isSmall = isSmallDevice();
  return (
    <Col 
      className={`border-round padding-half--sides padding-half--ends margin-double--top`} 
      offset={(!isSmall && number!==1) ? 1 : 0} 
      xs={24} 
      sm={24} 
      md={6}
    >
      <div className={`margin--bottom ${isSmall ? 'f24' : 'f48'} stepnum-style`}>{number}</div>
      {/* <Icon className={`center margin-double--bottom ${isSmall ? 'f72' : 'f108'}`} style={{display:'table', margin:'0 auto'}}/> */}
      <span className={`center margin-double--bottom ${isSmall ? 'f72' : 'f108'}`} style={{display:'table', margin:'0 auto'}}>
        <img src={`${(number == 1) ? info : (number == 2) ? notif : data}`} className="width-100"/>
      </span>
      <div className='para-style margin--ends margin--sides'>{description}</div>
    </Col>
  )
}

export default RegistrationStep
