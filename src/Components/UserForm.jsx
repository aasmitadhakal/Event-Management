import React, { useState ,useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
 import notify from '../utlis/notifier'
import axios from '../api/axios';
import img9 from '../assets/img9.png'
import { useNavigate } from 'react-router-dom';
export default function UserForm({setHasaccount}) {
  const navigate = useNavigate()
  const[user,setUser]=useState("");
  const[photo,setPhoto]=useState("");
  const[contact,setContact]=useState("");
  const[gender,setGender]=useState("Male");
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
      const formData = new FormData();
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
      navigate('/user',{replace:true})
    })
    .catch((error) => {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat(); 
         errorMessages.forEach(errorMessage => {
         notify("error",errorMessage)
        });
      } else {
        console.log("Error:", error);
      }
    });
  }
  // const validate = ()=>{
  //   let result = true;
  //   if(user === ''||user ===null){
  //     notify("error", "Please enter your name");
  //   }
  //   return result
  // }
  return (
    <>
    <div className=' '>
   <div className=' grid md:grid-cols-2 grid-cols-1  md:mx-24 mx-12 shadow-2xl mt-12 my-8 round '>
    <div className=' '>
      <img src = {img9} alt='' className=''></img>
    </div>
     <div className=' '>
        <form className=' bg-white rounded md:mx-0 mx-8'>
        <div className='text-2xl  mt-12 mb-8 font-medium text-purple-600 '>User Registratons form</div>
        <div  className='grid md:grid-cols-2  grid-cols-1  '>
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
       <select
          value={gender}
          onChange={handlegender}
          className='flex pt-6 text-gray-800 justify-center items-center border-b  py-2 px-10 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'>
            <option className='text-gray-400  ' value='Male' >Male</option>
            <option className='text-gray-400 ' value='Female' >Female</option>
        </select>
     
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
              <button className='  md:mx-44 mx-4 px-12 md:px-28 py-2 mb-8 hover:text-white hover:from-purple-400 hover:to-blue-400 transition-all bg-gradient-to-r from-purple-600 to-blue-300 text-white rounded '
              onClick={handleApi}
              >Submit</button>
             </div>
        </form>
      </div>
      <ToastContainer />
      </div>
      </div>
    </>
  )
}

