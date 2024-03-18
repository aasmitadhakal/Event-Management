import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { BrowserRouter as Router, Route, Link, Switch, useParams } from 'react-router-dom';
import {CiLocationOn} from 'react-icons/ci'
import { Skeleton } from '@mui/material';
import img from '../assets/img.jpg';
import Aos from 'aos'; // Import Aos
import 'aos/dist/aos.css'; // Import Aos CSS

import RecentEvent from '../Components/RecentEvent';
import Fotter from '../Components/Fotter';

const EventDetail = () => {
    let { id } = useParams(); // Extracting event ID from URL
    // You can fetch the event details using this ID from the API and display them here
    return <h2>Event Detail Page for Event ID: {id}</h2>;
};

const EventItem = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const fetchEvents = async () => {
        try {
            const response = await axios.get(
                `event/search/?search=${searchQuery}&page=${page}`
            );
            setLoading(false);
            setEvents(response.data.results);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false);
        }
    };
    useEffect(() => {
      Aos.init({
        duration: 1000,
        easing: "ease-in-out",
        // offset: "10",
        delay: "10",
        mirror: "false",
        once: "false",
        anchorPlacement: "top-center",
        disable: "mobile",
      }); // Initialize AOS with your preferred configuration
    }, []);
    useEffect(() => {
        fetchEvents();
    }, [searchQuery, page]);

    return (
    <>
      {loading?(
        <>
        <div className='mt-24 flex items-center justify-center'>
        <Skeleton variant="rectangular" width={800} height={300} />
        </div>
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
          
        <div><p className="text-4xl font-serif  text-purple-700 flex justify-center item-center mt-24 "> Events</p></div>   
       
        <div className='grid grid-cols-1 md:grid-cols-3 mt-2 gap-8 md:mx-14 mx-20 mb-10 z-[-10] '
        >
            
    {events.map((event) => (
       <div 
      //  data-aos="fade-up"
        key={event.id} className='shadow-xl bg-white mt-12 rounded-2xl '>
         <Link to={`/event/${event.id}`}>

       
            
          <img src={event.photo} className='rounded-t-lg w-[478px] h-[232px]' />
          
          <div className='flex mt-2'>
            <p className=' font-serif text-gray-700 pl-6 my-2 font-[500] '>
              {event.date}
              <span className='mx-1'>||</span>
            </p>
            <p className='font-[500] font-serif text-gray-700 my-2'>{event.time}</p>
          </div>
          <div className='font-serif pl-4 font-medium '>{event.event_name}</div>
          <div className='flex pr-2 pl-4 font-serif text-gray-800'>
            <CiLocationOn className='mt-1 mr-1 text-lg font-bold' />
            <span className=''>{event.location}</span>
          </div>

          <div className='flex justify-end mx-4 text-sm font-serif'>
            <Link to={`/event/${event.id}`} key={event.id} className='px-4 hover:bg-purple-400 hover:text-white mb-4 py-1 rounded text-gray-600 bg-gray-200'>View Detail</Link>
          </div>
         
       
      </Link>
      </div>
    ))}
  </div>
  {/* for pagination */}
  <div className="flex justify-center mt-8  mb-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Previous
        </button>
        <div className="flex ">
          {[...Array(4)].map((_, index) => {
            const currentPage = page + index;
            return (
              <button
                key={currentPage}
                onClick={() => setPage(currentPage)}
                className={`mx-1 px-3 py-2 rounded-full ${
                  currentPage === page ? 'bg-purple-400 text-white' : 'bg-gray-300'
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
          className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Next
        </button>
      </div>
      
  </div>
      )
      }
      <Fotter/>
      </>
);
};
export default EventItem