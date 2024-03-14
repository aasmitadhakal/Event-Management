import {motion,AnimatePresence} from 'framer-motion';
import { useState ,useRef,useContext} from 'react';
 import axios from '../api/axios';
import { useNavigate,Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../contexs/auth';
import notify from '../utlis/notifier';

import {RxCross1} from 'react-icons/rx'
export default function Login({visible,onClose,setHasaccount}) {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const emailData = useRef();
    const passwordData = useRef();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handlemail = (e) => {
      setEmail(e.target.value);
    };
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
//for submission
const handleApi = (e) => {
  e.preventDefault();
  if (validate()) {
    axios
      .post("login/", {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result.data.token);
        setAuth({ token: result?.data?.token });
        console.log(result.data);
        if (result?.data?.token && result.data.token.access) {
          localStorage.setItem("accessToken", result.data.token.access);
          console.log(result.data.token.access);
        }

        setAuth({ token: result?.data?.token });
        sessionStorage.setItem("token", result.data.token);

        notify("success", "Successfully logged in");
        if (result.data.nrmuser === true) {
          navigate("/user", { replace: true });
        }
        if (result.data.user_is_admin === true) {
          navigate("/profile", { replace: true });
        }
        if (result.data.artist === true) {
          navigate("/artistprofile", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage =
            error.response.data.msg || "An error occurred. Please try again.";
          notify("error", errorMessage);
        } else if (error.request) {
          // The request was made but no response was received
          notify("error", "No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          notify("error", "Error occurred while processing the request.");
        }
      });
  }
};
const validate = () => {
      let result = true;
      if (email === '' || email === null) {
          result = false;
          notify("error", "Please Enter Email");
      }
      else if (password === '' || password === null) {
          result = false;
          notify("error", "Please Enter Password");
      }
return result;
}

      if(!visible) return null;
  return (
    <>
    <div  className='fixed inset-0 z-10 font-serif  transition-shadow delay-150 duration-300 ease-in-out  bg-black  bg-opacity-30 backdrop-blur-sm md:flex md:justify-center md:items-center flex justify-start items-start '>
      <AnimatePresence>
        <motion.div
          initial={{y:'-300'}}
          animate={{y:0,ease:"easeInOut"}}
          className='h-29 w-29  relative '>
        <div className='  mt-16  p-6 '>
          <form className='md:mx-24   p-6 border bg-white shadow-md rounded'>
            <div className='mt-4 text-2xl mb-8 font-bold text-purple-600 flex justify-center items-center  '>Login</div>
              {/* for email */}
              <div className='relative mb-8  mx-12 '>
               <label htmlFor='email' className="absolute left-0 top-1 text-gray-600 cursor-text ">Email</label>
                <input
                className="w-64 flex justify-center items-center pt-6 border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " autoComplete="off"
                id="email"
                type="text"
                ref={emailData}
                name="email"
                value={email}
                onChange={handlemail}
              />

              </div>
             {/* for password */}
              <div className='relative mb-4   mx-12  '> 
               <label htmlFor='password' className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text ">Password</label>
                <input
                className=" pt-6 w-64 flex justify-center  items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autoComplete="off"
                id="password"
                ref={passwordData}
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
              
             </div>
             <div className='hover:underline font-serif hover:decoration-purple-600  flex item-end justify-end text-[15px] mx-8 '><p className='text-gray-600 font-[500]'><Link to='/reset'>forget password ?</Link></p></div>
            {/* for buttom */}
            <div className='flex item-center justify-center'>
             <button className=' hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 text-white mt-4  px-28 mx-10 py-2  rounded-2xl'onClick={handleApi}>Login</button>
            </div>
              <div
                className='text-slate-500  mb-12 flex item-center justify-center mt-4  '>
                  Not a member ?
               <span className="hover:underline hover:decoration-purple-500 hover:decoration-2 mx-2 text-purple-400 " onClick={()=>setHasaccount(false)}>SignUp now</span>
            </div>
          </form>
              {/* <ToastContainer /> */}
              </div>
              <div className='absolute top-32 right-4   md:mx-36 text-black font-bold text-xl' onClick={onClose}><RxCross1 /></div>
        
      </motion.div>
    </AnimatePresence>
      <ToastContainer />
  </div>
  </>
  )
}

