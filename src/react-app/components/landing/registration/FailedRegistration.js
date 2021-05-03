import React from 'react'
import { Button } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'; 


const FailedRegistration = (props) => {
  return (
		<div className='center'>
			<CloseCircleOutlined className='f72 text-red' />
			<div className='text-black center margin--top f18'>
                Something went wrong and we could not process your request. Please Try again.
			</div>
			<Button block='true' className='background-green--dark margin--ends text-white' onClick={() => props.resetRegisterForm()}> Try again</Button>
		</div>
  )
}

export default FailedRegistration
