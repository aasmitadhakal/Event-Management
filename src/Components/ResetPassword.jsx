import { useState } from "react"
import axios from "axios";
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
           
            // navigate("/list",{replace:true});
          })
          .catch((error) => {
           
            console.log(error);
          })
    }
  return (
    <div className='  mt-24 flex justify-center items-center p-6 '>
    <form onSubmit={SendLink} className='   p-6 border bg-white shadow-md rounded'>
    <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Enter your Email</div>
{/* for email */}
 <div className='relative mb-8  mx-12 '>
 <label for="email" class="absolute   text-gray-600 cursor-text ">email</label>
<input
className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autocomplete="off"
 id="email"
 type="text"
 name="email"
 value={email}
 onChange={handleEmail}
/>

</div>


{/* for buttom */}
<div className=''>
<button className='bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4  px-8 mx-10 py-2  rounded-2xl'>Send email</button>
</div>
{/* <ToastContainer /> */}
</form>

</div>
  )
}

export default ResetPassword