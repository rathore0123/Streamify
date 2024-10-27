import React from 'react'

function Signup() {
    return (
        <div className='h-[560px] flex justify-center items-center'>
            <div className='w-1/3 bg-gradient-to-t from-blue-500 to-red-500 p-16 rounded-md'>
                <form action="" className='w-full flex flex-col items-center gap-3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="fullname" className='text-white font-bold'>fullname</label>
                        <input type="text" name="" id="fullname" className='p-4 py-2 rounded-md outline-[#3366ff] border-none font-bold text-red-600' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="email" className='text-white font-bold'>email</label>
                        <input type="email" name="" id="email" className='p-4 py-2 rounded-md outline-[#3366ff] border-none font-bold text-red-600' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="username" className='text-white font-bold'>username</label>
                        <input type="text" name="" id="username" className='p-4 py-2 rounded-md outline-[#3366ff] border-none font-bold text-red-600' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="password" className='text-white font-bold'>password</label>
                        <input type="password" name="" id="password" className='p-4 py-2 rounded-md outline-[#3366ff] border-none font-bold text-red-600' />
                    </div>
                    <button type="submit" className=' text-white bg-[#ff0000] rounded-md font-bold p-4 py-2 m-auto my-3'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup