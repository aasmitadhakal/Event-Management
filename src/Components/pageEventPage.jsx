import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { BrowserRouter as Router, Route, Link, Switch, useParams } from 'react-router-dom';
import {CiLocationOn} from 'react-icons/ci';
import { IoIosTimer } from "react-icons/io";
import img from '../assets/img.jpg'
import { Navbar } from '../Components';
import RecentEvent from '../Components/RecentEvent';
import Fotter from '../Components/Fotter';


const EventDetail = () => {
    let { id } = useParams(); // Extracting event ID from URL
    // You can fetch the event details using this ID from the API and display them here
    return <h2>Event Detail Page for Event ID: {id}</h2>;
};

const PageEventPage = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const fetchEvents = async () => {
        try {
            const response = await axios.get('event/list/');
            setLoading(false);
            if (Array.isArray(response.data.results)) {
                setEvents(response.data.results.slice(0,3));
            } else {
                // Handle the case where response.data is not an array
                console.error('Data received is not an array:', response.data.results);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [searchQuery, page]);

    return (
    <>
      
        <div 
        // className='sticky top-20 ' style={{ zIndex: '1' }}
        >
           
        <div><p className="text-xl font-serif  text-purple-700 flex item-center mt-24 justify-center  "> Recent Event</p></div>   
       
        <div className='grid grid-cols-1  mx-4 '>
            
    {events.map((event) => (
       <div key={event.id} className='shadow-xl bg-white mt-4 rounded-2xl' >
         <Link to={`/event/${event.id}`}>

       
            <div className='flex p-4'>
         <div><img src={event.photo} className='h-24 w-36' /></div> 
         <div>
          <div className='text-sm text-gray-800 font-[500] mt-2 mx-2'>{event.event_name}</div>
          <div className='flex justify-around mt-2'>
          <div className='text-sm text-gray-700 flex justify-center items-center'><CiLocationOn className='text-purple-900 mx-2'/>{event.location}</div>
          <div className='text-sm text-gray-700 flex justify-center items-center '><IoIosTimer className='text-purple-900 mx-2'/>{event.date}</div>
          </div>
         
         
          </div>
         </div>
         
       
      </Link>
      </div>
    ))}
  </div>

      
  </div>
      
      
      </>
);
};
export default PageEventPage
