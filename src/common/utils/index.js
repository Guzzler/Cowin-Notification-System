import { window } from "window-or-global";
import { PicLeftOutlined, MailOutlined, ExceptionOutlined} from '@ant-design/icons'; 
import _ from 'lodash'


export const camelCaseKeys = (data) => {
  if (Array.isArray(data)) {
    return camelCaseKeysInArray(data)
  }

  const nestedCamelCasedData = Object.keys(data).reduce((config, datum) => {
    if (Array.isArray(data[datum])) {
      config[datum] = camelCaseKeysInArray(data[datum])
    } else {
      config[datum] = camelCaseKeysInObject(data[datum])
    }

    return config
  }, {})

  return camelCaseKeysInObject(nestedCamelCasedData)
}

const camelCaseKeysInArray = (arr) => {
  return arr.map(elem => camelCaseKeysInObject(elem))
}

const camelCaseKeysInObject = (obj) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCasedKey = camelCaseString(key)
      if (camelCasedKey !== key) {
        obj[camelCasedKey] = obj[key]
        delete obj[key]
      }

      if (typeof obj[camelCasedKey] === 'object') {
        if (Array.isArray(obj[camelCasedKey])) {
          obj[camelCasedKey] = camelCaseKeysInArray(obj[camelCasedKey])
        } else {
          obj[camelCasedKey] = camelCaseKeysInObject(obj[camelCasedKey])
        }
      }
    }
  }

  return obj
}
const toUpperCaseStringForCamel = (match, group) => {
  if (Number(group) >= 0 || Number(group) <= 9) {
    return `_${group}`
  }
  return group.toUpperCase()
}

const camelCaseString = (str) => str.replace(/_(.)/g, toUpperCaseStringForCamel)

export function snakeCaseKeys (data) {
  if (Array.isArray(data)) {
    throw Error('snakeCaseKeys doesn\'t support arrays for now')
  }

  return Object.keys(data).reduce((snakeCased, datum) => {
    const snakedCasedKey = datum.replace(/([A-Z])/g, ($1) => {
      return '_' + $1.toLowerCase()
    })
    snakeCased[snakedCasedKey] = data[datum]
    return snakeCased
  }, {})
}

export function getCookie (name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

export const isSmallDevice = () => {
  return window.innerWidth < 576
}

export const landingPageSteps = [
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

// Return true if email is in correct format, returns false if email is invalid
const validateEmail = (email)  => {
  // From: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Return true if phone is in correct format returns false if phone is invalid
const validatePhone = (phone)  => {
  // From: https://stackoverflow.com/questions/18351553/regular-expression-validation-for-indian-phone-number-and-mobile-number
  // eslint-disable-next-line no-useless-escape
  const re = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
  return re.test(String(phone));
}

export const SUBSCRIPTION_ERROR_OBJECT = {
  stateId: '',
  districtId: '',
  ageGroup: '',
  vaccine: '',
}

export const validateRegistrationPayload = (registration) => {
  let isValid = true;
  const errors= {}
  if (registration.phoneNumber && !validatePhone(registration.phoneNumber)) {
    isValid = false
    errors.phoneNumber = 'Please enter a valid phone number'
  }
  if (!registration.email) {
    isValid = false
    errors.email= 'Please enter an email address'
  }
  if (!validateEmail(registration.email)) {
    isValid = false
    if (!errors.email) {
      errors.email = 'Please enter a valid email address'
    }
  }

  if (registration.subscriptions.length === 0) {
    isValid = false
    errors.chosenDistricts = 'Please add atleast one district'
  }

  errors.subscriptions = []
  registration.subscriptions.forEach((subscription, index) => {
    errors.subscriptions.push(_.cloneDeep(SUBSCRIPTION_ERROR_OBJECT))
    if(!subscription.stateId) {
      isValid = false
      errors.subscriptions[index]['stateId'] = 'Please select a state'
    }

    if(!subscription.districtId) {
      isValid = false
      errors.subscriptions[index]['districtId'] = 'Please select a district'
    }
  })

 return {
   isValid,
   errors,
 }
};