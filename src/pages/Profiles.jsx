import { useState,useEffect } from "react"
import axios from 'axios';
import {MdVerified} from 'react-icons/md'
import {AiTwotoneEdit} from 'react-icons/ai'
 import img from '../assets/avatar.png'
function Profiles() {
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        isUser: false,
        isAdmin: false,
        isArtist: false
      });
      const handleEditClick = (event) => {
        event.preventDefault();
        setIsEditing(true);
      };
      useEffect(() => {
        axios.get('https://ayushkandel.pythonanywhere.com/user-profile/',config)
          .then(response => {
            const data = response.data;
            setFormData({
              name: data.name,
              username: data.username,
              email: data.email,
              isUser: data.is_user,
              isAdmin: data.is_admin,
              isArtist: data.is_artist
            });
            setIsEditing(false);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
      const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
      const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'application/json'
        }
      };
      const handleSaveClick = (e) => {
        e.preventDefault()
        setIsEditing(false);
        
      };
    

  
  return (
    <>
    <div>

    <div className=" bg-transparent w-full  flex items-center justify-center p-3">
          <form className="bg-white shadow-lg rounded px-8 pt-3 pb-8 mb-4   ">
            <div className="mb-2 text-gray-800 font-semibold text-center mx-auto">
              <h3 className=" text-purple-400 py-2 block text-gray-700  font-bold mb-2 text text-xl">
               My Profile
              </h3>
              <div className="flex justify-center w-full">
                <div className=" flex flex-col relative rounded-full overflow-clip -z-5 w-32 h-32 ">
                  <a >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full rounded-full z-0 object-cover"
                    />
                  </a>
                  <span
                    // onClick={handleUploadClick}
                    className="cursor-pointer absolute bottom-0 h-1/3 transition-all duration-200 ease-in-out  text-center p-2 w-full bg-purple-400 text-white opacity-0 hover:opacity-90"
                  >
                    <input
                      className="hidden w-0"
                      type="file"
                      accept="image/*"
                    
                    //   
                    />
                    Upload
                  </span>
                </div>
              </div>
              {/* for name and username */}
              <div className="my-4 border-b-2 pb-4 ">
                <div className="text-medium font-bold flex justify-center items-center ">{formData.name}<MdVerified className="text-blue-600   "/></div>
                <div className="flex justify-center items-center text-slate-500 gap-2 ">{formData.username}</div>
                {/* for edit button */}
                <div className="mt-2 flex items-center justify-center gap-2">
                  {/* for icons */}
                  <div className="border rounded px-1 py-2 border-purple-400">
                    <AiTwotoneEdit  onClick={handleEditClick} className="text-purple-400"/>
                  </div>
                  {/* for button */}
                  <div>
                    <button className=" bg-white text-purple-400 border rounded px-2 py-1 border-purple-400 ">View Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>
             {/* for text */}



              
            {/* for text */}
            <div className="flex justify-center items-center font-medium text-slate-700">Account Information</div>
            <div className=" w-full justify-center ml-12">
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
                  className=" ml-8 text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3 leading-tight "
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
                  htmlFor="Name"
                //   onChange={handleFileUpload}
                >
                 UserName :
                </label>
                <input
                  className=" text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3  leading-tight "
                  type="text"
                  name="Username"
                  value={formData.username}  
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
                  className=" ml-8 text-gray-500 text-sm font-medium  outline-none appearance-none  rounded w-64 py-2 px-3  leading-tight "
                  type="text"
                  name="email"
                  value={formData.email}  
                  onChange={handleChange}
                  // disabled={!isEditing}
                  readOnly={true}
                />

              </div>

          
            </div>

            
             {isEditing ? (
        <button
          onClick={handleSaveClick}
          className="hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 mx-24  px-8 bg-purple-500 text-white rounded-2xl py-2 border-2"
        >
          Save changes
        </button>
      ) : (
        <button
          onClick={handleEditClick}
          className="hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 mx-24  px-20 bg-purple-500 text-white rounded-2xl py-2 border-2 "
        >
          Edits
        </button>
      )}
          </form>
        </div>


    </div>
    </>
  )
}

export default Profiles