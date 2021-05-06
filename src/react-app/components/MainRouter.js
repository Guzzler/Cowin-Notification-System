import React from 'react'
import { Row } from 'antd'
import {
  Route,
  Switch
} from 'react-router-dom'

import Landing from './Landing'
import Unsubscribe from './Unsubscribe'
import VerifyEmail from './VerifyEmail'
import PrivacyPolicy from './PrivacyPolicy'


function MainRouter () {
  return (
    <Route
      render={({ location }) => (
        <Row className='height-min-100'>
          <Switch location={location}>
            <Route path="/unsubscribe" component={Unsubscribe} key="unsubscribe" />
            <Route path="/verify_email" component={VerifyEmail} key='verify_email' />
            <Route path='/privacy' component={PrivacyPolicy} key='privacy_policy'/>
            <Route path="/" component={Landing} key="landing" />
          </Switch>
        </Row>
      )} />
  )
}

export default MainRouter
