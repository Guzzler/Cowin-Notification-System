import React from 'react'
import { Row, Col, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'; 
import SubscriptionCard from './registration/SubscriptionCard';
import { isSmallDevice } from '../../../common/utils';


const RegistrationForm = (props) => {

  const {
    onChangeSubscriptionField,
    onChangeRegistrationField,
    onAddSubscription,
    fetchDistricts,
    onRemoveSubscription,
    registerSubscription,
    registration
  } = props;

  const {
    subscriptions,
    phoneNumber,
    email,
    states,
  } = registration;

  const isSmall = isSmallDevice();
  return (
    <Row className='padding-double--ends'>
			<Col className={`background-grey ${isSmall ? '' : 'margin-double--top'} border-round padding--sides padding--ends`} md={22} lg={18} sm={24} >
        <div className='text-black f24 center margin--ends'> Register</div>
        <div className='text-black f14 margin--bottom'>Choose your preferences and get vaccine availability sent straight to your mailbox!</div>
        <div className='f10'>Email</div>
        <Input block='true' value={email} onChange={(e) => onChangeRegistrationField({'email': e.target.value})} />
        <div className='f10'>Phone Number(optional) </div>
        <Input block='true' value={phoneNumber} onChange={(e) => onChangeRegistrationField({'phoneNumber': e.target.value})}/>
        <div className='f10'>Chosen Districts: </div>
        {
          subscriptions.map((subscription, index) => {
            return (
              <SubscriptionCard
                key={index}
                subscription={subscription}
                onChangeSubscriptionField={(changedField) => onChangeSubscriptionField(changedField, index)}
                onRemoveSubscription={() => onRemoveSubscription(index)}
                fetchDistricts={(stateId) => fetchDistricts(stateId, index)}
                states={states}
              /> 
            )
          })
        }
        { 
          subscriptions.length <= 5 ?
          <Button type="dashed" className='border-round' onClick={() => onAddSubscription()} block icon={<PlusOutlined />}> Add a district </Button> :
          null
        }
        <Button className='background-green--dark text-white margin--top border-round f12' onClick={() => registerSubscription()} block > Signup to recieve notifications </Button>

      </Col>
		</Row>
  )
}

export default RegistrationForm
