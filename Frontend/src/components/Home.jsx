import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import InfoContext from '../useInfoContext/InfoContext'

function Home() {
    const Navigate = useNavigate();
    const { email, setEmail } = useContext(InfoContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        Navigate("/login");
    }

    return (

        <div className='bg-[url("/src/assets/Netflix-Background.jpg")] h-screen w-full'>
            <div className='bg-black/70 h-screen pt-32'>
                <div className='w-1/2 mx-auto text-center mb-3'>
                    <h2 className='text-white font-bold text-2xl md:text-4xl lg:text-6xl'>
                        Unlimited movies, TV shows and more
                    </h2>
                </div>
                <div className='w-1/2 mx-auto text-center mb-3'>
                    <h2 className='text-white font-semibold text-lg md:text-xl'>
                        Starts at ₹149. Cancel at any time.
                    </h2>
                </div>
                <div className='w-1/2 mx-auto text-center mb-3'>
                    <h2 className='text-white font-semibold text-lg md:text-xl'>
                        Ready to watch? Enter your email to create or restart your membership.
                    </h2>
                </div>
                <div className='w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-5'>
                    <form onSubmit={handleSubmit}  action="" className='w-full flex gap-3'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email" id="email"
                            placeholder='Enter Email'
                            className='w-[70%] p-2 px-3 bg-slate-800 border-none outline-none rounded-md text-white font-bold'
                        />

                            <button 
                            type='submit' 
                            className='px-3 py-2 rounded-md bg-sky-600 hover:bg-lime-400 transition-colors duration-500 text-white font-semibold'>
                                Get Started
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home;