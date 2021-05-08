import React from 'react'
import { Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'; 


const SuccessfulRegistration = (props) => {
  return (
	<div className='center'>
		<CheckCircleOutlined className='f72 text-green' />
		<div className='para-style center margin--top '>
			You have successfully registered! We have sent a verification email. Once verified, you will receive information about any new slots that open up according to the preferences you had set. 
		</div>
		<Button block='true' className='submit-button margin--ends text-white' onClick={() => props.resetRegisterForm()}> Subscribe Again</Button>
	</div>
  )
}

export default SuccessfulRegistration
