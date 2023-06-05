import { useState } from 'react';
import {RxCross1} from 'react-icons/rx';
 import { ToastContainer } from 'react-toastify';
 import notify from '../utlis/notifier'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Register({setHasaccount,visible,onClose}) {
        const navigate = useNavigate();
        const[name,setName]=useState("")
        const[username,setUsername]=useState("");
        const[email,setEmail]=useState("");
        const[password,setPassword]=useState("");
        const[password2,setpassword2]=useState("");
        const [isArtist, setIsArtist] = useState(false);
        const [isUser, setIsUser] = useState(true);
        const [errorMessage, setErrorMessage] = useState('');
        const handlename =(e)=>{
          setName(e.target.value);
        }
        const handleusername = (e) => {
          setUsername(e.target.value);
        };
        const handlpassword = (e) => {
          setPassword(e.target.value);
        };
        const handlecpassword = (e) => {
          setpassword2(e.target.value);
        };
        const handlemail = (e) => {
          setEmail(e.target.value);
        };
        const handleartist =(e)=>{
          setIsArtist(e.target.checked);
        }
        const handleuser =(e)=>{
          setIsUser(e.target.checked);
        }
  //for api submissions
  const handleApi = (e) => {
        e.preventDefault();
        if (validate()){ 
            axios
        .post("register/", {
          password2:password2,
          password:password,
          email:email,
          name:name,
          username:username,
          is_artist: isArtist,
          is_user: isUser,
    
    }, )
    .then((result) => {
          console.log(result.data);
          sessionStorage.setItem("token", result.data.token);
          localStorage.setItem("uid",result.data.uid)
          if(isArtist){
            navigate("/aform", { replace: true });
          }else{
            navigate("/uform",{replace:true});
          }
          notify("success","Register successfully")
          setName('')
          setUsername('')
          setEmail('')
          setIsArtist('')
          setIsUser('')
          setPassword('')
          setpassword2('')
        })
        .catch((error) => {
              // setError(error.response.data.message);
          console.log(error);
          if (error.response) {
            // The request was made and the server responded with a status code
            const { status, data } = error.response;
            if (status === 404) {
              // Handle 404 error
              console.log('Resource not found');
              notify("error","enter the valid data");
            } else {
              // Handle other status codes
              console.log(`Error ${status}: ${data}`);
              notify("error","enter valid credentails")
            }}
      })
      .finally(() => {
        // setLoading(false);
      }); 
        
      } };
   const validate = ()=>{
        let result = true;
        if (name === '' || password ==='' || email ==='' || username === '' || password ==='' || password2 ==='') {
            result = false;
            notify("error", " Enter the Credentials");
        }
        else if (password != password2){
          result = false;
          notify("error", " password and confirm password must be same");
        }
        else if (!isArtist && !isUser){
          result = false;
          notify("error", " select an field");
        }
        else if (isArtist && isUser){
          result = false;
          notify("error", " select only one field");
        }
        return result
      }
     
     

  if(!visible) return null;

  return (
    <>
      <div  className='fixed inset-0 z-10   delay-150 duration-300 ease-in-out  bg-black bg-opacity-30 
       backdrop-blur-sm flex justify-center items-center '>
      <div className='  mt-2'>
        <form className='mx-96    border bg-white shadow-md rounded'>
          <h1 className='text-2xl mt-12 mb-8 flex justify-center items-center  font-medium text-purple-400 '>Registration</h1>
          {/* for all field */}
          <div className='grid grid-cols-2 '>
           <div>
              {/* for Name */}
              <div className='relative mb-8  mx-12'>
                <label for="name" class="absolute left-0 top-1 text-gray-600 cursor-text ">Name</label>
                  <input
                    className=" pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
                    id="name"
                    value={name}
                    onChange={handlename}
                    type="text"
                    name="name"
                  />
                  
              </div>
                {/* for username */}
              <div className='relative mb-8  mx-12'> 
                <label for="username" class="absolute left-0 top-1 text-gray-600 cursor-text">Username</label>
                    <input
                      className="pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
                      id="username"
                      type="text"
                      value={username}
                      onChange={handleusername}
                      name="username"
                    />
                    
              </div>
                  {/* for email */}
              <div className='relative mb-8  mx-12'> 
                <label for="email" class="absolute left-0 top-1 text-gray-600 cursor-text">Email</label>
                    <input
                      className=" pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
                      id="email"
                      type="text"
                      value={email}
                      onChange={handlemail}
                      name="email"
                    />
                  
              </div>
            </div>
            {/* for division */}
            <div>
              {/* for password */}
              <div className='relative mb-8  mx-12'> 
              <label for="name" class="absolute left-0 top-1 text-gray-600 cursor-text ">Password</label>
                  <input
                    className="pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
                    id="password"
                    type="text"
                    value={password}
                    onChange={handlpassword}
                    name="Password"
                  />
                  
                </div>
                  {/* for cpassword */}
              <div className='relative mb-8  mx-12'> 
                <label for="name" class="absolute left-0 top-1 text-gray-600 cursor-text "> Confirm Password</label>
                    <input
                      className=" pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
                      id="cpassword"
                      type="text"
                      value={password2}
                      onChange={handlecpassword}
                      name="cpassword"
                    />
                      
              </div>
                {/* for user ,artist,admin */}
              <div className='ml-12 text-gray-600'>
                <div>
                  <label htmlFor="is_artist" >Artist &nbsp;</label>
                  <input type="checkbox"
                      id="isArtist"
                      checked={isArtist}
                      onChange={handleartist}
                  />
                </div>

                <div>
                    <label htmlFor="is_user" >User  &nbsp;</label>
                    <input type="checkbox"
                    checked={isUser}
                    id="isUser"
                    onChange={handleuser}
                        />
                </div>
              </div>  
        
        {/* for buttom */}
          
        </div>
      </div>
        <button className='bg-gradient-to-r from-blue-300 to-purple-600 text-white mt-4  hover:text-white  hover:to-blue-400   px-36 mx-36 py-2 rounded' onClick={handleApi}>Register</button>
        {/* for text */}
            <div onClick={()=>setHasaccount(true)}
            className='text-slate-500 mx-44 mt-2  m-2 mb-12 '>
             Already have an account ?<span className="hover:underline hover:decoration-pink hover:decoration-2 ">Login</span>
            </div>
    </form>
        </div>
        <div className='absolute top-24 right-96  font-bold text-black text-2xl'onClick={onClose} ><RxCross1 /></div>
        <ToastContainer />
        </div> 
  
    </>
  )
}

