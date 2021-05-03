import React from 'react'
import {  Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  onChangeRegistrationField,
  onChangeSubscriptionField,
  onAddSubscription,
  onRemoveSubscription,
  getAllStates,
  fetchDistricts,
  registerSubscription,
} from '../actions/index'

import { PicLeftOutlined, MailOutlined, ExceptionOutlined } from '@ant-design/icons'; 
import RegistrationStep from './landing/RegistrationStep';
import RegistrationForm from './landing/RegistrationForm';

const landingPageSteps = [
  {
    color: 'peach',
    number: 1,
    description: 'Enter your email and phone details along with a list of each district you would like to get updates for',
    Icon: PicLeftOutlined
  },
  {
    color: 'green',
    number: 2,
    description: 'Check and verify your email to activate your subscription',
    Icon: MailOutlined
  },
  {
    color: 'blue',
    number: 3,
    description: 'Receive notifications as soon as vaccine slots are updated!',
    Icon: ExceptionOutlined
  }
]



class Landing extends React.Component {

  componentDidMount() {
    this.props.getAllStates()
  }
  render() {
  
    return (
      <Row className='padding--sides width-100 height-100'>
        <Col md={14} sm={24}>
          <div className='text-black margin-double--left margin-double--top f36'>Cowin Notification System</div>
          <div className='text-grey margin-double--left margin-double--bottom f18'> Making India great one vaccine at a time!</div>
          <div className='text-black margin-double--left f18'>How it works?</div>
          <Row>
          {
            landingPageSteps.map((step, index) => {
              return (
                <RegistrationStep
                  key={index} 
                  {...step}
                />
              )
            })
          }
          </Row>
        </Col>
        <Col md={10} sm={24}>
          <RegistrationForm 
            onChangeRegistrationField={(changedField) => this.props.onChangeRegistrationField(changedField)}
            onChangeSubscriptionField={(changedField, index) => this.props.onChangeSubscriptionField(changedField, index)}
            onAddSubscription={() => this.props.onAddSubscription()}
            onRemoveSubscription={(index) => this.props.onRemoveSubscription()}
            fetchDistricts={(stateId) => this.props.fetchDistricts(stateId)}
            registration={this.props.base.registration}
          />
        </Col>
      </Row>
    )
  }
}

Landing.propTypes = {
  base: PropTypes.object.isRequired,
}

const mapStateToProps = ({ base }) => {
  return {
    base
  }
}

export default connect(
  mapStateToProps, {
    onChangeSubscriptionField,
    onChangeRegistrationField,
    onAddSubscription,
    onRemoveSubscription,
    getAllStates,
    fetchDistricts,
    registerSubscription,
})(Landing)
