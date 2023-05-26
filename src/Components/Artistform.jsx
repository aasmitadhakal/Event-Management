import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {RxCross1} from 'react-icons/rx'
export default function ArtistForm({setHasaccount}) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const handleApi = (e) => {
    e.preventDefault();
    
      if(selectedOption ==='option1'){
        navigate("/mform", { replace: true });
      }
     
        // notify("sucess","sucessfully login");
   };
  return (
    <>
   <div className=' music h-screen flex justify-center items-center  bg-gradient-to-r from-purple-400 to-blue-200'> 
     <div className='  mx-96   '>
        <form className='p-4  bg-white border  shadow-md rounded'>
        <div className='text-2xl mx-52 mt-4 mb-4 font-bold text-purple-400 '>Artistform</div>
        <div  className='grid grid-cols-2 gap-8'>
        <div className='pl-8'>
            {/* for User */}
      <div className='relative'>
      <label for="user" class="absolute left-0 top-1 text-gray-600 cursor-text  ">User</label>
          <input
            className="mb-2 pt-6 flex justify-center items-center py-1 border-b  focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  " autoComplete='off'
            id="user"
            type="text"
            name="user"
          />
      </div>
        {/* for photo */}
        <div className='relative'>
        {/* <label for="photo" class="absolute left-0 top-1 text-gray-600 cursor-text ">photo</label> */}
          <input
            className="mb-2 pt-6 flex justify-center items-center py-1 focus:outline-none  transition-colors  "
            id="photo"
            type="file"
            name="photo"
          />
      </div>
        {/* for contact*/}
        <div className='relative'>
        <label for="user" class="absolute left-0 top-1 text-gray-600 cursor-text  ">Contact</label>
      
          <input
            className="mb-2 pt-6 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="contact"
            type="text"
           
            name="Contact"
          />
      </div>
       {/* for Gender */}
       <div className='relative'>
       <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Gender</label>
          <input
            className="pt-6 mb-2 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="gender"
            type="text"
          
            name="gender"
          />
      </div>
       {/* type of performer */}
       <div className='relative'>
       <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Performer</label>
          <input
            className="pt-6 mb-2 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="performer"
            type="text"
            name="performer"
          />
      </div>
       {/* for performed in */}
       <div className='relative'>
       <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Performed In</label>
          <input
            className="pt-6 flex  mb-2 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="performed in"
            type="text"
            name="performed in"
          />
      </div>
      </div>
      <div className='ml-8'>
        {/* for district */}
        <div className='relative'>
        <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">District</label>
          <input
            className="pt-6 flex  mb-2 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors "
            id="district"
            type="text"
            name="district"
          />
      </div>
        {/* for municipality */}
        <div className='relative'>
        <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Municiplaity</label>
          <input
            className="pt-6 mb-2 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="municipality"
            type="text"
          
            name="Municipality"
          />
      </div>
        {/* for province*/}
        <div className='relative'>
        <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Province</label>
          <input
            className="pt-6 mb-2  flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="province"
            type="text"
            name="province"
          />
      </div>
       {/* for ward */}
        <div className='relative'>
        <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Ward</label>
          <input
            className="pt-6 mb-2 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors  "
            id="ward"
            type="text"
            name="ward"
          />
      </div>
       {/* for description */}
       <div className='relative'>
       <label for="gender" class="absolute left-0 top-1 text-gray-600 cursor-text ">Description</label>
          <input
            className="pt-6 mb-2 flex justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors    "
            id="descriptions"
            type="text"
           
            name="description"
          />
      </div>
        {/* for manager */}
        <div className ='text-gray-500 mt-8 '>
            <label>Manager:</label>
            <input type ='radio'
             value="option1"
            checked={selectedOption === "option1"}
             onChange={() => setSelectedOption("option1")}
            />
          
             </div>
      
      
      </div>
      </div>
             <div>
              <button className='  mt-4 mx-44 px-20 py-2  hover:text-white hover:from-purple-400 hover:to-blue-400 transition-all bg-gradient-to-r from-purple-600 to-blue-300 text-white rounded mb-4'
              onClick={handleApi}
              >Submit</button>
             </div>
        </form>
      </div>
      </div>
    </>
  )
}






