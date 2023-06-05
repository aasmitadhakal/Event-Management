import React, { useState ,useEffect} from 'react'
import {RxCross1} from 'react-icons/rx'
import { ToastContainer } from 'react-toastify';
import notify from '../utlis/notifier'
import axios from 'axios';
import img2 from '../assets/img2.png'
export default function UserForm({setHasaccount}) {
  
  const[user,setUser]=useState("");
  const[photo,setPhoto]=useState("");
  const[contact,setContact]=useState("");
  const[gender,setGender]=useState("");
  const[district,setDistrict]=useState("");
  const[municipality,setMunicipality]=useState("");
  const[province,setProvince]=useState("");
  const[ward,setWard]=useState("");

  const handleuser =(e)=>{
    setUser(e.target.value);
  }
  const handlephoto =(e)=>{
  setPhoto(e.target.files[0])
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
  useEffect(()=>{
    setUser(localStorage.getItem("uid"));
  
 },[])
      const formData = new FormData;
      formData.append('contact', contact);
      formData.append('gender', gender);
      formData.append('province', province);
      formData.append('district', district);
      formData.append('municipality', municipality);
      formData.append('ward', ward);
      formData.append('user', user);
      formData.append('photo', photo);
    
  const handleApi =(e)=>{
  e.preventDefault();
  axios.post("https://ayushkandel.pythonanywhere.com/normal-user/create/", formData )
    .then((response) => {
      console.log(e.target.file)
      console.log(response.data);
      console.log('Data posted successfully!', response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
   <div className=' grid grid-cols-2 fixed gap-2 '>
    <div className=' '>
      <img src = {img2} className='w-2/3 h-screen mt-24 ml-12'></img>
    </div>
     <div className=' '>
        <form className='  pl-2  bg-white rounded'>
        <div className='text-2xl mx-40 mt-12 mb-8 font-medium text-purple-600 '>User Registratons form</div>
        <div  className='grid grid-cols-2 gap-12 p-2 '>
        <div className=''>
            {/* for User */}
      <div className='relative  '>
      <label for="gender" className=" absolute left-0 top-1 text-gray-600 cursor-text ">User</label>
          <input
            className=" mb-8 pt-6 flex justify-center items-center border-b py-2 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors"
            id="user"
            type="number"
            name="user"
            value={user}
            onChange={handleuser}
          />
      </div>
        {/* for photo */}
        <div className='relative  '>
        <label for="photo" className="absolute left-0 top-1 text-gray-600 cursor-text ">Photo</label>
          <input
            className="mb-8 pt-6 flex justify-center items-center py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="photo"
            type="file"
            name="photo"
            onChange={handlephoto}
            accept="image/*"
          />
      </div >
        {/* for contact*/}
        <div className='relative  '>
        <label for="contact" className="absolute left-0 top-1 text-gray-600 cursor-text ">Contact</label>
          <input
            className=" mb-8 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="contact"
            type="number"
            
            name="Contact"
            value={contact}
            onChange={handlecontact}
          />
      </div>
       {/* for Gender */}
       <div className='relative  '>
       <label for="gender" className="absolute left-0 top-1 text-gray-600 cursor-text ">Gender</label>
          <input
            className="mb-8 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors"
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
        <div className='relative  '>
        <label for="photo" className="absolute left-0 top-1 text-gray-600 cursor-text ">District</label>
          <input
            className="mb-8 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="district"
            type="text"
          
            name="district"
            value={district}
            onChange={handledistrict}
          />
      </div>
     
        {/* for municipality */}
        <div className='relative  '>
        <label for="municipality" className="absolute left-0 top-1 text-gray-600 cursor-text ">Municipality</label>
          <input
            className=" mb-8 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="municipality"
            type="text"
            name="Municipality"
            value={municipality}
            onChange={handlemunicipality}
          />
      </div>
        {/* for province*/}
        <div className='relative  '>
        <label for="province" className="absolute left-0 top-1 text-gray-600 cursor-text ">Province</label>
          <input
            className=" mb-8 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="province"
            type="text"
            name="province"
            value={province}
            onChange={handleprovince}
          />
      </div>
       {/* for ward */}
        <div className='relative '>
        <label for="ward" className="absolute left-0 top-1 text-gray-600 cursor-text ">Ward</label>
          <input
            className=" mb-8 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="ward"
            type="number"
           
            name="ward"
            value={ward}
            onChange={handleward}
          />
      </div>
      </div>
      </div>
             {/* for button */}
             <div>
              <button className='  mx-44 px-28 py-2  hover:text-white hover:from-purple-400 hover:to-blue-400 transition-all bg-gradient-to-r from-purple-600 to-blue-300 text-white rounded mb-8'
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

