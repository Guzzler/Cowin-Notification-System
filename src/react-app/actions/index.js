import { GET_API } from '../../common/middlewares/getAPI'
import { POST_API } from '../../common/middlewares/postAPI'

const BASE_ENDPOINT = process.env.REACT_APP_BACKEND_DOMAIN_HOST

export const ON_CHANGE_REGISTRATION_FIELD = 'ON_CHANGE_REGISTRATION_FIELD'
export const onChangeRegistrationField = (changedField) => {
  return (
    {
      type: ON_CHANGE_REGISTRATION_FIELD,
      changedField,
    }
  )
}

export const ON_CHANGE_SUBSCRIPTION_FIELD = 'ON_CHANGE_SUBSCRIPTION_FIELD'
export const onChangeSubscriptionField = (changedField, index) => {
  return (
    {
      type: ON_CHANGE_SUBSCRIPTION_FIELD,
      changedField,
      index
    }
  )
}

export const ON_ADD_SUBSCRIPTION = 'ON_ADD_SUBSCRIPTION'
export const onAddSubscription = () => {
  return (
    {
      type: ON_ADD_SUBSCRIPTION,
    }
  )
}


export const ON_REMOVE_SUBSCRIPTION = 'ON_REMOVE_SUBSCRIPTION'
export const onRemoveSubscription = (index) => {
  return (
    {
      type: ON_REMOVE_SUBSCRIPTION,
      index
    }
  )
}

export const GET_ALL_STATES_REQUEST = 'GET_ALL_STATES_REQUEST'
export const GET_ALL_STATES_SUCCESS = 'GET_ALL_STATES_SUCCESS'
export const GET_ALL_STATES_FAILURE = 'GET_ALL_STATES_FAILURE'
export const getAllStates = () => ({
  [GET_API]: {
    types: [GET_ALL_STATES_REQUEST, GET_ALL_STATES_SUCCESS, GET_ALL_STATES_FAILURE],
    endpoint: `${BASE_ENDPOINT}/dev/states`,
  }
})

export const FETCH_DISTRICTS_REQUEST = 'FETCH_DISTRICTS_REQUEST'
export const FETCH_DISTRICTS_SUCCESS = 'FETCH_DISTRICTS_SUCCESS'
export const FETCH_DISTRICTS_FAILURE = 'FETCH_DISTRICTS_FAILURE'
export const fetchDistricts = (stateId, index) => ({
  [GET_API]: {
    types: [FETCH_DISTRICTS_REQUEST, FETCH_DISTRICTS_SUCCESS, FETCH_DISTRICTS_FAILURE],
    endpoint: `${BASE_ENDPOINT}/dev/districts?state_id=${stateId}`,
    successTypeActionProps: {
      index,
    },
    requestTypeActionProps: {
      index,
    }
  }
})


export const REGISTER_SUBSCRIBE_REQUEST = 'REGISTER_SUBSCRIBE_REQUEST'
export const REGISTER_SUBSCRIBE_SUCCESS = 'REGISTER_SUBSCRIBE_SUCCESS'
export const REGISTER_SUBSCRIBE_FAILURE = 'REGISTER_SUBSCRIBE_FAILURE'
export const registerSubscription = (registration) => ({
  [POST_API]: {
    types: [REGISTER_SUBSCRIBE_REQUEST, REGISTER_SUBSCRIBE_SUCCESS, REGISTER_SUBSCRIBE_FAILURE],
    endpoint: `${BASE_ENDPOINT}/dev/subscribe`,
    payload: {
        "email": registration.email, 
        "phoneNumber": registration.phoneNumber, 
        "subscriptions": registration.subscriptions.map((subscription) =>{
          return {
            'district_id': subscription.districtId,
            'state_id': subscription.stateId,
            'vaccine': subscription.vaccine,
            'age_group': subscription.ageGroup
          }
        })
    },
    skipCsrfToken: true,
    isPayloadJson: true,
  }
})

export const UNSUBSCRIBE_EMAIL_REQUEST = 'UNSUBSCRIBE_EMAIL_REQUEST'
export const UNSUBSCRIBE_EMAIL_SUCCESS = 'UNSUBSCRIBE_EMAIL_SUCCESS'
export const UNSUBSCRIBE_EMAIL_FAILURE = 'UNSUBSCRIBE_EMAIL_FAILURE'
export const unsubscribeEmail = (email, subscriptionId) => ({
  [POST_API]: {
    types: [UNSUBSCRIBE_EMAIL_REQUEST, UNSUBSCRIBE_EMAIL_SUCCESS, UNSUBSCRIBE_EMAIL_FAILURE],
    endpoint: `${BASE_ENDPOINT}/dev/unsubscribe`,
    payload: {
        "email": email, 
        'subscription_id': subscriptionId
    },
    successTypeActionProps: {
      email,
    },
    skipCsrfToken: true,
    isPayloadJson: true,
  }
})

export const RESET_REGISTER_FORM_STATE = 'RESET_REGISTER_FORM_STATE'
export const resetRegisterForm = () => {
  return (
    {
      type: RESET_REGISTER_FORM_STATE,
    }
  )
}
