import axios from "axios"
import React, { useState } from 'react'
import { FaRegSave } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API_END_POINT } from "../utils/constants";
import { clearUser, setIsLogin, setUser } from '../redux/userSlice';

function UserProfile() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);
    const [usernameIsEditable, setUsernameIsEditable] = useState(false);
    const [fullNameIsEditable, setFullNameIsEditable] = useState(false);

    const logOutUser = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${API_END_POINT}/users/logout`, {}, { withCredentials: true });
            console.log(res);
            dispatch(clearUser(null));
            dispatch(setIsLogin(false));
            Navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleNameChange = (e) => {
        const updatedUser = { ...user, fullName: e.target.value };
        dispatch(setUser(updatedUser));
    };

    const handleUserNameChange = (e) => {
        const updatedUser = { ...user, username: e.target.value };
        dispatch(setUser(updatedUser));
    };

    const saveUserInfo = async () => {
        if (fullNameIsEditable) {
            setFullNameIsEditable((prev) => !prev);
        }
        if (usernameIsEditable) {
            setUsernameIsEditable((prev) => !prev);
        }
        const fullName = user?.fullName;
        const username = user?.username;
        const res = await axios.patch(`${API_END_POINT}/users/info`, { fullName, username }, { withCredentials: true });
        console.log(res.data)
    }

    return (
        <div className='absolute right-5 top-20 bg-white rounded-md p-5'>
            <div className='mx-auto'>
                <div className='flex items-center'>
                    <input
                        className='focus:bg-[#cccccc] px-2 border-none outline-none m-2 ml-0 rounded-md font-bold text-gray-600'
                        onChange={handleUserNameChange}
                        type="text"
                        name="fullName"
                        readOnly={!usernameIsEditable}
                        id="fullName"
                        value={user?.username}
                    />
                    {usernameIsEditable ? (<FaRegSave onClick={saveUserInfo} />) : (<FaFilePen onClick={(e) => setUsernameIsEditable((prev) => !prev)} />)}
                </div>
                <div className='flex items-center'>
                    <input
                        className='focus:bg-[#cccccc] px-2 border-none outline-none m-2 ml-0 rounded-md font-bold text-blue-600'
                        onChange={handleNameChange}
                        type="text"
                        name="fullName"
                        readOnly={!fullNameIsEditable}
                        id="fullName"
                        value={user?.fullName}
                    />
                    {fullNameIsEditable ? (<FaRegSave onClick={saveUserInfo} />) : (<FaFilePen onClick={(e) => setFullNameIsEditable((prev) => !prev)} />)}
                </div>
                <h2 className="text-center font-bold text-red-600 cursor-pointer">
                    Change Password
                    </h2>
                <h2 onClick={logOutUser} className='text-center font-bold text-red-600 cursor-pointer'>
                    Logout
                </h2>
            </div>
        </div>
    )
}

export default UserProfile