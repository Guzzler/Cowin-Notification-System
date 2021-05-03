import React from "react";
import PropTypes from 'prop-types'
import { Radio, Select, Row, Col, Card } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'; 


const { Option } = Select;

const SubscriptionCard = (props) =>  {

  const {
    stateId,
    districtId,
    vaccine,
    ageGroup,
    districts
  } = props.subscription;

  
  return (
    <Card className='margin--bottom border-round' bodyStyle={{paddingLeft: '12px', paddingRight: '12px'}}>
      <CloseCircleFilled 
        className='f18' 
        style={{position: 'absolute', top: '-3%', right: '-2%', color: '#8B0000' }} 
        onClick={() => props.onRemoveSubscription()} 
      />
      <Row>
        <Col span={12}>
          <div className='f10 text-black'> State: </div>
          <Select value={stateId} style={{ width: '90%' }} onChange={(value) => {
            props.onChangeSubscriptionField({'stateId': value});
            props.fetchDistricts(value);
          }}>
            {
              props.states.map((state, index) => {
                return (
                  <Option key={index} value={state.stateId}> {state.stateName} </Option>
                )
              })
            }
          </Select>
        </Col>
        <Col span={12}>
          <div className='f10 text-black'> District: </div>
          <Select value={districtId} style={{ width: '90%' }} onChange={(value) => {
            props.onChangeSubscriptionField({'districtId': value});
          }}>
            {
              districts.map((district, index) => {
                return (
                  <Option key={index} value={district.districtId}> {district.districtName} </Option>
                )
              })
            }
          </Select>
        </Col>
      </Row>
      <div className='f10 text-black'> Vaccination Type: </div>
      <Radio.Group className='width-100' value={vaccine} onChange={(e) => props.onChangeSubscriptionField({'vaccine': e.target.value })}>
        <Radio.Button style={{width: '30%' }} className='f10 margin-half--right center' value="covaxin">Covaxin</Radio.Button>
        <Radio.Button style={{width: '30%' }} className='f10 margin-half--right center' value="covishield">Covishield</Radio.Button>
        <Radio.Button style={{width: '30%' }} className='f10 center' value="both">Both</Radio.Button>
      </Radio.Group>
      <div className='f10 text-black'> Age Group: </div>
      <Radio.Group className='width-100' value={ageGroup} onChange={(e) => props.onChangeSubscriptionField({'ageGroup': e.target.value })}>
        <Radio.Button style={{width: '30%' }}  className='f10 margin-half--right center' value="above_18">18-45</Radio.Button>
        <Radio.Button style={{width: '30%' }} className='f10 margin-half--right center' value="above_45">Above-45</Radio.Button>
        <Radio.Button style={{width: '30%' }} className='f10 center' value="both">Both</Radio.Button>
      </Radio.Group>
    </Card>
  );
}

SubscriptionCard.propTypes = {
  subscription: PropTypes.object.isRequired,
}

export default SubscriptionCard
