import { useState } from "react"
import axios from "axios";
import notify from '../utlis/notifier'
import img5 from '../assets/img8.png'
import { ToastContainer } from "react-toastify";

function ResetPassword() {
    const [email,setEmail]=useState('')
    const handleEmail =(e)=>{
       
        setEmail(e.target.value);
    }
    
    const SendLink =(e)=>{
        e.preventDefault();   
        axios.post("https://ayushkandel.pythonanywhere.com/send-reset-password-email/", {
            email: email,
           
          })
          .then((result) => {
            console.log(result.data);
            notify("success","Link send to email sucessfully")
            setEmail('')
           
            // navigate("/list",{replace:true});
          })
          .catch((error) => {
           
            console.log(error);
          })
    }
  return (
    
    <>
    <div>
      <div className="md:my-40 my-8 md:gap-8 md:flex justify-center items-center shadow-2xl md:mx-56 mx-10 rounded-md">
        {/* for images */}
        <div >
          <img src={img5} alt="" className="md:w-80 md:h-80 w-56 h-54  " >
          </img>
        </div>
        {/* for form */}
        <div>
          <form onSubmit={SendLink}>
          <div className='relative mb-8  mx-12 '>
            <div className="md:text-3xl text-xl font-medium text-purple-400">
            <h1>Forget</h1>  
            <h1>Password ?</h1>
              </div>
              <div className="text-sm font-medium my-4 text-slate-500 flex-wrap">Please check your email for a link to reset your password. Just click on the link, and you'll be able to create a new password in no time. Thank you!" </div>

          <label for="email" className="absolute font-normal    text-gray-500 cursor-text "> Enter your email Address</label>
          <input
          className=" pt-4 mt-2 border-b-2 py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autocomplete="off"
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
          />
          </div>
          <div className=" ">
            <button className="rounded md:py-2 md:px-8 md:mx-64 mx-24  px-8 md:mb-2 pb-4 mb-12 bg-gradient-to-r from-blue-300 to-purple-600  hover:text-white  text-white hover:to-blue-400 hover:from-purple-600 ">Send Email</button>
            </div>
          
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>

  )
}

export default ResetPassword