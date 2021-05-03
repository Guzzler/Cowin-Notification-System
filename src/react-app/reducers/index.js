import * as ActionTypes from '../actions';
import _ from 'lodash'

const defaultSubscription = {
  districtId: '',
  stateId: '',
  vaccine: 'both',
  age_group: 'both',
  districts: [],
}

const initialState = {
  base: {
    registration: {
      states: [],
      phoneNumber: '',
      email: '',
      subscriptions:[{...defaultSubscription}]
    }
  }
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.ON_ADD_SUBSCRIPTION: {

      const subscriptions = _.cloneDeep(state.base.registration.subscriptions)
      subscriptions.push(defaultSubscription)

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
          }
        }
      } 
    }

    case ActionTypes.ON_REMOVE_SUBSCRIPTION: {

      const subscriptions = _.cloneDeep(state.base.registration.subscriptions)
      subscriptions.splice(action.index, 1);

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
          }
        }
      } 
    }

    case ActionTypes.ON_CHANGE_REGISTRATION_FIELD: {

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            ...action.changedField
          }
        }
      } 
    }

    case ActionTypes.ON_CHANGE_SUBSCRIPTION_FIELD: {

      const subscriptions = _.cloneDeep(state.base.registration.subscriptions)
      subscriptions[action.index] = {
        ...subscriptions[action.index],
        ...action.changedField
      }

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
          }
        }
      } 
    }

    case ActionTypes.GET_ALL_STATES_SUCCESS: {


      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            states: action.response.data,
          }
        }
      } 
    }

    case ActionTypes.FETCH_DISTRICTS_SUCCESS: {

      const subscriptions = _.cloneDeep(state.base.registration.subscriptions)
      subscriptions[action.index] = {
        ...subscriptions[action.index],
        districts: action.response.data 
      }


      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
          }
        }
      } 
    }

    case ActionTypes.FETCH_DISTRICTS_REQUEST: {

      const subscriptions = _.cloneDeep(state.base.registration.subscriptions)
      subscriptions[action.index] = {
        ...subscriptions[action.index],
        districts: [],
        districtId: '',
      }


      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
          }
        }
      } 
    }
    default: {
      return state
    }
  }
}

export default mainReducer
