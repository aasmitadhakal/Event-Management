import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
   email:'',
    photo: null,
   
    
  });
  const [editable, setEditable] = useState(false);
  const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

  const config = {
    headers: {
        'Authorization': `Bearer ${token}`, // Use the Bearer token here
        'Content-Type': 'application/json'
    }
}
const handleEditClick = () => {
    setEditable(true); // Enable editing
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('https://ayushkandel.pythonanywhere.com/user-profile/', config);
      setFormData(response.data); // Assuming the response contains the necessary data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const data = new FormData();
      data.append('id', formData.id);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('photo', formData.photo); // Make sure formData.photo contains the file
  
      const response = await axios.put('https://ayushkandel.pythonanywhere.com/login-user-profile-update/artist/', data, config);
      console.log('Updated successfully:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error
    }
  };

  return (
    <div>
      <form>
        {/* Your form fields */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={!editable} // Disable input if not in edit mode
        />
         <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editable} // Disable input if not in edit mode
        />
         <input
          type="file"
          name='photo'
          accept="image/*" // Allow only image files
          onChange={handlePhotoChange}
          disabled={!editable}
        />
        {/* Other input fields */}
        {!editable && (
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        )}
        {editable && (
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default YourComponent;