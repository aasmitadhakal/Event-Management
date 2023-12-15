import React, { useState } from 'react';
import axios from '../api/axios';


const ArtistCreate = () => {
  const [formData, setFormData] = useState({
    id: '',
    content: '',
    updated_by: '',
    status: 'Draft',
    heading: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

  const config = {
    headers: {
        'Authorization': `Bearer ${token}`, // Use the Bearer token here
        'Content-Type': 'application/json'
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = '/content-management/create/'; // Replace with your API endpoint
      const response = await axios.post(apiUrl, formData,config);
      console.log('POST request successful:', response.data);
      // Handle success, update UI, etc.
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID:</label>
        <input type="text" name="id" value={formData.id} onChange={handleChange} />
      </div>
      <div>
        <label>Content:</label>
        <input type="text" name="content" value={formData.content} onChange={handleChange} />
      </div>
      <div>
        <label>Updated By:</label>
        <input type="text" name="updated_by" value={formData.updated_by} onChange={handleChange} />
      </div>
      <div>
        <label>Heading:</label>
        <input type="text" name="heading" value={formData.heading} onChange={handleChange} />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Draft">Draft</option>
          <option value="Publish">Publish</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ArtistCreate;