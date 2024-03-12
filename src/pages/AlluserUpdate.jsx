import { useState , useEffect } from "react"
import { ToastContainer } from "react-toastify"
import notify from "../utlis/notifier"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"
function AlluserUpdate() {
  const navigate =useNavigate()
  const[email,setEmail]=useState('')
  const[name,setName]=useState('')
  const[Ausername,setAllUsername]=useState('')
  const[password,setPassword]=useState('')
  const[id,setID]=useState(0)
  // const username = localStorage.getItem('emailinput') 
  // const userPassword = localStorage.getItem('passwordinput');
  const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

      const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Use the Bearer token here
            'Content-Type': 'application/json'
        }
    }
  const handleName=(e)=>{
    setName(e.target.value)
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }
  const handleUsername=(e)=>{
    setAllUsername(e.target.value)
  }
  //calling update api
  const handleAPi =(e)=>{
    e.preventDefault();
    axios
    .put(`/all-user-data-update/${id}/`, {
     email: email,
     name: name,
     username: Ausername,
     password: password,
    },config)
    .then((result) => {
      console.log(result.data);
      notify("success","data updated successfully")
      navigate("/alluserlist",{replace:true});
     
     
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // setLoading(false);
    });
  }
  useEffect (()=>{
    setID(localStorage.getItem("Alluserid"));
   setEmail(localStorage.getItem("Alluseremail"));
   setName(localStorage.getItem("Allname"));
   setAllUsername(localStorage.getItem("Allusername"));
  
 },[])
  return (
<div className='  mt-18 flex justify-center items-center p-12 '>
   <form onSubmit={handleAPi}
     className='   p-6 border bg-white shadow-md rounded'>
     <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Update Alluser</div>
      {/* for sponser_type */}
      <div className='relative mb-8  mx-12 '>
      <label  className="absolute   text-gray-600 cursor-text ">Email</label>
      <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64" autoComplete="off"
      type="text"
      name="email"
      value={email}
      onChange={handleEmail}
      />
      </div>
      {/* forname */}
      <div className='relative mb-8  mx-12 '>
      <label  className="absolute   text-gray-600 cursor-text ">Name</label>
      <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64" autoComplete="off"
      type="text"
      name="name"
      value={name}
      onChange={handleName}
      />
      </div>
      {/* for amount */}
      <div className='relative mb-8  mx-12 '>
      <label  className="absolute   text-gray-600 cursor-text ">Username</label>
      <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64" autoComplete="off"
      type="text"
      name="username"
      value={Ausername}
      onChange={handleUsername}
      />
      </div>
       {/* for Password */}
       <div className='relative mb-8  mx-12 '>
      <label  className="absolute   text-gray-600 cursor-text ">Password</label>
      <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64" autoComplete="off"
      
      name="password"
      value={password}
      onChange={handlePassword}
      />
      </div>

    {/* for buttom */}
    <div className=''>
    <button className='bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4  px-8 mx-10 py-2  rounded-2xl'>Update</button>
    </div>
    <ToastContainer />
  </form>
</div>
  )
}

export default AlluserUpdate