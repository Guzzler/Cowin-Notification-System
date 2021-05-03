import * as ActionTypes from '../actions';
import _ from 'lodash'

const defaultSubscription = {
  districtId: '',
  stateId: '',
  vaccine: 'both',
  age_group: 'both'
}

const initialState = {
  base: {
    registration: {
      districts: [],
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
            states: action.response,
          }
        }
      } 
    }

    case ActionTypes.FETCH_DISTRICTS_SUCCESS: {


      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            districts: action.response,
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
    default: {
      return state
    }
  }
}

export default mainReducer
