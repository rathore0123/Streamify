import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function LandPage() {
  const [email, setEmail] = useState('')
  return (
    <div className='h-[560px] flex justify-center items-center'>
      <div className='m-auto p-8 w-[650px] text-center flex flex-col gap-6'>
        <h1 className='text-white font-bold text-5xl'>Unlimited movies, TV shows and more</h1>
        <h3 className='text-white font-bold text-lg'>Starts at ₹149. Cancel at any time.</h3>
        <h4 className='text-white font-bold text-base'>Ready to watch? Enter your email to create or restart your membership.</h4>
        <div className='flex gap-5 items-center m-auto'>
          <div className='w-80 relative flex items-center'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className='peer w-full h-10 rounded-md px-3 text-[#ffffff] font-bold
               bg-white/30 border-none outline-none focus:outline-red-600' />
            <p className='peer-focus:-translate-y-8 peer-focus:text-[#ff0000] text-white font-semibold absolute px-3'>
              Email Address
            </p>
          </div>
          <Link to='/login'>
            <button className='text-white bg-[#ff0000] rounded-md font-bold p-4 py-2'>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandPage