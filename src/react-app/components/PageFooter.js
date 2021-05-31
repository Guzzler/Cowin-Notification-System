import React from 'react';
import { HeartFilled } from '@ant-design/icons';

const PageFooter = () => {
  return (
    <div>
    <div >Made with <HeartFilled /></div>
    <div>
        Contribute here -
        <a href='https://github.com/Guzzler/Cowin-Notification-System' target="_blank" rel="noopener noreferrer"> Frontend</a>,
        <a href='https://github.com/abizerlokhandwala/Cowin-Notification-Service' target="_blank" rel="noopener noreferrer"> Backend</a>,
    </div>
    <div>
        About the platform -
        <a href='https://vaccinepost.co.in/privacy' target="_blank" rel="noopener noreferrer"> Privacy Policy</a>,
        <a href='https://forms.gle/84sihsmbxUyqwv1E9' target="_blank" rel="noopener noreferrer"> Contact Us</a>
    </div>
    </div>
  )
}

export default PageFooter
