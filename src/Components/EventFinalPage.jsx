import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecentEvent from './RecentEvent';
import EventList from './EventList';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import Navbar from './Navbar';
const EventFinalPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('emailinput') 
  const userPassword = localStorage.getItem('passwordinput');
  const navigate = useNavigate();
  useEffect(() => {
    // Make an Axios request to fetch event data
    axios.get(`https://ayushkandel.pythonanywhere.com/event/search/?search=${searchQuery}&page=${page}`,config)
      .then((response) => {
        setEvents(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      },);
  }, [page,searchQuery]);
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
    <div className='mb-4'>
      <Navbar/>
      <RecentEvent/>
      {loading?(
        <>
        <div className='mt-12 flex items-center justify-center'><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="20%" /> </div>
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
      <>
         <EventList events={events} onViewMoreClick={onViewMoreClick} searchQuery={searchQuery} currentPage={page} />
         <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Previous
        </button>
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const currentPage = page + index;
            return (
              <button
                key={currentPage}
                onClick={() => setPage(currentPage)}
                className={`mx-1 px-3 py-2 rounded-full ${
                  currentPage === page ? 'bg-purple-500 text-white' : 'bg-gray-300'
                } hover:bg-purple-500 hover:text-white`}
              >
                {currentPage}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={events.length === 0 || events.length < 10}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Next
        </button>
      </div>
      </>
   
        )}
    </div>
  );
};

export default EventFinalPage;