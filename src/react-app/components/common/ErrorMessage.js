import React from 'react'

const ErrorMessage = (props) => {
  return (
    <>
			{ 
			props.message ?
				<span id='error' className='f10 text-red'>
					{props.message}
				</span> :
				null
			}
    </>
  )
}

export default ErrorMessage;
