import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistEventDetail = () => {
  const [events, setEvents] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all'); // State to track selected option

  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };



  const getData =()=>{
    axios.get(`http://127.0.0.1:8000/login/artist/event/detail/${selectedOption}/`,config)
    .then(response => {
        setEvents(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  useEffect(() => {
     getData();
    }, [selectedOption]);
    
  // Event handler for select change
  
  return (
    <div className="container mx-auto">
      <div className="text-3xl font-medium text-purple-400 mb-4 flex items-center justify-center">Events Details</div>
      <div className='flex justify-end mr-24 mb-24 '>
        <select className='text-slate-400 border-gray-200 border-2 py-2 px-10 rounded-xl focus:outline-none flex items-center justify-center' value={selectedOption} onChange={handleSelectChange}>
          <option value='all'>(All)</option>
          <option value="complete">Complete</option>
          <option value="pending">Pending</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="upcome">Upcome</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-12">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img src={event.photo} alt={event.event_name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
              <p className="text-slate-500 font-serif">Date: {event.date}</p>
              <p className="text-slate-500 font-serif">Time: {event.time}</p>
              <p className="text-slate-500 font-serif">Location: {event.location}</p>
              <p className="text-slate-500 font-serif">Remaining Capacity: {event.remaining_capacity}</p>
              <p className="text-slate-500 font-serif">No. of Participants: {event.no_of_participant}</p>
              {/* You can add more details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistEventDetail;