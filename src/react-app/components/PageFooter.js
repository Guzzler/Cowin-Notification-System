import React from 'react'
import { Link } from 'react-router-dom'
import { HeartFilled } from '@ant-design/icons'; 

const PageFooter = () => {
  return (
    <div>
    <div >Made with <HeartFilled /></div>
    <div>
        By - 
        <a href='https://github.com/abizerlokhandwala'> Abizer Lokhandwala</a>,
        <a href='https://github.com/shloksingh10'> Shlok Singh</a>,
        <a href='https://github.com/mrmathur'> Arpit Mathur</a>,
        <a href='https://github.com/Guzzler'> Sharang Pai</a>,
        <a href='https://www.linkedin.com/in/pujan-parikh-818234165/'> Pujan Parikh</a>
    </div>
    <div>
        Contribute here - 
        <a href='https://github.com/Guzzler/Cowin-Notification-System'> Frontend</a>,
        <a href='https://github.com/abizerlokhandwala/Cowin-Notification-Service'> Backend</a>
    </div>
    <div>
        <Link to='/privacy'>Privacy Policy</Link>
    </div>
    </div>
  )
}

export default PageFooter
