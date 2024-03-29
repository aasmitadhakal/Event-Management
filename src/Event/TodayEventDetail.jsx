import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import {BsCalendar2Date }from 'react-icons/bs'
import {AiOutlineFieldTime} from 'react-icons/ai';
import {CiLocationOn} from 'react-icons/ci'
import { Navbar } from '../Components';
import UpcomingEvent from './UpcomingEvent';
import img from '../assets/img.jpg'
import Fotter from '../Components/Fotter';
import BookingTodayEvent from './BookingTodayEvent'
const TodayEventDetail = () => {
    const { id } = useParams(); // Extracting event ID from URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);
    const [dataToShow, setDataToShow] = useState(null);
    const handleOpenPopUp = () => {
        setShowPopUp(true);
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
    };
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(
                    `event/choice/today/`
                ); // Replace with the actual API endpoint to fetch the specific event
                const eventData = response.data.results.find((event) => event.id === parseInt(id));
                setEvent(eventData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <>
             <div className='flex items-center justify-center mt-24'> <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} /></div>
            <div className='grid grid-cols-2 mt-12 gap-x-8 md:mx-36 mx-12'>
                <div>
                    <Skeleton variant="rectangular" width={510} height={300} />
                  
                </div>
                <div>
                <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text"width={250} sx={{ fontSize: '1rem' }} />
                <div className='flex my-8 gap-x-12'>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton variant="circular" width={50} height={50} />
                </div>
                <div className='mt-12'>
                <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />  
                </div>
                </div>
               
            </div>
            </>
          
        );
    }

    return (
    <>
    <Navbar/>
    
        <div className='my-24 '>
        <div className='flex items-center justify-center text-3xl font-serif mb-2 text-gray-700 '>Today Event <span className='pl-2 text-purple-400'>Details</span></div>
        <div className='grid  md:grid-cols-2 shadow-xl md:mx-44 p-12'>
        <div ><img src={'http://127.0.0.1:8000'+event.photo} className=" h-80  " alt=""></img></div>
        <div>
            <div className='text-xl font-serif pl-8  my-2'><span className=''>{event.event_name}</span></div>
            <div className='text-gray-400 font-serif ml-8 text-purple-500 flex'>Deal of the Day: {event.entry_fee}</div>
            <div className='bg-white  grid grid-cols-3 gap-x-4 mt-4 mx-4 border-b '>
    {/* for date */}
    <div className='mb-2'>
      <div className='text-2xl text-gray-500 mx-8'><BsCalendar2Date  /></div>
     <div className='font-serif text-lg mx-4  text-gray-700'>Event Date</div>
     <div className='font-serif text-gray-600 mx-4'>{event.date}</div>
    </div>
    {/* for time */}
    <div className=''>
    <div className='text-2xl text-gray-500 mx-4'><AiOutlineFieldTime /></div>
     <div className='font-serif text-lg   text-gray-700'>Event Time</div>
     <div className='font-serif text-gray-600 mx-4'>{event.time}</div>
    </div>
    {/* for location */}
    <div className=''>
    <div className='text-2xl text-gray-500 mx-8'><CiLocationOn /></div>
     <div className='font-serif text-lg mx-4  text-gray-700'>Location</div>
     <div className='font-serif text-gray-600 mx-4'>{event.location}</div>
    </div>
    </div>
    {/* for another part */}
    <div className='my-4 pl-4'>
    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>Capacity: {event.capacity}</div>
    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>Entry Price:{event.entry_fee}</div>
    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'> Artist:{event.artist}</div>
    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'> Sponser:{event.sponser}</div>
 
    </div>
   <div className='flex justify-end'><button onClick={handleOpenPopUp} className='hover:bg-purple-400 bg-purple-500 text-white px-8 py-1 rounded '>Book Now</button></div>
        </div>
        </div>
        {showPopUp && (
                    <BookingTodayEvent data={dataToShow} onClose={handleClosePopUp} />
                )}
      <UpcomingEvent/>
    
    </div>
    <Fotter/>
    </>
    );
};

export default TodayEventDetail;

    