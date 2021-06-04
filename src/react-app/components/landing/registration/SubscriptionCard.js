import React from "react";
import PropTypes from 'prop-types'
import { Radio, Select, Row, Col, Card, Slider, Input, Tabs } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons';
import ErrorMessage from '../../common/ErrorMessage';
import Loader from "../../common/Loader";

const distanceSliderMarks = {
  5: '5',
  10: '10',
  15: '15',
  25: '25',
  50: '50'
};

const { Option } = Select;
const { TabPane } = Tabs;

const SubscriptionCard = (props) =>  {

  const {
    errors,
    subscription: {
      stateId,
      districtId,
      vaccine,
      ageGroup,
      districts,
      districtLoader,
      pincodeDistance,
      pincode,
    }
  } = props;
  return (
    <Card className='margin--bottom border-round' bodyStyle={{paddingLeft: '12px', paddingRight: '12px'}}>
      <CloseCircleFilled
        className='f18'
        style={{position: 'absolute', top: '-3%', right: '-2%', color: '#8B0000' }}
        onClick={() => props.onRemoveSubscription()}
      />
      <>
        <div className='label'> Vaccination Type: </div>
        <Radio.Group className='width-100' value={vaccine} onChange={(e) => props.onChangeSubscriptionField({'vaccine': e.target.value })}>
          <Radio.Button style={{width: '22.5%' }} className='f10 margin-half--right center' value="covaxin">Covaxin</Radio.Button>
          <Radio.Button style={{width: '22.5%' }} className='f10 margin-half--right center' value="covishield">Covishield</Radio.Button>
          <Radio.Button style={{width: '22.5%' }} className='f10 margin-half--right center' value="sputnik v">Sputnik V</Radio.Button>
          <Radio.Button style={{width: '22.5%' }} className='f10 center' value="both">All</Radio.Button>
        </Radio.Group>
        <div className='label'> Age Group: </div>
        <Radio.Group className='width-100' value={ageGroup} onChange={(e) => props.onChangeSubscriptionField({'ageGroup': e.target.value })}>
          <Radio.Button style={{width: '30.6%' }}  className='f10 margin-half--right center' value="above_18">18-45</Radio.Button>
          <Radio.Button style={{width: '30.6%' }} className='f10 margin-half--right center' value="above_45">Above-45</Radio.Button>
          <Radio.Button style={{width: '30.6%' }} className='f10 center' value="both">Both</Radio.Button>
        </Radio.Group>
      </>
      <div className='label'> Select a type of subscription: </div>
      <Tabs onChange={(value) => props.onChangeSubscriptionField({ type: value })} type="card">
        <TabPane tab="Pincode Based" key="pincode">
          <div className='padding-double--sides'>
            <div className='label'>Pincode:</div>
            <ErrorMessage message={errors.pincode} />
            <Input autoComplete='off' name='pincode' block='true' value={pincode} onChange={(e) => props.onChangeSubscriptionField({'pincode': e.target.value})} />
            <div className='label'> Distance Radius from Pincode (in Km): </div>
            <Slider
              marks={distanceSliderMarks}
              step={null}
              defaultValue={5}
              value={pincodeDistance}
              max={50}
              min={5}
              onChange={(value) => props.onChangeSubscriptionField({'pincodeDistance': value})}
            />
          </div>
        </TabPane>
        <TabPane tab="District Based" key="district">
          <div className='padding-double--sides'>
            <Row>
              <Col span={12}>
                <div className='label'> State: </div>
                <Select value={stateId} style={{ width: '90%' }} onChange={(value) => {
                  props.onChangeSubscriptionField({'stateId': value});
                  props.fetchDistricts(value);
                }}>
                  {
                    props.states.length === 0 ?
                    <Option key={-99999}> <Loader />  </Option> :
                    props.states.map((state, index) => {
                      return (
                        <Option key={index} value={state.stateId}> {state.stateName} </Option>
                      )
                    })
                  }
                </Select>
                <ErrorMessage message={errors.stateId} />
              </Col>
              <Col span={12}>
                <div className='label'> District: </div>
                <Select value={districtId} style={{ width: '90%' }} onChange={(value) => {
                  props.onChangeSubscriptionField({'districtId': value});
                }}>
                  {
                    districtLoader ?
                    <Option key={-99999}> <Loader />  </Option> :
                    districts.map((district, index) => {
                      return (
                        <Option key={index} value={district.districtId}> {district.districtName} </Option>
                      )
                    })
                  }
                </Select>
                <ErrorMessage message={errors.districtId} />
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </Card>
  );
}

SubscriptionCard.propTypes = {
  subscription: PropTypes.object.isRequired,
}

export default SubscriptionCard
