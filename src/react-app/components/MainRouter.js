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
import PageNotFound from '../components/common/error-pages/PageNotFound'


function MainRouter () {
  return (
    <Route
      render={({ location }) => (
        <Row className='height-min-100'>
          <Switch location={location}>
            <Route exact path="/unsubscribe" component={Unsubscribe} key="unsubscribe" />
            <Route exact path="/verify_email" component={VerifyEmail} key='verify_email' />
            <Route exact path='/privacy' component={PrivacyPolicy} key='privacy_policy'/>
            <Route exact path="/" component={Landing} key="landing" />
            <Route render={() => <PageNotFound />} key="notFound" />
          </Switch>
        </Row>
      )} />
  )
}

export default MainRouter
