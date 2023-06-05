import axios from 'axios';
import { useState } from 'react';
import img from '../assets/img6.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
const PasswordReset2 = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate =useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();

    // Make the API request using Axios
    axios
      .post(`https://ayushkandel.pythonanywhere.com/reset-password/${uid}/${token}/`, {
        password,
        password2: confirmPassword,
      })
      .then((response) => {
        // Handle the response if needed
        console.log(response);
        navigate('/',{replace:true})
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  };
  return (
    <>
    <div className='h-screen w-screen flex justify-center items-center '>
    <div className='flex gap-x-36   shadow-2xl p-12 rounded '>
      <div>
        <img src={img} className='h-80 '></img>
      </div>
      <div className='mr-24'>
      <form onSubmit={handleSubmit} className=''>
      <h1 className='text-xl mb-12  flex justify-center items-center  font-medium text-purple-400 '>Reset Password</h1>
        <div className='relative '>
        <label for="password" className="absolute   text-gray-600 cursor-text "> Password</label>
          <input
          className=' pt-4 mt-2 border-b-2 py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer'
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
           
          />
        </div>
            <div className='relative mt-6'>
            <label for=" confirm password" className="absolute   text-gray-600 cursor-text "> Confirm Password</label>
              <input
              className='mb-12 pt-4 mt-2 border-b-2 py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer'
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
               
              />
            </div>
     
            <button type="submit" className='bg-gradient-to-r from-blue-300 to-purple-600  hover:text-white  hover:to-blue-400 hover:from-purple-600  px-8 py-2 text-white cursor-pointer rounded'>Reset Password</button>
         
          </form>
      </div>
      </div>
    </div>
    </>
  );
};

export default PasswordReset2;