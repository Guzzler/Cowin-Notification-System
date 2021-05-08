import React from 'react'
import { Layout, Affix } from 'antd'

import MainRouter from './MainRouter'
import PageFooter from './PageFooter';
import  { isSmallDevice } from '../../common/utils';

const isSmall = isSmallDevice();

const { Content, Footer } = Layout

function Base () {
  return (
    <Layout>
      <Content theme='light' style={{'minHeight': '90vh'}} className="background-white">
        <MainRouter />
      </Content>
      <Footer className={isSmall ?  'center mobile-footer' : 'background-white web-footer'}>
        <PageFooter />
      </Footer>
    </Layout>
  )
}

export default Base
