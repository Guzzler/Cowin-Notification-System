import React from 'react'
import {  Row, Card } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    unsubscribeEmail
} from '../actions/index'
import Loader from '../components/common/Loader'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'; 



class Unsubscribe extends React.Component {

  componentDidMount() {
    const search = this.props.location.search;
    const email = new URLSearchParams(search).get('email');
    const subscriptionId = new URLSearchParams(search).get('subscription_id');
    this.props.unsubscribeEmail(email,subscriptionId)
  }
  render() {
    const {
        isDone,
        success,
        email,
    } = this.props.base.unsubscribe;
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
}

Unsubscribe.propTypes = {
  base: PropTypes.object.isRequired,
}

const mapStateToProps = ({ base }) => {
  return {
    base
  }
}

export default connect(
  mapStateToProps, {
    unsubscribeEmail,
})(Unsubscribe)
