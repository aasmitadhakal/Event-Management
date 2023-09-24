import { useState , useEffect } from "react"
import { ToastContainer } from "react-toastify"
import notify from "../utlis/notifier"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"
function SponserUpdate() {
  const navigate =useNavigate()
  const[sponser_type,setSponserType]=useState('')
  const[name,setName]=useState('')
  const[amount,setAmount]=useState('')
  const[id,setID]=useState(0)
  const handleSponser=(e)=>{
    setSponserType(e.target.value)
  }
  const handleName=(e)=>{
    setName(e.target.value)
  }
  const handleAmount=(e)=>{
    setAmount(e.target.value)
  }
  //calling update api
  const handleAPi =(e)=>{
    e.preventDefault();
    axios
    .put(`/sponser/update/${id}/`, {
     sponser_type: sponser_type,
     name: name,
     amount: amount,
    })
    .then((result) => {
      console.log(result.data);
      notify("success","data updated successfully")
      navigate("/sponserlist",{replace:true});
     
     
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // setLoading(false);
    });
  }
  useEffect (()=>{
    setID(localStorage.getItem("sid"));
   setSponserType(localStorage.getItem("sponser_type"));
   setName(localStorage.getItem("sname"));
   setAmount(localStorage.getItem("samount"));
  
 },[])
  return (
<div className='  mt-18 flex justify-center items-center p-12 '>
   <form onSubmit={handleAPi}
     className='   p-6 border bg-white shadow-md rounded'>
     <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Update Sponser</div>
      {/* for sponser_type */}
      <div className='relative mb-8  mx-12 '>
      <label  className="absolute   text-gray-600 cursor-text ">Heading</label>
      <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autoComplete="off"
      type="text"
      name="sponser_type"
      value={sponser_type}
      onChange={handleSponser}
      />
      </div>
      {/* forname */}
      <div className='relative mb-8  mx-12 '>
      <label  className="absolute   text-gray-600 cursor-text ">Name</label>
      <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autoComplete="off"
      type="text"
      name="name"
      value={name}
      onChange={handleName}
      />
      </div>
      {/* for amount */}
      <div className='relative mb-8  mx-12 '>
      <label  className="absolute   text-gray-600 cursor-text ">Amount</label>
      <input
      className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autoComplete="off"
      type="text"
      name="amount"
      value={amount}
      onChange={handleAmount}
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

export default SponserUpdate