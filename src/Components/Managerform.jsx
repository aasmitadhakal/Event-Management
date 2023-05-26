import { useState } from "react"

function Managerform() {
  const [artist,setAritist] =useState('')
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[contact,setContact]=useState('')

  const handleAritist =(e)=>{
    setAritist(e.target.value);
  }
  const handleName=(e)=>{
    setName(e.target.value);
  }
  const handleEmail =(e)=>{
    setEmail(e.target.value);
  }
  const handleContact =(e)=>{
    setContact(e.target.value);
  }
  return (
    <div className=''>
    <div className=' mt-12 mx-96 p-6 '>
    <form className=' mx-20 p-12 border bg-white shadow-md rounded'>
      <div className='text-2xl flex justify-center items-center mb-4 font-bold text-purple-400 '>Manager</div>
      {/* for artist */}
      <div className='relative ml-8 mb-4'>
      <label for="artist" class="absolute left-0 top-1 text-gray-600 cursor-text ">Artist</label>
          <input
            className="flex justify-center items-center pt-6 border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="artist"
            type="text"
            name="artist"
            value={artist}
            onChange={handleAritist}
          />
      </div>
       {/* for name */}
       <div className='relative ml-8 mb-4'> 
       <label for="email" class="absolute left-0 top-1 text-gray-600 cursor-text ">Name</label>
          <input
            className="flex justify-center items-center pt-6 border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
        </div>
         {/* for email */}
       <div className='relative  ml-8 mb-4'> 
       <label for="email" class="absolute left-0 top-1 text-gray-600 cursor-text ">Email</label>
          <input
            className="flex justify-center items-center pt-6 border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
         {/* for contact */}
       <div className='relative  ml-8 mb-4'> 
       <label for="contact" class="absolute left-0 top-1 text-gray-600 cursor-text ">Contact</label>
          <input
            className="flex justify-center items-center pt-6 border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="contact"
            type="text"
            name="contact"
            value={contact}
            onChange={handleContact}
          />
        </div>
        {/* for buttom */}
        <div>
    <button className='hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 text-white mt-4  px-20 mx-10 py-2  rounded-2xl'>Save</button>
        </div>
       
    </form>
    </div>
    </div>

  )
}

export default Managerform