import * as ActionTypes from '../actions';
import _ from 'lodash'
import { SUBSCRIPTION_ERROR_OBJECT } from '../../common/utils'

const defaultSubscription = {
  districtId: '',
  stateId: '',
  vaccine: 'both',
  ageGroup: 'both',
  districts: [],
  districtLoader: false,
}

const defaultErrorObject = {
  phoneNumber: '',
  email: '',
  subscriptions: [{SUBSCRIPTION_ERROR_OBJECT}]
}

const initialState = {
  base: {
    registration: {
      hasRegistered: false,
      regFailure: false,
      isLoading: false,
      states: [],
      phoneNumber: '',
      email: '',
      subscriptions:[{..._.cloneDeep(defaultSubscription)}],
      errors: _.cloneDeep(defaultErrorObject),
    },
    unsubscribe: {
      isDone: false,
      success: false,
      email: '',
    }
  }
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.ON_ADD_SUBSCRIPTION: {

      const subscriptions = _.cloneDeep(state.base.registration.subscriptions)
      subscriptions.push(defaultSubscription)

      const errors = _.cloneDeep(state.base.registration.errors)
      errors.subscriptions.push(defaultErrorObject)

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
            errors,
          }
        }
      } 
    }

    case ActionTypes.ON_REMOVE_SUBSCRIPTION: {

      const subscriptions = _.cloneDeep(state.base.registration.subscriptions)
      subscriptions.splice(action.index, 1);

      const errors = _.cloneDeep(state.base.registration.errors)
      errors.subscriptions.splice(action.index, 1);

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
            errors,
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
            ...action.changedField,
            errors: _.cloneDeep(defaultErrorObject),
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

      const errors = _.cloneDeep(state.base.registration.errors)
      errors.subscriptions[action.index] = defaultErrorObject

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            subscriptions,
            errors,
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
        districts: action.response.data,
        districtLoader: false,
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
        districtLoader: true,
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

    case ActionTypes.REGISTER_SUBSCRIBE_SUCCESS: {

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            hasRegistered: true,
            isLoading: false,
          }
        }
      } 
    }

    case ActionTypes.REGISTER_SUBSCRIBE_REQUEST: {

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            isLoading: true,
          }
        }
      } 
    }

    case ActionTypes.REGISTER_SUBSCRIBE_FAILURE: {

      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            hasRegistered: false,
            regFailure: true,
            isLoading: false,
          }
        }
      } 
    }


    case ActionTypes.UNSUBSCRIBE_EMAIL_FAILURE: {

      return {
        ...state,
        base: {
          ...state.base,
          unsubscribe: {
            isDone: true,
            success: false,
          }
        }
      } 
    }

    case ActionTypes.UNSUBSCRIBE_EMAIL_SUCCESS: {

      return {
        ...state,
        base: {
          ...state.base,
          unsubscribe: {
            isDone: true,
            success: true,
            email: action.email,
          }
        }
      } 
    }

    case ActionTypes.RESET_REGISTER_FORM_STATE: {
      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...initialState.base.registration,
            states: state.base.registration.states,
          }
        }
      } 
    }

    case ActionTypes.UPDATE_REGISTRATION_FORM_ERRORS :{
      return {
        ...state,
        base: {
          ...state.base,
          registration: {
            ...state.base.registration,
            errors: action.errors,
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
