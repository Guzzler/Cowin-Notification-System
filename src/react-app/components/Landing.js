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
  resetRegisterForm,
} from '../actions/index'

import RegistrationStep from './landing/RegistrationStep';
import RegistrationForm from './landing/RegistrationForm';
import { isSmallDevice, landingPageSteps } from '../../common/utils'

class Landing extends React.Component {

  componentDidMount() {
    this.props.getAllStates()
  }
  render() {
    const isSmall = isSmallDevice();
    return (
      <Row className={`${isSmall ? '' : 'margin-double--left'} padding--sides width-100 height-100`}>
        <Col md={10} sm={24} push={isSmall ? 0 : 14}>
          { 
            isSmall ?
            <div>
              <div className={'text-black margin-double--top f24 center'}>Vaccine Post</div>
              <div className={'text-grey f16 center'}>A Cowin Vaccination Notifiication System</div>
            </div> :
            null
          }
          <RegistrationForm 
            onChangeRegistrationField={(changedField) => this.props.onChangeRegistrationField(changedField)}
            onChangeSubscriptionField={(changedField, index) => this.props.onChangeSubscriptionField(changedField, index)}
            onAddSubscription={() => this.props.onAddSubscription()}
            onRemoveSubscription={(index) => this.props.onRemoveSubscription(index)}
            fetchDistricts={(stateId, index) => this.props.fetchDistricts(stateId, index)}
            registration={this.props.base.registration}
            registerSubscription={() => this.props.registerSubscription(this.props.base.registration)}
            resetRegisterForm={() => this.props.resetRegisterForm()}
          />
        </Col>
        <Col md={14} sm={24} pull={isSmall ? 0 : 10}>
        { 
            !isSmall ?
            <div>
              <div className={'margin-double--top title-style'}>Vaccine Post</div>
              <div className={'margin-double--bottom subtitle-style'}>A Cowin Vaccination Notifiication System</div>
            </div> :
            null
          }
          <div className='subheader-style'>How it works?</div>
          <Row className='margin--bottom'>
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
    resetRegisterForm,
})(Landing)
