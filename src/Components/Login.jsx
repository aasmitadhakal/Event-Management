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
const handleApi =(e)=>{
  e.preventDefault();
  if(validate()){
    axios
    .post("login/", {
      email: email,
      password: password,
    })
    .then((result) => {
      console.log(result.data.token);
      setAuth({ token: result?.data?.token });
    ;
      console.log(result.data)
      // localStorage.setItem("emailinput",emailData.current.value)
      // localStorage.setItem("passwordinput",passwordData.current.value)
    

      //
      if (result?.data?.token && result.data.token.access) {
        localStorage.setItem("accessToken", result.data.token.access);
        console.log(result.data.token.access)
      }

      setAuth({ token: result?.data?.token });
      sessionStorage.setItem("token", result.data.token);

      notify("sucess","sucessfully login");
      if(result.data.user_is_admin='true'){
        navigate("/profile",{replace:true});
        } 
        else if(result.data.user_is_admin='false'){
        navigate("/ap",{replace:true})
        }
    })
    .catch((error) => {
    
      console.log(error);
    })
    .finally(() => {
      // setLoading(false);
    });
  }
}
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
    <div  className='fixed inset-0 z-10   transition-shadow delay-150 duration-300 ease-in-out  bg-black  bg-opacity-30 backdrop-blur-sm md:flex md:justify-center md:items-center flex justify-start items-start '>
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
                className="flex justify-center items-center pt-6 border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " autoComplete="off"
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
                className=" pt-6 flex justify-center  items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autoComplete="off"
                id="password"
                ref={passwordData}
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
              
             </div>
             <div className='ml-32 hover:underline hover:decoration-purple-600 text-sm mb-2'><p className='text-gray-600 '><Link to='/reset'>forget password</Link></p></div>
            {/* for buttom */}
            <div>
             <button className=' hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 text-white mt-4  px-20 mx-10 py-2  rounded-2xl'onClick={handleApi}>Login</button>
            </div>
              <div
                className='text-slate-500  mb-12 ml-12 mt-4  '>
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

