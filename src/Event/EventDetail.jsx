import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Skeleton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import UpcomingEvent from './UpcomingEvent';
import Fotter from '../Components/Fotter';
import Booking from '../Components/Booking';
// import PageEventPage from '../Components/pageEventPage';
import img from '../assets/events.jpg'
const EventDetail = () => {
    const { id } = useParams(); // Extracting event ID from URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);
    const [dataToShow, setDataToShow] = useState(null); // Define dataToShow state variable
    const [remainingTime, setRemainingTime] = useState(null);

    const handleOpenPopUp = () => {
        setShowPopUp(true);
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/event/details/${id}/`);
                setEvent(response.data[0]);
                setLoading(false);
                
                // Calculate remaining time until the event
                const eventTime = new Date(response.data[0].date + ' ' + response.data[0].time).getTime();
                const currentTime = new Date().getTime();
                const timeDiff = eventTime - currentTime;
                setRemainingTime(timeDiff);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRemainingTime(prevTime => prevTime - 1000);
        }, 1000);

        // Clear the timer when component unmounts or when remainingTime becomes negative
        return () => clearTimeout(timer);
    }, [remainingTime]);

    if (loading) {
        return (
            <>
                <div className='flex items-center justify-center mt-24'>
                    <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
                </div>
                {/* Skeleton loading for other event details */}
            </>
        );
    }

    // Function to format remaining time into hours, minutes, and seconds
    const formatTime = (time) => {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    return (
        <>
        {/* Header section */}
    
            {/* event detailPart */}
            <div className='my-24  flex justify-center item-center md:mx-64'>
                <div className=' shadow-xl'>
                    <p className='flex justify-center item-center font-[700] text-[24px] text-gray-700 my-4'>Event Details</p>
                  
                    <div className=''>
                        <div className='mx-8 mb-5'><img src={event.photo} className="rounded-xl h-[400px] w-full " alt={event.photo}></img></div>
                        
                            <div className='text-[24px] font-[500] font-serif ml-12  my-1'><span className=''>{event.event_name}</span></div>
                            <div className='text-gray-600 font-serif ml-12 flex'>Deal of the Day: {event.entry_fee}</div>
                            <div className='bg-white  grid grid-cols-3 gap-x-4 mt-4 mx-8 border-b '>
                                <div className='mb-2'>
                                    <div className='text-2xl text-gray-500 mx-8'><BsCalendar2Date /></div>
                                    <div className='font-serif text-lg mx-4  text-gray-700'>Event Date</div>
                                    <div className='font-serif text-gray-600 mx-4'>{event.date}</div>
                                </div>
                                <div className=''>
                                    <div className='text-2xl text-gray-500 mx-4'><AiOutlineFieldTime /></div>
                                    <div className='font-serif text-lg   text-gray-700'>Event Time</div>
                                    <div className='font-serif text-gray-600 mx-4'>{event.time}</div>
                                </div>
                                <div className=''>
                                    <div className='text-2xl text-gray-500 mx-8'><CiLocationOn /></div>
                                    <div className='font-serif text-lg mx-4  text-gray-700'>Location</div>
                                    <div className='font-serif text-gray-600 mx-4'>{event.location}</div>
                                </div>
                            </div>
                            <div className='my-4 mx-8 grid grid-cols-2 '>
                                <div>   
                                    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>Capacity: {event.capacity}</div>
                                    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>Entry Price:{event.entry_fee}</div>
                                    
                                </div>
                                <div>
                                    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>No_of_Participant: {event.no_of_participant}</div>
                                    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>Remaining Capacity:{event.remaining_capacity}</div>
                                </div>
                            </div>
                            {/* for timer */}
                            <div className='my-4 mx-8'>
                                <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>
                                    Remaining Time To Book The Event: 
                                </div>
                                <div className='flex justify-center space-x-1'>
                                    {remainingTime > 0 ? (
                                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 border-2 border-black">
                                            <span className="text-lg font-mono">{formatTime(remainingTime).hours}</span>
                                        </div>
                                    ) : null}
                                    {remainingTime > 0 ? (
                                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 border-2 border-black">
                                            <span className="text-lg font-mono">{formatTime(remainingTime).minutes}</span>
                                        </div>
                                    ) : null}
                                    {remainingTime > 0 ? (
                                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 border-2 border-black">
                                            <span className="text-lg font-mono">{formatTime(remainingTime).seconds}</span>
                                        </div>
                                    ) : null}
                                </div>
                                {remainingTime <= 0 && <div>Event has started</div>}
                            </div>


                             {/* for artist */}
                            
                                <div className=' '>
                                <p className='font-serif  text-gray-600 text-[20px] font-[500] mx-12 my-2'>Artists:</p> 
                                <div className='font-serif text-gray-500 mx-4  grid grid-cols-3  '>
                                    {event.artist.map((artist, index) => (
                                        <div key={index} className='mx-12 font-serif text-gray-500   text-lg'>
                                            <img src={artist.photo} className='rounded-full h-24 w-24 mb-2' alt={artist.name}  />
                                            <p className='font-serif font-[500] mb-2 mx-2 text-gray-700'> {artist.user.name} </p>
                                          
                                          
                                        </div>
                                    ))}
                                </div>
                                </div>
                                 {/* for sponser */}
                                <p className='font-serif  text-gray-600 text-[20px] font-[500] mx-12'>Sponsers:</p>
                                <div className='font-serif text-gray-500 mx-4  grid grid-cols-3 '>
                                
                                    {event.sponser.map((sponsor, index) => (
                                        <div key={index} className='mx-12'>
                                            
                                            <img src={sponsor.photo} className='rounded-full h-12 w-12 mb-2' alt={sponsor.name} />
                                            <div className='font-[500] mb-2  text-gray-700'> {sponsor.name}</div>
                                           
                                            
                                        </div>
                                    ))}
                                
                               
                            </div>
                           
                            {/* <div className='flex'> */}
                                
                            {/* </div> */}
                        
                        
                    </div>
                    <div className='flex justify-center items-center'><button onClick={handleOpenPopUp} className='my-8   bg-purple-500 text-white px-36 py-1 rounded '>Book Now</button></div>
                </div>
              
                
                {showPopUp && (
                    <Booking data={dataToShow} onClose={handleClosePopUp} />
                )}
            </div>
            <UpcomingEvent />
            <Fotter />
        </>
    );
};

export default EventDetail;
