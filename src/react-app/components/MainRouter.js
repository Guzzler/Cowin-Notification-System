import React from 'react'
import { Row } from 'antd'
import {
  Route,
  Switch
} from 'react-router-dom'

import PageNotFound from './common/error-pages/PageNotFound'
import Landing from './Landing'
import Unsubscribe from './Unsubscribe'
import VerifyEmail from './VerifyEmail'


function MainRouter () {
  return (
    <Route
      render={({ location }) => (
        <Row className='overflow-auto display-block' style={{height: '100vh'}}>
          <Switch location={location}>
            <Route path="/unsubscribe" component={Unsubscribe} key="unsubscribe" />
            <Route path="/verify_email" component={VerifyEmail} key='verify_email' />
            <Route path="/" component={Landing} key="landing" />
            <Route render={() => <PageNotFound />} key="notFound" />
          </Switch>
        </Row>
      )} />
  )
}

export default MainRouter
