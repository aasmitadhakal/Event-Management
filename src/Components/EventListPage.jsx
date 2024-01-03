import React, { useState, useEffect } from 'react';
import axios from '../api/axios'
import EventList from './EventList';
import { useNavigate } from 'react-router-dom';
import Fotter from './Fotter'
import { Skeleton } from '@mui/material';
const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('emailinput') 
  const userPassword = localStorage.getItem('passwordinput');
  const navigate = useNavigate();
  useEffect(() => {
    // Make an Axios request to fetch event data
    axios.get(`event/search/?search=${searchQuery}&page=${currentPage}`,config)
      .then((response) => {
        setEvents(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  const config = {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
      'Content-Type': 'application/json'
    }
  } 
  const onViewMoreClick = (event) => {
    // Navigate to the event detail page with the event data
    navigate(`/events/${event.id}`, { state:{event} });
  };

  return (
    <div>
     
     {loading?(
        <>
        <div className='flex mt-24 items-center justify-center'><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="20%" /> </div>
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
       
        ) : (
      
      <EventList events={events} onViewMoreClick={onViewMoreClick} searchQuery={searchQuery} currentPage={currentPage} />
     
        )}
    </div>
  );
};

export default EventListPage;