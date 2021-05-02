import React from 'react'
import { Row, Col, Input, Button } from 'antd'


const RegistrationForm = (props) => {

  return (
    <Row className='padding-double--ends padding-double--sides'>
			<Col className='background-grey margin-double--top border-round padding--sides' md={16} lg={12} sm={24} >
        <div className='text-black f24 center margin--ends'> Register</div>
        <div className='text-black f14 margin--bottom'>Choose your preferences and get vaccine availability sent straight to your mailbox!</div>
        <div className='f10'>Email</div>
        <Input style={{width:200 }} />
        <div className='f10'>Phone Number(optional) </div>
        <Input style={{width:200 }} />
        <Button >Add District preference</Button>
      </Col>
		</Row>
  )
}

export default RegistrationForm
