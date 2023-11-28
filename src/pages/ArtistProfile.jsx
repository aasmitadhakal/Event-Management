import { useState,useEffect } from "react"
import axios from 'axios';
import {MdEmail} from 'react-icons/md'
 import {AiTwotoneEdit} from 'react-icons/ai'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
function ArtistProfile() {
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id:'',
        name: '',
        username: '',
        email: '',
        photo:'',
        contact:'',
        ward:'',
        gender:'',
        province:'',
        district:'',
        municipality:'',
        description:'',
        performed_in:'',
        type_of_the_performer:'',
        isUser: false,
        isAdmin: false,
        isArtist: false
      });
      const handleEditClick = (event) => {
        event.preventDefault();
        setIsEditing(true);
      };
      const handlePhotoChange = (event) => {
        const photo = event.target.files[0];
        setFormData(prevData => ({
          ...prevData,
          photo: photo,
        }));
      };
      
      
      useEffect(() => {
        // const config = {
        //   headers: {
        //     'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
        //     'Content-Type': 'application/json'
        //   }
        // };
        const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

        const config = {
          headers: {
              'Authorization': `Bearer ${token}`, // Use the Bearer token here
              'Content-Type': 'application/json'
          }
      }
    
        axios.get('https://ayushkandel.pythonanywhere.com/user-profile/', config)
          .then(response => {
            const data = response.data;
            setFormData({
              id: data.id,
              name: data.name,
              photo: data.artist.photo,
              username: data.username,
              district: data.artist.district,
              email: data.email,
              contact: data.artist.contact,
              province:data.artist.province,
              gender: data.artist.gender,
              performed_in: data.artist.performed_in,
              type_of_the_performer: data.artist.type_of_the_performer,
              description:data.artist.description,
              ward:data.artist.ward,
              municipality:data.artist.municipality,
              isUser: data.is_user,
              isAdmin: data.is_admin,
              isArtist: data.is_artist
            });
            setIsEditing(false);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [username, userPassword]);
      const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
     
      const handleSaveClick = (e) => {
        e.preventDefault()
        setIsEditing(false);
        const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

        const config = {
          headers: {
              'Authorization': `Bearer ${token}`, // Use the Bearer token here
              'Content-Type': 'application/json'
          }
      }
        const formDataToSend = new FormData();
        formDataToSend.append('photo', formData.photo);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('contact',formData.contact);
        formDataToSend.append('gender', formData.gender); 
        formDataToSend.append('municipality', formData.municipality); 
        formDataToSend.append('district', formData.district);
        formDataToSend.append('description', formData.description);  
        axios
      .patch(`https://ayushkandel.pythonanywhere.com/user-profile-update/${formData.id}/`, formDataToSend, config)
      .then((response) => {
        // Handle the response if needed
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
      };
      const handleUploadClick = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
          fileInput.click();
        }
      };
      
  
  return (
    <>
    <div>
    
    <div className=" bg-transparent w-full  bg-gray-300 ">
          <form className="bg-white shadow-xl mx-24 ">
            <div className="mb-2 text-gray-800 font-semibold  ">
             {/* for upper section */}
              <div className=" grid grid-cols-3 mx-36">
              <div className=" flex flex-col relative rounded-full overflow-clip -z-5 w-32 h-32 mt-4">
                <a>
                  <img
                    src={'https://ayushkandel.pythonanywhere.com' + formData.photo}
                    alt={formData.photo}
                    className="h-44 w-64 rounded-full z-0 object-cover"
                  />
                </a>
                <span
                  onClick={handleUploadClick}
                  className="cursor-pointer absolute bottom-0 h-1/3 transition-all duration-200 ease-in-out  text-center p-2 w-full bg-white text-purple-700 opacity-0 hover:opacity-90"
                >
                  Upload
                </span>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="mt-4 ">
              <div className="text-xl font-bold flex justify-center items-center ">{formData.name}</div>
                {/* <div className="flex justify-center items-center text-slate-500 pl-4  ">{formData.username}<MdVerified className="text-blue-600   "/></div> */}
                <div className="flex justify-center items-center text-slate-500 pl-10 my-1"><IoLocationSharp className="text-purple-400 text-lg mr-2" />{formData.district},{formData.municipality}</div>
                <div className="flex justify-center items-center text-slate-500 my-1 "><BsFillTelephoneFill className="text-purple-400 text-lg mr-2"/>{formData.contact}</div>
                <div className="flex justify-center items-center text-slate-500 pl-10 "><MdEmail className="text-purple-400 text-lg mr-2" />{formData.email}</div>
                
              </div>
              </div>
             
            </div>
            {/* for editing part */}
            <div className="mt-4 flex mx-36 gap-2">
                  {/* for icons */}
                  <div className="border rounded px-1 py-2 border-purple-400">
                    <AiTwotoneEdit  onClick={handleEditClick} className="text-purple-400"/>
                  </div>
                  {/* for button */}
                  {isEditing ? (
              <div className=""><button
              onClick={handleSaveClick}
              className="bg-white text-purple-400 border rounded px-2 py-1 border-purple-400"
            >
              Save changes
            </button></div>
        
      ) : (
        <div className="">
          <button
          onClick={handleEditClick}
          className=" bg-white text-purple-400 border rounded px-2 py-1 border-purple-400"
        >
          Edit Detail
        </button>
        </div>
      )}
                </div>     
                <div className="text-medium flex justify-center items-center  border-purple-500 font-serif text-gray-600 text-xl my-4">Account Information</div>
            <div className=" grid grid-cols-2 mt-12 mx-36">
              {/* for half divison */}
              <div>
              
              {/* for name */}
              <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="Name"
                //   onChange={handleFileUpload}
                >
                  Name :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3 leading-tight "
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />

              </div>
                {/* for username */}

                <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="username"
                //   onChange={handleFileUpload}
                >
                 UserName :
                </label>
                <input
                  className=" text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3  leading-tight "
                  type="text"
                  name="username"
                  value={formData.username}  
                  onChange={handleChange}
                 
                  readOnly={!isEditing}
                />

              </div>
               {/* for contact */}

               <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="contact"
                //   onChange={handleFileUpload}
                >
                 contact :
                </label>
                <input
                  className=" text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3  leading-tight "
                  type="number"
                  name="contact"
                  value={formData.contact}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />

              </div>
              {/* for gender */}
            <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="gender"
                //   onChange={handleFileUpload}
                >
                 Gender :
                </label>
                <input
                  className=" text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3  leading-tight "
                  type="text"
                  name="gender"
                  value={formData.gender}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />

           </div>
           {/* for email */}
           <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="Name"
                //   onChange={handleFileUpload}
                >
                  Email :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3  leading-tight "
                  type="text"
                  name="email"
                  value={formData.email}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={true}
                />

              </div>
                         {/* for province */}
                         <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="province"
                //   onChange={handleFileUpload}
                >
                  Province :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3 leading-tight "
                  type="text"
                  name="province"
                  placeholder="province"
                  value={formData.province}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />

              </div>
             
             
                
                 
              </div>
              {/* for half division */}
              <div>
              {/* <div className="text-medium font-serif text-gray-600 text-lg  my-4">Account Information</div> */}
                 
            {/* for district */}
            <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="district"
                //   onChange={handleFileUpload}
                >
                  District :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3  leading-tight "
                  type="text"
                  name="district"
                  value={formData.district}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={true}
                />

              </div>
               {/* for municipality */}
               <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="municipality"
                //   onChange={handleFileUpload}
                >
                  Municipality :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded  py-2 px-3  leading-tight "
                  type="text"
                  name="municipality"
                  value={formData.municipality}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={true}
                />
              </div>
              {/* for descrition */}
            <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="description"
                //   onChange={handleFileUpload}
                >
                  Description :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded py-2 px-3 leading-tight "
                  type="text"
                  name="description"
                  placeholder="description"
                  value={formData.description}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />

              </div>
    {/* for type_of_the_performer */}
                   {/* for ward */}
                   <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="type_of_the_performer"
               
                >
                  Type_of_the_performer :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded  py-2  leading-tight "
                  type="text"
                  name="type_of_the_performer"
                  placeholder="type_of_the_performer"
                  value={formData.type_of_the_performer}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>
              {/* for performed_in */}
              <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="performed_in"
               
                >
                  Performed_in :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded  py-2 px-3 leading-tight "
                  type="text"
                  name="performed_in"
                  placeholder="performed_in"
                  value={formData.performed_in}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>
               {/* for ward */}
               <div className="   mb-4 text-left ">
                <label
                  className=" text-gray-500 text-sm font-medium mb-2"
                  htmlFor="ward"
                //   onChange={handleFileUpload}
                >
                  Ward :
                </label>
                <input
                  className="  text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3 leading-tight "
                  type="text"
                  name="ward"
                  placeholder="ward"
                  value={formData.ward}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>
              </div>
            </div>

            
 
          </form>
        </div>


    </div>
    </>
  )
}

export default ArtistProfile

{/* <tbody>
<tr>
  <td>{apiData.artist.contact}</td>
  <td><img src={apiData.artist.photo} alt="Artist Photo"></img></td>
  <td>{apiData.artist.user.name}</td>
</tr>
<tr>
  <td>{apiData.normaluser.contact}</td>
  <td>
    <img src={apiData.normaluser.photo} alt="Normal User Photo" />
  </td>
  <td>{apiData.normaluser.gender}</td>
</tr>
</tbody> */}