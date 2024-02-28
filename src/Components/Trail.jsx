import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

function Trail() {
  const [formData, setFormData] = useState({
    event_name: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    entry_fee: '',
    photo: null,
    artist: [],
    sponser: [],
  });
  const [artistList, setArtistList] = useState([]); // State to store artist list
  const token = localStorage.getItem('accessToken'); 
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`, // Use the Bearer token here
      'Content-Type': 'multipart/form-data'
    }
  };

  useEffect(() => {
    // Fetch artist list from the API
    axios.get('/artist/list/', config)
      .then(response => {
        setArtistList(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching artist list:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = new FormData();
    for (const key in formData) {
      if (key === 'photo') {
        postData.append('photo', formData.photo);
      } else {
        postData.append(key, formData[key]);
      }
    }
    axios.post('event/create/', postData, config)
      .then((response) => {
        console.log('Success:', response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <input
        type="text"
        name="event_name"
        placeholder="Event Name"
        value={formData.event_name}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      />
      <input
        type="text"
        name="capacity"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      />
      <input
        type="text"
        name="entry_fee"
        placeholder="Entry Fee"
        value={formData.entry_fee}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      />
      <input
        type="file"
        name="photo"
        onChange={handleFileChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      />
     <select
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      >
        <option value="">Select Artist</option>
        {artistList.map(artist => (
          <option key={artist.id} value={artist.id}>{artist.user.name}</option>
        ))}
      </select>
      {/* <select
        name="sponser"
        value={formData.sponser}
        onChange={handleChange}
        className="w-full border rounded-md px-4 py-2 mb-4"
      >
        
      </select> */}
      <div className='relative mb-4   mx-12 '>
        <label className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text '>Sponsors </label>
        <input
        className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
          type="text"
          name="sponser"
          value={formData.sponser}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
}

export default Trail;