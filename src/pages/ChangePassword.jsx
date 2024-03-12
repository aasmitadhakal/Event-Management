import React from 'react'
import axios from '../api/axios'
import notify from '../utlis/notifier'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
function ChangePassword() {
  const[password,setPassword]=useState('')
  const[password2,setPassword2]=useState('')

  const handlePassword =(e)=>{
    setPassword(e.target.value)
  }
  const handlePassword2 =(e)=>{
    setPassword2(e.target.value)
  }
  const apiUrl = 'password-change/'; // Replace with your API URL
  const token = localStorage.getItem('accessToken');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
  const username = localStorage.getItem('emailinput') // Replace with your username
  const userPassword = localStorage.getItem('passwordinput'); // Replace with your password

  // const config = {
  //   headers: {
  //     'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
  //     'Content-Type': 'application/json'
  //   }
  // };


  const data = {
    password,
    password2
  };
  const handleApi =(e)=>{
    e.preventDefault();
    axios.post(apiUrl, data, config)
    .then(response => {
      console.log('Password changed successfully', response.data);
      notify("success","Password changed successfully")
      setPassword('')
      setPassword2('')
      // Handle success or redirect to a different page
    })
    .catch(error => {
      console.error('Error changing password', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat(); 
         errorMessages.forEach(errorMessage => {
         notify("error",errorMessage)
        });
      } else {
        console.log("Error:", error);
      }
    });

  }
  return (
   
    <div className='  mt-24 flex justify-center items-center p-6 '>
          <form onSubmit={handleApi} className='   p-6 border bg-white shadow-md rounded'>
          <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Change  Password</div>
      {/* for email */}
       <div className='relative mb-8  mx-12 '>
       <label   htmlFor="new password" className="absolute    text-gray-600 cursor-text ">New Password</label>
    <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64" autoComplete="off"
       id="Password"
       type="text"
       name="password"
       value={password}
       onChange={handlePassword}
    />
 
</div>
 {/* for password */}
 <div className='relative mb-4   mx-12  '> 
  <label   htmlFor="password"  className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Confirm Password</label>
    <input
      className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors w-64" autoComplete="off"
      id="password"
      type="password"
      name="password"
      value={password2}
      onChange={handlePassword2}
    />   
  </div>
  
  {/* for buttom */}
  <div className=''>
<button className='bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4  px-8 mx-10 py-2  rounded-2xl'>Change Password</button>
  </div>
  <ToastContainer />
</form>

    </div>
  )
}

export default ChangePassword


// const changePassword = async () => {
//   const apiUrl = 'https://example.com/api/change-password'; // Replace with your API URL
//   const username = 'your-username'; // Replace with your username
//   const password = 'your-password'; // Replace with your password
  
//   const config = {
//     headers: {
//       'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
//       'Content-Type': 'application/json'
//     }
//   };
  
//   const data = {
//     password: 'new-password',
//     password2: 'confirm-new-password'
//   };

//   try {
//     const response = await axios.post(apiUrl, data, config);
//     console.log('Password changed successfully', response.data);
//     // Handle success or redirect to a different page
//   } catch (error) {
//     console.error('Error changing password', error);
//     // Handle error
//   }
// };