import React, { useEffect } from 'react'
import {  Row, Col } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import {
  onChangeRegistrationField,
  onChangeSubscriptionField,
  onAddSubscription,
  onRemoveSubscription,
  getAllStates,
  fetchDistricts,
  registerSubscription,
  resetRegisterForm,
  updateRegistrationFormErrors,
} from '../actions/index'

import RegistrationStep from './landing/RegistrationStep';
import RegistrationForm from './landing/RegistrationForm';
import { isSmallDevice, landingPageSteps, validateRegistrationPayload } from '../../common/utils'

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStates())
  }, [dispatch])
  const registration = useSelector((state) => state.base.registration)
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
          onChangeRegistrationField={(changedField) => dispatch(onChangeRegistrationField(changedField))}
          onChangeSubscriptionField={(changedField, index) => dispatch(onChangeSubscriptionField(changedField, index))}
          onAddSubscription={() => dispatch(onAddSubscription())}
          onRemoveSubscription={(index) => dispatch(onRemoveSubscription(index))}
          fetchDistricts={(stateId, index) => dispatch(fetchDistricts(stateId, index))}
          registration={registration}
          registerSubscription={() => {
            const validationParams = validateRegistrationPayload(registration)
            if(validationParams.isValid) {
              dispatch(registerSubscription(registration))
            }
            else {
              dispatch(updateRegistrationFormErrors(validationParams.errors))
            }
          }}
          resetRegisterForm={() => dispatch(resetRegisterForm())}
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

export default Landing
