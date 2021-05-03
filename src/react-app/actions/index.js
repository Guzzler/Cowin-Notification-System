import { GET_API } from '../../common/middlewares/getAPI'
import { POST_API } from '../../common/middlewares/postAPI'

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
    endpoint: 'https://a7nn6pz85i.execute-api.ap-south-1.amazonaws.com/dev/states',
  }
})

export const FETCH_DISTRICTS_REQUEST = 'FETCH_DISTRICTS_REQUEST'
export const FETCH_DISTRICTS_SUCCESS = 'FETCH_DISTRICTS_SUCCESS'
export const FETCH_DISTRICTS_FAILURE = 'FETCH_DISTRICTS_FAILURE'
export const fetchDistricts = (stateId, index) => ({
  [GET_API]: {
    types: [FETCH_DISTRICTS_REQUEST, FETCH_DISTRICTS_SUCCESS, FETCH_DISTRICTS_FAILURE],
    endpoint: `https://a7nn6pz85i.execute-api.ap-south-1.amazonaws.com/dev/districts?state_id=${stateId}`,
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
    endpoint: `https://a7nn6pz85i.execute-api.ap-south-1.amazonaws.com/dev/subscribe`,
    payload: {
        // "email": registration.email, 
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

export const RESET_REGISTER_FORM_STATE = 'RESET_REGISTER_FORM_STATE'
export const resetRegisterForm = () => {
  return (
    {
      type: RESET_REGISTER_FORM_STATE,
    }
  )
}
