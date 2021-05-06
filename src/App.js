import './App.css'

import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Base from './react-app/components/Base'
import PageNotFound from './react-app/components/common/error-pages/PageNotFound'


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" component={Base} key='base'/>
        <Route render={() => <PageNotFound />} key="notFound" />
      </Switch>
    </div>
  </Router>
)

export default App
