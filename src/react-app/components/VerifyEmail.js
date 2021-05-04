import React, { useEffect } from 'react'
import {  Row, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    onEmailVerify
} from '../actions/index'
import Loader from '../components/common/Loader'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'; 
import { useLocation } from 'react-router'


const VerifyEmail = () =>  {
  const dispatch = useDispatch()
  const search = useLocation().search
  useEffect(() => {
    const email = new URLSearchParams(search).get('email');
    const token = new URLSearchParams(search).get('token');
    dispatch(onEmailVerify(email, token))
  }, [search, dispatch]);
  const verifyEmail = useSelector((state) => state.base.verifyEmail);
  const {
      isDone,
      success,
      email,
  } = verifyEmail;
  return (
    <Row className={'padding--sides width-100 height-100'}>
      <Card className='border-round padding--sides padding--ends margin--ends background-grey center' style={{width: '100%'}}>
        {
          isDone ?
          success ?
          <>
            <CheckCircleOutlined className='f72 text-green' />
            <div className='text-black center margin--top f18'>
              You have successfully subscribed! Your email-{email} will now receive notifications about slot preferences as they become available. 
            </div>
          </> :
          <>
            <CloseCircleOutlined className='f72 text-red' />
            <div className='text-black center margin--top f18'>
              Something went wrong and we could not process your request. Please Try again.
            </div>
          </> :
          <Loader />
        }		
      </Card>
    </Row>
  )
}

export default VerifyEmail
