import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';
import img9 from '../assets/img9.png'
export default function ArtistForm({setHasaccount}) {
  const navigate = useNavigate();
  const[user,setUser]=useState('')
  const[district,setDistrict]=useState('')
  const[municipality,setMunicipality]=useState('')
  const[contact,setContact]=useState('')
  const[gender,setGender]=useState('Male')
  const[province,setProvince]=useState('')
  const[ward,setWard]=useState('')
  const[type_of_the_performer,setTypeofPerformer]=useState('')
  const[performed_in,setPerformedIn]=useState('')
  const[description,setDescription]=useState('')
  const[is_available,setIsavailable]=useState(false)
  const[manager,setManager]=useState(false)
  const[photo,setPhoto]=useState('')
  const handlePhoto =(e)=>{
    setPhoto(e.target.files[0])
  }
  const handleContact =(e)=>{
    setContact(e.target.value)
  }
  const handleGender =(e)=>{
    setGender(e.target.value)
  }
  const handleProvince =(e)=>{
    setProvince(e.target.value)
  }
  const handleDistrict =(e)=>{
    setDistrict(e.target.value)
  }
  const handleMunicipality=(e)=>{
    setMunicipality(e.target.value)
  }
  const handleWard=(e)=>{
    setWard(e.target.value)
  }
  const handleTypeofPerformer=(e)=>{
    setTypeofPerformer(e.target.value)
  }
  const handlePerformedIn=(e)=>{
    setPerformedIn(e.target.value)
  }
  const handleDescription=(e)=>{
    setDescription(e.target.value)
  }
  const handleIsAvailable=(e)=>{
    setIsavailable(e.target.checked)
  }
  const handleManager=(e)=>{
    setManager(e.target.checked)
  } 
  const handleUser=(e)=>{
    setUser(e.target.value)
  } 
  //for automatic value on uid
  useEffect(()=>{
    setUser(localStorage.getItem("uid"));
 },[])
  const formData = new FormData();
  console.log(photo);
  formData.append('contact', contact);
  formData.append('gender', gender);
  formData.append('province', province);
  formData.append('district', district);
  formData.append('municipality', municipality);
  formData.append('ward', ward);
  formData.append('user', user);
  formData.append('photo', photo);
  formData.append('type_of_the_performer', type_of_the_performer);
  formData.append('performed_in', performed_in);
  formData.append('description',description );
  formData.append('is_available',is_available );
  formData.append('manager',manager );
  console.log(formData);


  const handleApi = (e) => {
    e.preventDefault();
    axios.post("https://ayushkandel.pythonanywhere.com/artist/create/", formData )
      .then((response) => {
        console.log(e.target.file)
        console.log(response.data);
        console.log('Data posted successfully!', response.data);
        navigate('/profiles',{replace:true})
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
  };
    
   
  return (
    <>
   <div className=' '> 
     <div className=' grid md:grid-cols-2 grid-cols-1 md:gap-8 mx-8 md:mx-12 shadow-2xl mt-4 my-2 round '>
      <div>
        <img src={img9} alt='' className=''></img>
      </div>
      <div>
        <form  onSubmit={handleApi} className='p-4  bg-white  '>
        <div className='text-2xl md:mx-12 my-4 font-medium text-purple-400 '>Artist Registration Form</div>
        <div  className='grid md:grid-cols-2 grid-cols-1 md:gap-8'>
        <div className='md:pl-8 pl-2'>
            {/* for User */}
      <div className='relative'>
      <label for="user" class="absolute left-0 top-1 text-gray-600 cursor-text  ">User</label>
          <input
            className="mb-4 pt-6 flex justify-center items-center py-1 border-b  focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  " autoComplete='off'
            id="user"
            type="text"
            name="user"
            value={user}
            onChange={handleUser}
          />
      </div>
        {/* for photo */}
        <div className='relative'>
        {/* <label for="photo" class="absolute left-0 top-1 text-gray-600 cursor-text ">photo</label> */}
          <input
            className="mt-1 sm:text-sm border-gray-300 rounded-md mb-4 pt-6 flex justify-center items-center py-1  transition-colors  "
            id="photo"
            type="file"
            name="photo"
            onChange={handlePhoto}
            accept="image/*"
          />
      </div>
        {/* for contact*/}
        <div className='relative'>
        <label for="user" class="absolute left-0 top-1 text-gray-600 cursor-text  ">Contact</label>
      
          <input
            className="mb-4 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="contact"
            type="text"
            value={contact}
            onChange={handleContact}
            name="Contact"
          />
      </div>
       {/* for Gender */}
       
      <div className='relative  '>
       <label for="gender" className="absolute left-0 top-1 text-gray-600 cursor-text ">Gender</label>
       <select
          value={gender}
          onChange={handleGender}
          className='flex pt-6 text-gray-800 justify-center items-center border-b mb-2 py-2 px-10 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'>
            <option className='text-gray-400  ' value='Male' >Male</option>
            <option className='text-gray-400 ' value='Female' >Female</option>
        </select>
     
      </div>

       {/* type of performer */}
       <div className='relative'>
       <label for="performer" class="absolute left-0 top-1 text-gray-600 cursor-text ">Performer</label>
          <input
            className="pt-6 mb-4 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="performer"
            type="text"
            name="performer"
            value={type_of_the_performer}
            onChange={handleTypeofPerformer}
          />
      </div>
       {/* for performed in */}
       <div className='relative'>
       <label for="performedin" class="absolute left-0 top-1 text-gray-600 cursor-text ">Performed In</label>
          <input
            className="pt-6 flex  mb-4 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="performed in"
            type="text"
            name="performed in"
            value={performed_in}
            onChange={handlePerformedIn}
          />
      </div>
      </div>
      <div className='md:ml-8 ml-2'>
        {/* for district */}
        <div className='relative'>
        <label for="district" class="absolute left-0 top-1 text-gray-600 cursor-text ">District</label>
          <input
            className="pt-6 flex  mb-4 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="district"
            type="text"
            name="district"
            value={district}
            onChange={handleDistrict}
          />
      </div>
        {/* for municipality */}
        <div className='relative'>
        <label for="municipality" class="absolute left-0 top-1 text-gray-600 cursor-text ">Municiplaity</label>
          <input
            className="pt-6 mb-4 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="municipality"
            type="text"
            value={municipality}
            onChange={handleMunicipality}
            name="Municipality"
          />
      </div>
        {/* for province*/}
        <div className='relative'>
        <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Province</label>
          <input
            className="pt-6 mb-4  flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="province"
            type="text"
            name="province"
            value={province}
            onChange={handleProvince}
          />
      </div>
       {/* for ward */}
        <div className='relative'>
        <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Ward</label>
          <input
            className="pt-6 mb-4 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="ward"
            type="number"
            name="ward"
            value={ward}
            onChange={handleWard}
          />
      </div>
       {/* for description */}
       <div className='relative'>
       <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Description</label>
          <input
            className="pt-6 mb-4 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors    "
            id="descriptions"
            type="text"
            value={description}
            onChange={handleDescription}
            name="description"
          />
      </div>
        {/* for manager */}
        <div className ='text-gray-500 mt-4 '>
            <label>Manager:</label>
            <input type ='radio'
             checked={manager}
         onChange={handleManager}
            />
          
             </div>
             {/* for Isavailable */}
        <div className ='text-gray-500 mt-4 '>
            <label>Is Available:</label>
            <input type ='radio'
             checked={is_available}
         onChange={handleIsAvailable}
            />
          
             </div>
      </div>
      </div>
             <div>
              <button className='  mt-4 md:mx-44 mx-12 px-12 md:px-24 py-2  hover:text-white hover:from-purple-400 hover:to-blue-400 transition-all bg-gradient-to-r from-purple-600 to-blue-300 text-white rounded mb-4'
           type="submit"
              >Submit</button>
             </div>
        </form>
        </div>
      </div>
      <ToastContainer/>
      </div>
    </>
  )
}






