import React from 'react'
import { Row } from 'antd'
import {
  Route,
  Switch
} from 'react-router-dom'

import Subscription from './subscription/index'
import NewGame from './subscription'
import PageNotFound from './common/error-pages/PageNotFound'
import Landing from './Landing'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
})

function MainRouter () {
  return (
    <Route
      render={({ location }) => (
        <Row className='overflow-auto display-block'>
            <RouteContainer key={999999}>
              <Switch location={location}>
                <Route path="/subscribe" component={Subscription} key="subscribe" />
                <Route path="/" component={Landing} key="landing" />
                <Route render={() => <PageNotFound />} key="notFound" />
              </Switch>
            </RouteContainer>
        </Row>
      )} />
  )
}

export default MainRouter
