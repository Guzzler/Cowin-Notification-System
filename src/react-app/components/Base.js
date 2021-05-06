import React from 'react'
import { Layout } from 'antd'

import MainRouter from './MainRouter'
import PageFooter from './PageFooter';

const { Content, Footer } = Layout

function Base () {
  return (
    <Layout className='background-white'>
      <Content theme='light' style={{'minHeight': '85vh'}}>
        <MainRouter />
      </Content>
      <Footer className='margin--top center'>
        <PageFooter />
      </Footer>

    </Layout>
  )
}

export default Base
