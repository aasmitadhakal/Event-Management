import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Profile() {
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
    //   const handleSubmit = () => {
    //     axios.put('your-update-api-endpoint', formData)
    //       .then(response => {
    //         console.log('Data updated successfully:', response.data);
    //         setIsEditMode(false);
    //       })
    //       .catch(error => {
    //         console.error('Error updating data:', error);
    //       });
    //   };
       
  return (
    <div>
        <form>
        {/* {isEditMode ? (
  <input type="text" value={formData.name} name="name" onChange={handleChange} />
) : (
  <span>{formData.name}</span>
)} */}
         <input type="text"
          placeholder='name'
           value={formData.name} 
           onChange={handleChange}
           readOnly={!isEdit}
           />
        <input type="text" placeholder='username' value={formData.username} onChange={handleChange} />
        <input type="text" placeholder='email'value={formData.email} onChange={handleChange} /> 
        {/* <button onClick={handleEdit}>Edit</button> */}
        {/* {isEditMode && (
  <button onClick={handleSubmit}>Update</button>
)} */}
<div   onClick={() => setIsEdit(!isEdit)}><button>edit</button></div>
        </form>
    </div>
  )
}

export default Profile