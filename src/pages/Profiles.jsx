import { useState,useEffect } from "react"
import axios from 'axios';
 import img from '../assets/avatar.png'
function Profiles() {
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        isUser: false,
        isAdmin: false,
        isArtist: false
      });

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

  
  return (
    <>
    <div>

    <div className=" bg-transparent w-full  flex items-center justify-center p-3">
          <form className="bg-white shadow-lg rounded px-8 pt-3 pb-8 mb-4 md:w-1/3 lg:w-2/4 ">
            <div className="mb-2 text-gray-800 font-semibold text-center mx-auto">
              <h3 className="py-2 block text-gray-700  font-bold mb-2 text text-xl">
                Profile
              </h3>
              <div className="flex justify-center w-full">
                <div className=" flex flex-col relative rounded-full overflow-clip -z-5 w-32 h-32 bg-gray-500">
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
            </div>
            <div className=" w-full justify-center">
              {/* for name */}
              <div className="mb-4 text-left">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Name"
                //   onChange={handleFileUpload}
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}  
                  onChange={handleChange}
                 
                />

             

              </div>
                {/* for username */}

                <div className="mb-4 text-left">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="username"
                  value={formData.username}  
                  onChange={handleChange}
                 
                />
              </div>

              {/* for email */}
              <div className=" text-left">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  readOnly={true}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="email"
                  value={formData.email}  
                  onChange={handleChange}
                
                />
              </div>

          
            </div>

            {/* for button */}
            <div className="flex flex-col items-center justify-between">
              <button
                className="w-medium bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
            
              >
                Submit
              </button>
              <div
                className=" rounded cursor-pointer inline-block align-baseline font-bold text-sm text-blue hover:text-blue"
               
              >
               <button className="hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600  px-20 bg-purple-500 text-white rounded-2xl py-2 border-2">Edit Profile</button>
              </div>
            </div>
          </form>
        </div>


    </div>
    </>
  )
}

export default Profiles