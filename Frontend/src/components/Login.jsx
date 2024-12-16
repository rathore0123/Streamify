import axios from "axios";
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../utils/constants.js";
import { useSelector, useDispatch } from "react-redux";
import InfoContext from '../useInfoContext/InfoContext';
import { setIsLogin, setUser, setisLoading } from "../redux/userSlice";

function Login() {

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.user.isLoading)
    const { email, setEmail, username, password, setPassword, setIsLoggedIn } = useContext(InfoContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setisLoading(true));
        dispatch(setIsLogin(true));
        console.log(isLoading);

        try {
            const res = await axios.post(`${API_END_POINT}/users/login`, { username, email, password }, { withCredentials: true });
            console.log(res);
            setEmail("");
            setPassword("");
            setIsLoggedIn(true);
            Navigate("/browse-movies")
            dispatch(setUser(res.data.data.user));
        } catch (error) {
            const err = error.res?.data?.data.includes("Invalid credentials");
            if (err) {
                console.log(err);
            }
            console.log(error);
        }
        finally {
            dispatch(setisLoading(false));
        }
    }

    return (
        <div className='bg-[url("/src/assets/Netflix-Background.jpg")] h-screen w-full'>
            <div className='bg-black/70 h-screen flex justify-center items-center'>
                <div className="card bg-slate-900/80 p-20 rounded-md w-3/4 md:w-1/2 lg:w-1/3 mx-auto flex flex-col gap-4">
                    <h1 className='text-white uppercase font-bold text-center text-3xl'>
                        Sign In
                    </h1>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email or username"
                        id="email or username"
                        placeholder="enter email or username"
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

                    <p className='w-full text-purple-400'>
                        forget password
                    </p>

                    <button
                        onClick={handleSubmit}
                        className='px-3 py-2 mx-auto rounded-md bg-gradient-to-r from-black to-cyan-600 text-white font-semibold w-1/2'
                    >
                        {`${isLoading ? "Loading..." : "Sign In"}`}
                    </button>

                    <p className='w-full text-white text-center'>
                        New to Streamify?
                        <Link to="/signup"><span className='text-purple-400 cursor-pointer'>
                            click here
                        </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login