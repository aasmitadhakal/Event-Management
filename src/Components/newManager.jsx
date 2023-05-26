import React, { useState } from 'react'
import axios from '../api/axios'
function Manager() {
    const[name,setName]=useState()
    const[email,setEmail]=useState()
    const[contact,setContact]=useState()
    const[artist,setArtist]=useState()

    const handlName = (e) => {
        setName(e.target.value);
      };
      const handlemail = (e) => {
        setEmail(e.target.value);
      };
      const handleContact = (e) => {
        setContact(e.target.value);
      };
      const handlArtist = (e) => {
        setArtist(e.target.value);
      };

      const handleApi =(e)=>{
        e.preventDefault();
      
          axios
          .post("manager/create/", {
            name: name,
            email: email,
            contact: contact,
            artist: artist,
          })
          .then((result) => {
            console.log(result.data);
            sessionStorage.setItem("token", result.data.token);
           
          })
          .catch((error) => {
            // setError(error.response.data.message);
            console.log(error);
          })
          .finally(() => {
            // setLoading(false);
          });
        }
      
     
      
  return (
    
    <div className='  mt-12 mx-96 p-6 '>
    <form className=' mx-24 p-12 border bg-white shadow-md rounded'>
      <div className='text-3xl mx-16 mb-4 font-bold text-orange-600 '>Manager</div>
      {/* for name */}
      <div> 
          <input
            className=" w-46 shadow appearance-none  my-4 border rounded pl-12  py-2 px-3 text-gray-700 leading-tight focus:outline-none 
            focus:shadow-outline  focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handlName}
          />
        </div>
         {/* for email */}
       <div> 
          <input
            className=" w-46 shadow appearance-none  my-4 border rounded pl-12  py-2 px-3 text-gray-700 leading-tight focus:outline-none 
            focus:shadow-outline  focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
           
            type="text"
            placeholder="Email"
          
            value={email}
            onChange={handlemail}
          />
        </div>
         {/* for contact */}
       <div> 
          <input
            className=" w-46 shadow appearance-none  my-4 border rounded pl-12  py-2 px-3 text-gray-700 leading-tight focus:outline-none 
            focus:shadow-outline  focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
           
            type="number"
            placeholder="Contact"
           
            value={contact}
            onChange={handleContact}
          />
        </div>
      {/* for artist */}
      <div>
          <input
            className=" w-46 shadow appearance-none border my-6 pl-12 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none
             focus:shadow-outline   focus:border-orange-600 focus:ring-1 focus:ring-orange-600 "
           
            type="text"
            placeholder="Artist"
           
            value={artist}
            onChange={handlArtist}
          />
      </div>
       
        
        {/* for buttom */}
        <div>
    <button onClick={handleApi} className='bg-orange-600 text-white mt-4 mx-16 px-12 py-2 hover:bg-orange-300 hover:text-orange-800  rounded'>Save</button>
        </div>
       
    </form>
    </div>


  )
}

export default Manager