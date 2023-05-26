import React, { useState } from 'react'
import {RxCross1} from 'react-icons/rx'
import { ToastContainer } from 'react-toastify';
import notify from '../utlis/notifier'

export default function UserForm({setHasaccount}) {
  
  const[user,setUser]=useState("");
  const[photo,setPhoto]=useState("");
  const[contact,setContact]=useState("");
  const[gender,setGender]=useState("");
  const[district,setDistrict]=useState("");
  const[municipality,setMunicipality]=useState("");
  const[provinve,setProvince]=useState("");
  const[ward,setWard]=useState("");

  const handleuser =(e)=>{
    setUser(e.target.value);
  }
  const handlephoto =(e)=>{
    setPhoto(e.target.value);
  }
  const handlecontact =(e)=>{
    setContact(e.target.value);
  }
  const handlegender =(e)=>{
    setGender(e.target.value);
  }
  const handledistrict =(e)=>{
    setDistrict(e.target.value);
  }
  const handlemunicipality =(e)=>{
    setMunicipality(e.target.value);
  }
  const handleprovince =(e)=>{
    setProvince(e.target.value);
  }
  const handleward =(e)=>{
    setWard(e.target.value);
  }
  const handleApi =(e)=>{
  e.preventDefault();
  if(validate ()){

  }
  }
  const validate = ()=>{
    let result = true;
    if(user === ''||user ===null){
      notify("error", "Please enter your name");
    }
    return result
  }
  return (
    <>
   <div className=' w-screen h-screen flex justify-center items-center'>
     <div className='  mx-96 '>
        <form className=' border pl-2  bg-white shadow-md rounded'>
        <div className='text-3xl mx-52 mt-4 mb-4 font-bold text-purple-600 '>User form</div>
        <div  className='grid grid-cols-2 gap-4'>
        <div className='pl-8'>
            {/* for User */}
      <div className='relative'>
      <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Text</label>
          <input
            className=" mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors"
            id="user"
            type="text"
            name="user"
            value={user}
            onChange={handleuser}
          />
      </div>
        {/* for photo */}
        <div className='relative'>
        <label for="photo" class="absolute left-0 top-1 text-gray-600 cursor-text ">Photo</label>
          <input
            className="mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="photo"
            type="text"
           
            name="photo"
            value={photo}
            onChange={handlephoto}
          />
      </div >
        {/* for contact*/}
        <div className='relative'>
        <label for="contact" class="absolute left-0 top-1 text-gray-600 cursor-text ">Contact</label>
          <input
            className=" mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="contact"
            type="text"
            
            name="Contact"
            value={contact}
            onChange={handlecontact}
          />
      </div>
       {/* for Gender */}
       <div className='relative'>
       <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Gender</label>
          <input
            className="mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors"
            id="gender"
            type="text"
           
            name="gender"
            value={gender}
            onChange={handlegender}
          />
      </div>
     
      
      </div>
      <div>
        {/* for district */}
        <div className='relative'>
        <label for="photo" class="absolute left-0 top-1 text-gray-600 cursor-text ">District</label>
          <input
            className="mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="district"
            type="text"
          
            name="district"
            value={district}
            onChange={handledistrict}
          />
      </div>
        {/* for municipality */}
        <div className='relative'>
        <label for="municipality" class="absolute left-0 top-1 text-gray-600 cursor-text ">Municipality</label>
          <input
            className=" mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="municipality"
            type="text"
            name="Municipality"
            value={municipality}
            onChange={handlemunicipality}
          />
      </div>
        {/* for province*/}
        <div className='relative'>
        <label for="province" class="absolute left-0 top-1 text-gray-600 cursor-text ">Province</label>
          <input
            className=" mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="province"
            type="text"
            name="province"
            value={provinve}
            onChange={handleprovince}
          />
      </div>
       {/* for ward */}
        <div className='relative'>
        <label for="ward" class="absolute left-0 top-1 text-gray-600 cursor-text ">Ward</label>
          <input
            className=" mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="ward"
            type="text"
           
            name="ward"
            value={ward}
            onChange={handleward}
          />
      </div>
      </div>
      </div>
             {/* for button */}
             <div>
              <button className=' mt-4 mx-44 px-20 py-2  hover:text-white hover:from-purple-400 hover:to-blue-400 transition-all bg-gradient-to-r from-purple-600 to-blue-300 text-white rounded mb-4'
              onClick={handleApi}
              >Submit</button>
             </div>
        </form>
      </div>
      <ToastContainer />
      </div>
    </>
  )
}

