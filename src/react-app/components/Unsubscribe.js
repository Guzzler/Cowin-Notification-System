import React, { useEffect } from 'react'
import {  Row, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    unsubscribeEmail
} from '../actions/index'
import Loader from '../components/common/Loader'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'; 
import { useLocation } from 'react-router'



const Unsubscribe = () =>  {
  const dispatch = useDispatch()
  const search = useLocation().search
  useEffect(() => {
    const email = new URLSearchParams(search).get('email');
    const token = new URLSearchParams(search).get('token');
    dispatch(unsubscribeEmail(email,token))
  },[search, dispatch]);
  const unsubscribe = useSelector((state) => state.base.unsubscribe);
  const {
      isDone,
      success,
      email,
  } = unsubscribe;
  return (
    <Row className={'padding--sides width-100 height-100'}>
      <Card className='border-round padding--sides padding--ends margin--ends background-grey center' style={{width: '100%'}}>
        {
          isDone ?
          success ?
          <>
            <CheckCircleOutlined className='f72 text-green' />
            <div className='text-black center margin--top f18'>
              You have successfully unsubscribed! Your email {email} will no longer receive notifications. Redirecting to homepage...
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

export default Unsubscribe
