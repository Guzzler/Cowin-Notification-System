import React from 'react'
import { Button } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'; 


const FailedRegistration = (props) => {
  return (
		<div className='center'>
			<CloseCircleOutlined className='f72 text-red' />
			<div className=' center margin--top para-style'>
                Something went wrong and we could not process your request. Please Try again.
			</div>
			<Button block='true' className='submit-button margin--ends text-white' onClick={() => props.resetRegisterForm()}> Try again</Button>
		</div>
  )
}

export default FailedRegistration
