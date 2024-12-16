import React from 'react'

function Footer() {

  return (

    <div className='flex justify-between items-center px-20 bg-orange-700'>
      <div className="left text-white text-sm">
        <p>
          Streamify @copyright
        </p>
      </div>
      <div className="right flex items-center gap-5">
        <div className="social-links"></div>
        <div className="social-links"></div>
        <div className="social-links"></div>
        <div className="social-links"></div>
      </div>
    </div>
  )
}

export default Footer;