import React from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='w-full'>
            <nav className='flex justify-between items-center px-36 py-3'>
                <div className="left">
                    <img src={logo}
                        alt="logo"
                        className="logo w-52" />
                </div>
                <div className="right flex gap-4">
                    <select
                        name=""
                        id=""
                        className='px-3 py-1 rounded-md text-black font-bold'>
                        <option
                            value=""
                            selected>
                            English
                        </option>
                        <option value="">Hindi</option>
                    </select>
                    <Link to='/login'>
                        <button className='bg-[#ff0000] text-white font-bold p-2 px-3 rounded-md'>
                            Sign In
                        </button>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Header