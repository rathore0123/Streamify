import UserProfile from './UserProfile';
import { IoIosHome } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import InfoContext from '../useInfoContext/InfoContext';
import React, { useContext, useEffect, useState } from 'react'

function Header() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [showUser, setShowUser] = useState('false')
    const isLogin = useSelector((store) => store.user.isLogin);
    const { searchBar, setSearchBar } = useContext(InfoContext);

    const Search = () => {
        setSearchBar(!searchBar)
        if (!searchBar) {
            Navigate("/search-movie");
        } else {
            Navigate("/browse-movies")
        }
    }

    const showUserProfile = () => {
        setShowUser((prev) => !prev)
    }

    useEffect(() => {
        setShowUser(false);
    }, [location, isLogin]);

    return (
        <div className='w-full py-3 px-5 md:px-10 flex justify-between items-center absolute z-10 top-0'>
            <div className='bg-clip-text bg-gradient-to-r from-red-400 to-orange-800 text-transparent text-2xl md:text-4xl font-bold'>
                <Link to="/">
                    STREAMIFY
                </Link>
            </div>
            <div className='flex gap-x-5 p-2'>
                {isLogin &&
                    <div
                        onClick={Search}
                        className='text-white text-xl md:text-3xl flex justify-center items-center cursor-pointer bg-slate-700 p-2 rounded-full'>
                        {!searchBar ? <IoSearchSharp /> : <IoIosHome />}
                    </div>
                }
                {!isLogin ? (
                    <Link to="/login">
                        <button className='px-3 py-2 rounded-md bg-gradient-to-r from-black to-cyan-600 text-white text-sm md:text-base font-semibold'>
                            Sign In
                        </button>
                    </Link>
                )
                    :
                    (
                        <button
                            onClick={showUserProfile}
                            className='text-white font-semibold text-4xl'>
                            <FaUserCircle />
                        </button>
                    )
                }
            </div>
            {
                isLogin && showUser && <UserProfile />
            }
        </div>
    )
}

export default Header;