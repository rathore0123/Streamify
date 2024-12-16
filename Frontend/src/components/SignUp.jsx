import axios from "axios";
import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoContext from '../useInfoContext/InfoContext';
import { API_END_POINT } from "../utils/constants.js";

function SignUp() {

    const Navigate = useNavigate();
    const { email, setEmail, fullName, setFullName, password, setPassword, username, setUsername } = useContext(InfoContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_END_POINT}/users/register`, { username, fullName, email, password });
            console.log(res)
            setEmail("");
            setFullName("");
            setUsername("");
            setPassword("");
            Navigate("/login");
        } catch (error) {
            const err = error.response.data.includes("username or email already exist");
            if (err) {
                console.log(err);
            }
            console.log(error);
        }
    }

    return (
        <div className='bg-[url("/src/assets/Netflix-Background.jpg")] h-screen w-full'>
            <div className='bg-black/70 h-screen flex justify-center items-center'>
                <div className="card bg-slate-900/80 p-20 rounded-md w-3/4 md:w-1/2 lg:w-1/3 mx-auto flex flex-col gap-4">
                    <h1 className='text-white font-bold text-center uppercase text-3xl'>
                        Sign Up
                    </h1>

                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        name=""
                        id="fullName"
                        placeholder="enter name"
                        className='outline-purple-500 text-white font-bold w-full p-2 px-3 rounded-md bg-gray-600'
                    />

                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="enter username"
                        className='outline-purple-500 text-white font-bold w-full p-2 px-3 rounded-md bg-gray-600'
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="enter email"
                        className='outline-purple-500 text-white font-bold w-full p-2 px-3 rounded-md bg-gray-600'
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="enter password"
                        className='outline-purple-500 text-white font-bold w-full p-2 px-3 rounded-md bg-gray-600'
                    />

                    <button
                        onClick={handleSubmit}
                        className='px-3 py-2 mx-auto rounded-md bg-gradient-to-r from-black to-cyan-600 text-white font-semibold w-1/2'
                    >
                        Sign Up
                    </button>

                    <p className='w-full text-white text-center'>
                        Already have an Account?
                        <Link to="/login">
                            <span className='text-purple-400 cursor-pointer'>
                                click here
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;