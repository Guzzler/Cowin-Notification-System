
import { camelCaseKeys, snakeCaseKeys } from '../utils'

function handle400AndAbove (response, reject) {
  const { status, body } = response
  // any other 4xx error should send back a json response with errors
  try {
    const json = JSON.parse(body)
    reject({
      json: camelCaseKeys(json),
      status
    })
  } catch (e) {
    reject({
      json: {},
      status
    })
  }
}

function handle200To400 (response, resolve) {
  console.log(response)
  const jsonResponse = (response.status === 204) ? {} : camelCaseKeys(JSON.parse(response.body))
  resolve({
    isServerOK: true,
    ...jsonResponse
  })
}

export function postApi ({ endpoint, payload, method = 'POST', payloadAsIs, skipCsrfToken }) {
  return new Promise((resolve, reject) => {

    let modifiedPayload = payload
    if (!payloadAsIs) {
      modifiedPayload = snakeCaseKeys(payload)
    }
    const params = JSON.stringify(modifiedPayload)
   
    fetch(endpoint, { method: 'POST', body: params, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }}).then(function(response) {
      if (response.status >= 200 && response.status < 400) {
        handle200To400(response, resolve)
      } else {
        handle400AndAbove(response, reject)
      }
    });
  })
}

export const POST_API = Symbol('Post API')

export default store => next => action => {
  const postAPI = action[POST_API]
  if (typeof postAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, payload } = postAPI
  const { method = 'post', types } = postAPI
  const [requestType, successType, failureType] = types

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (typeof payload === 'function') {
    payload = payload(store.getState())
  }

  if (typeof payload !== 'object') {
    throw new Error('Specify the payload for POST request')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = { ...action, ...data }
    delete finalAction[POST_API]
    return finalAction
  }

  function handlePostApi () {
    const { payloadAsIs = false } = postAPI
    const { isPayloadJson = false } = postAPI
    const { skipCsrfToken = false } = postAPI

    return postApi({ endpoint, payload, method, payloadAsIs, isPayloadJson, skipCsrfToken }).then(
      response => {
        if (postAPI.successTypeActionProps) {
          next(actionWith({ response, ...postAPI.successTypeActionProps, type: successType }))
        } else {
          next(actionWith({ response, type: successType }))
        }

        const { onSuccess } = postAPI
        if (onSuccess) {
          if (typeof onSuccess !== 'function') {
            throw new Error('Success Callback should be a function')
          }
          onSuccess(response, store.getState(), store.dispatch)
        }
      },
      ({ status, json: response }) => {
        // stop going any further if rejection promise didn't send in status
        // this would happen only for 401s and 403s.
        if (typeof status === 'undefined') {
          return
        }

        try {
          let failureTypeActionData = {
            errors: response?.form?.errors
          }

          if (postAPI.failureTypeActionProps) {
            failureTypeActionData = { ...failureTypeActionData, ...postAPI.failureTypeActionProps }
          }

          next(actionWith({
            type: failureType,
            ...failureTypeActionData
          }))

          const { onFailure } = postAPI
          if (onFailure) {
            if (typeof onFailure !== 'function') {
              throw new Error('Failure Callback should be a function')
            }
            onFailure(response, store.getState(), store.dispatch)
          }
        } catch (e) {
          console.error(e.stack) // eslint-disable-line no-console
        }
      }
    )
  }

  let requestTypeActionData = { type: requestType }
  if (postAPI.requestTypeActionProps) {
    requestTypeActionData = { ...requestTypeActionData, ...postAPI.requestTypeActionProps }
  }
  next(actionWith(requestTypeActionData))
  return handlePostApi()
}
