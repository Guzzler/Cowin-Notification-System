import React, { useEffect } from 'react'
import {  Row, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    unsubscribeEmail
} from '../actions/index'
import Loader from '../components/common/Loader'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'; 



const Unsubscribe = () =>  {
  const dispatch = useDispatch()
  useEffect(() => {
    const search = this.props.location.search;
    const email = new URLSearchParams(search).get('email');
    const subscriptionId = new URLSearchParams(search).get('subscription_id');
    dispatch(unsubscribeEmail(email,subscriptionId))
  });
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
              You have successfully unsubscribed! Your email {email} will no longer receive notifications . 
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
