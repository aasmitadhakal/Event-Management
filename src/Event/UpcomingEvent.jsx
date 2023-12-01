import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, useParams } from 'react-router-dom';
import {CiLocationOn} from 'react-icons/ci'
import { Skeleton } from '@mui/material';
const UpcomingDetail = () => {
    let { id } = useParams(); // Extracting event ID from URL
    // You can fetch the event details using this ID from the API and display them here
    return <h2>Event Detail Page for Event ID: {id}</h2>;
};

const UpcomingEvent = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const fetchEvents = async () => {
      try {
          const response = await axios.get('https://ayushkandel.pythonanywhere.com/event/choice/upcome/');
          setLoading(false);
          if (Array.isArray(response.data.results)) {
              setEvents(response.data.results);
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

    return (<>
      {loading?(
        <>
       
        <div className='mt-24 flex items-center justify-center'><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="20%" /> </div>
        <div  className='flex items-center justify-center'><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="40%" /></div>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-12  md:mx-36 mx-12'>
        <div>
       <Skeleton variant="rectangular" width={310} height={150} />
       <Skeleton width="40%" />
        <Skeleton width="40%" />
       </div>
       <div>
       <Skeleton variant="rectangular" width={310} height={150} />
       <Skeleton width="40%" />
        <Skeleton width="40%" />
       </div>
       <div>
       <Skeleton variant="rectangular" width={310} height={150} />
       <Skeleton width="40%" />
        <Skeleton width="40%" />
       </div>
       
       </div>
       </> 
      ):(
        <div>
             <div className='flex items-center justify-center mt-20 text-2xl font-serif '>Upcoming <span className='mx-3 text-purple-600'>Events</span> </div>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-12 gap-8 md:mx-40 mx-20 mb-10'>
    {events.map((event) => (
      <Link to={`/upcomingevent/${event.id}`} key={event.id}>
        <div className='shadow-xl bg-white mt-12 rounded-2xl'>
          {/* <img src='img.jpg' className='ml-4 h-64 w-72' /> */}
          <img src={'https://ayushkandel.pythonanywhere.com'+event.photo} className='ml-4 h-64 w-72' alt={event.photo} />
          <div className='flex mt-2'>
            <p className='font-medium font-serif text-gray-400 pl-6 my-2 '>
              {event.date}
              <span className='mx-1'>||</span>
            </p>
            <p className='font-medium font-serif text-gray-400  my-2'>{event.time}</p>
          </div>
          <div className='font-serif pl-4 '>{event.event_name}</div>
          <div className='flex pr-2 pl-4 font-serif text-gray-400 '>
            <CiLocationOn className='mt-1 mr-1' />
            <span className=''>{event.location}</span>
          </div>

          <div className='flex justify-end mx-4 text-sm font-serif'>
            <Link to={`/upcomingevent/${event.id}`} key={event.id} className='px-4 hover:bg-gray-100 mb-4 py-1 rounded text-gray-500 bg-gray-200'>View Detail</Link>
          </div>
        </div>
      </Link>
    ))}
  </div>
  
  </div>
      )
      }
      </>
);
};
export default UpcomingEvent