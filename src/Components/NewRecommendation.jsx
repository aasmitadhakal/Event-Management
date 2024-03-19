import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const NewRecommandation = () => {
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem('accessToken');
    let { id } = useParams();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`, // Use the Bearer token here
      'Content-Type': 'multipart/form-data'
    }
  };
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/recommendation/event/',config);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className='mt-24 my-24 container mx-auto'>
    <h1 className='text-gray-700 font-serif text-[24px] font-[700] flex items-center justify-center '>Recommended Event</h1>
    <div className='grid lg:grid-cols-4 md:grid-cols-2  grid-cols-1 gap-4 '>
        {events.map(event => (
          
                <Link to={`/event/${event.id}`} className="slide-link"
                >
                    <div className='rounded  py-4 shadow-xl '>
                        <div className='h-44 w-full '>
                            <img src={'http://127.0.0.1:8000'+event.photo} alt={event.event_name} className='rounded-t-lg w-full h-full object-cover ' />
                        </div>
                        <div className='mt-4'>
                            <div className='font-serif font-[700] text-[14px] text-gray-700'>{event.event_name}</div>
                            <div className='flex justify-between mx-8 font-serif font-[400] text-slate-500'>
                                <div className='flex text-sm items-center'><FaLocationDot className='mx-1'/>{event.location}</div>
                                <div className='flex items-center text-sm'><MdDateRange className='mx-1'/>{event.date}</div>
                            </div>
                        </div>
                    </div>
                </Link>
                
            
        ))}
        </div>
 
           
</div>
    );
};

export default NewRecommandation;