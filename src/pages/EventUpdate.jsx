import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
function EventUpdate() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    artist: '',
    sponser: '',
    event_name: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    photo: null,
    entry_fee: ''
  });
 
  const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage
  const { id } = useParams();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`, // Use the Bearer token here
      'Content-Type': 'multipart/form-data'
    }
  }

  useEffect(() => {
   

    // Fetch event data by ID
    axios.get(`/event/details/${id}/`)
      .then(response => {
        const eventDataFromAPI = response.data;
        setEventData(eventDataFromAPI);
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhoto = (e) => {
    setEventData(prevState => ({
      ...prevState,
      photo: e.target.files[0]
    }));
  };

  const handleAPI = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.put(`/event/update/${id}/`, formData, config)
      .then((result) => {
        console.log(result.data);
        notify('success', 'Data updated successfully');
        navigate('/eventlist', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='mt-18 flex justify-center items-center p-12'>
      <form className='p-6 border bg-white shadow-md rounded'>
        <div className='mt-4 text-2xl mb-8 font-medium text-purple-400 flex justify-center items-center'>
          Update Event Data
        </div>
        <div className='grid grid-cols-2'>
          {/* Form inputs */}
          <div>
            {/* artist */}
            <div className='relative mb-8 mx-12'>
              <label htmlFor='artist' className='absolute text-gray-600 cursor-text'>
                artist
              </label>
              <input
                className='flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer'
                autoComplete='off'
                id='artist'
                type='text'
                name='artist'
                value={eventData.artist}
                onChange={handleChange}
              />
            </div>
            {/* event_name */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='event_name' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                event_name
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='event_name'
                type='text'
                name='event_name'
                value={eventData.event_name}
                onChange={handleChange}
              />
            </div>
            {/* sponser */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='sponser' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                sponser
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='sponser'
                type='text'
                name='sponser'
                value={eventData.sponser}
                onChange={handleChange}
              />
            </div>
            {/* capacity */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='capacity' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                capacity
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='capacity'
                type='text'
                name='capacity'
                value={eventData.capacity}
                onChange={handleChange}
              />
            </div>
            {/* time */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='time' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                time
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='time'
                type='text'
                name='time'
                value={eventData.time}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* for half division */}
          <div>
            {/* location */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='location' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                location
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='location'
                type='text'
                name='location'
                value={eventData.location}
                onChange={handleChange}
              />
            </div>
            {/* date */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='date' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                date
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='date'
                type='date'
                name='date'
                value={eventData.date}
                onChange={handleChange}
              />
            </div>
            {/* for photo */}
            <div className='relative mx-10'>
              <label htmlFor='photo' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                Photo
              </label>
              <input
                className='mb-8 pt-6 flex justify-center items-center py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                id='photo'
                type='file'
                name='photo'
                onChange={handlePhoto}
                accept='image/*'
              />
            </div>
            {/* for entry_fee */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='district' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                entry_fee
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='entry_fee'
                type='text'
                name='entry_fee'
                value={eventData.entry_fee}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div>
          <button onClick={handleAPI} className='mx-64 bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4 px-20 py-2 rounded-2xl'>
            Update
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default EventUpdate;