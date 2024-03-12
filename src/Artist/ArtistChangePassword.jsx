import React, { useState } from 'react';
import axios from '../api/axios';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';

function ArtistChangePassword() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const apiUrl = 'password-change/';
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const data = {
    password,
    password2
  };

  const handleApi = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when the API call starts
    axios.post(apiUrl, data, config)
      .then(response => {
        console.log('Password changed successfully', response.data);
        notify("success", "Password changed successfully");
        setPassword('');
        setPassword2('');
        setIsLoading(false); // Set loading state to false when the API call completes
      })
      .catch(error => {
        console.error('Error changing password', error);
        setIsLoading(false); // Set loading state to false in case of error
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          errorMessages.forEach(errorMessage => {
            notify("error", errorMessage);
          });
        } else {
          console.log("Error:", error);
        }
      });
  };

  return (
    <div className='mt-24 flex justify-center items-center p-4'>
      <form onSubmit={handleApi} className='p-16 bg-white shadow-md rounded'>
        <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center'>Change Password</div>
        <div className='relative mb-8 mx-12'>
          <label htmlFor="new password" className="absolute text-gray-600 cursor-text">New Password</label>
          <input
            className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64"
            autoComplete="off"
            id="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className='relative mb-4 mx-12'>
          <label htmlFor="password" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text">Confirm Password</label>
          <input
            className="flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors w-64"
            autoComplete="off"
            id="password"
            type="password"
            name="password"
            value={password2}
            onChange={handlePassword2}
          />
        </div>
        <div className=''>
          <button
            className='bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4 px-8 mx-10 py-2 rounded-2xl'
            
          >
            {isLoading ? 'Changing Paswword...' : 'Change Password'} {/* Show 'Loading...' text when loading */}
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default ArtistChangePassword;