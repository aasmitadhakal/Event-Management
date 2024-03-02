
import React from 'react'
import { useState,useEffect } from 'react'
import axios from '../api/axios'
import Select from 'react-select';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';
function ArtistCreateEvent() {
    
   
   
  const [artistList, setArtistList] = useState([]); 
  const [sponserlist, setSponserlist] = useState([]); 
      const [formData, setFormData] = useState({
          event_name: '',
          date: '',
          time: '',
          location: '',
          capacity: '',
          entry_fee: '',
          photo:null,
          artist: [],
          sponser: [],
        
  });

  const token = localStorage.getItem('accessToken'); 
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`, // Use the Bearer token here
      'Content-Type': 'multipart/form-data'
    }
  };
      //for artist input field
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
      // for sponserlist from api
      useEffect(() => {
        // Fetch artist list from the API
        axios.get('/sponser/list/', config)
          .then(response => {
            setSponserlist(response.data.results);
          })
          .catch(error => {
            console.error('Error fetching artist list:', error);
          });
      }, []); 
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
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
            notify("success","Event Created successfully")
            // Clear the form fields after successful submission
      setFormData({
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
    
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    
    
  return (
    <div className='  mt-18 flex justify-center items-center p-12 '>
    <form onSubmit={handleSubmit} encType="multipart/form-data"
     className='   p-6 border bg-white shadow-md rounded'>
    <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Create Event</div>
    <div className='grid grid-cols-2 '>
      <div>
        {/* for eventname */}
        <div className='relative mb-8  mx-12  '>
        <label htmlFor="event_name" className="absolute   text-gray-600 cursor-text ">Heading</label>
        <input
        className="  flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" 
        id="event_name"
        type="text"
        name="event_name"
        value={formData.event_name}
        onChange={handleChange}
        />

        </div>
        {/* for date */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="date" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Date</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        />   
       
        </div>
       
        {/* for time */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="time" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Time</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="time"
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        />   
        
       
        </div>
        
        {/* for location */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="location" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Location</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        />   
        </div>
       
      </div>
    
      <div>
          {/* for capacity */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="capacity" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Capacity</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="capacity"
        type="text"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        />   
        </div>
          {/* for entryfeee */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="entry_fee" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Entry_Fee</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="entry_fee"
        type="text"
        name="entry_fee"
        value={formData.entry_fee}
        onChange={handleChange}
        />   
        </div>
        <div className='relative mb-4   mx-12 '>
       
        <select
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        className="w-2/3 border rounded-md px-4 py-2 mb-4"
      >
        <option value="">Select Artist</option>
        {artistList.map(artist => (
          <option key={artist.id} value={artist.id}>{artist.user.name}</option>
        ))}
      </select>
         </div>
        {/* for sponser */}
        <div className='relative mb-4   mx-12 '>
        <select
        name="sponser"
        value={formData.sponser}
        onChange={handleChange}
        className="w-2/3 border rounded-md px-4 py-2 mb-4"
      >
        <option value="">Select Sponser</option>
        {sponserlist.map(sponser => (
          <option key={sponser.id} value={sponser.id}>{sponser.name}</option>
        ))}
      </select>
      </div>
      <div className='relative mb-4 mx-12'>
  <label htmlFor="photo" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text">Photo</label>
  <input
    className="flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors"
    id="photo"
    type="file"
    name="photo"
    onChange={(e) => {
      setFormData({
        ...formData,
        photo: e.target.files[0], // Store the selected file in formData
      });
    }}
  />
</div>
      
         {/* for eventcompleted */}
         {/* <div className=' relative mb-4   mx-12    '> 
        <label htmlFor="eventcompleted" className="flex justify-center items-center absolute left-0 top-[-2] text-gray-600 cursor-text ">Event_Completed</label>
        <input type ='radio'
        className=' flex pt-2 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
             checked={event_completed}
         onChange={handleEventCompleted}
            /> 
        </div> */}
      </div>   
        {/* for buttom */}
       
        </div>
       
        <div className=' mx-44 py-2 flex items-center justify-center bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white  my-4 rounded-2xl'>
        <button className= ''>Create Event</button>
        </div>
        </form>
        <ToastContainer/>
        </div>
        )
}

export default ArtistCreateEvent