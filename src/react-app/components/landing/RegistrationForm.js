import React from 'react'
import { Row, Col, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'; 
import SubscriptionCard from './registration/SubscriptionCard';
import { fetch } from 'window-or-global';


const RegistrationForm = (props) => {

  const {
    onChangeSubscriptionField,
    onChangeRegistrationField,
    onAddSubscription,
    fetchDistricts,
    onRemoveSubscription,
    registration
  } = props;

  const {
    subscriptions,
    phoneNumber,
    email,
    districts,
    states,
  } = registration;
  return (
    <Row className='padding-double--ends padding-double--sides'>
			<Col className='background-grey margin-double--top border-round padding--sides padding--ends' md={18} lg={12} sm={24} >
        <div className='text-black f24 center margin--ends'> Register</div>
        <div className='text-black f14 margin--bottom'>Choose your preferences and get vaccine availability sent straight to your mailbox!</div>
        <div className='f10'>Email</div>
        <Input style={{width:200 }} value={email} onChange={(e) => onChangeRegistrationField({'email': e.target.value})} />
        <div className='f10'>Phone Number(optional) </div>
        <Input style={{width:200 }} value={phoneNumber} onChange={(e) => onChangeRegistrationField({'phoneNumber': e.target.value})}/>
        <div className='f10'>Chosen Districts: </div>
        {
          subscriptions.map((subscription, index) => {
            return (
              <SubscriptionCard
                key={index}
                subscription={subscription}
                onChangeSubscriptionField={(changedField) => onChangeSubscriptionField(changedField, index)}
                onRemoveSubscription={(index) => onRemoveSubscription(index)}
                fetchDistricts={(stateId) => fetchDistricts(stateId)}
                states={states}
                districts={districts}
              /> 
            )
          })
        }
        <Button type="dashed" onClick={() => onAddSubscription()} block icon={<PlusOutlined />}> Add a district </Button>
      </Col>
		</Row>
  )
}

export default RegistrationForm
