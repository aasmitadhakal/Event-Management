import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import UpcomingEvent from './UpcomingEvent';
import Fotter from '../Components/Fotter';
import Booking from '../Components/Booking';
import PageEventPage from '../Components/pageEventPage';
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
    <div className='relative'>
      <div className='w-full h-96' style={{ position: 'absolute', backgroundColor: '#051721', opacity: '0.7', zIndex: '1'}}></div>
        
        {/* Image */}
        <img className='w-full h-96' src={img} alt="Travel" style={{ zIndex: '0'}} />
        
        {/* Text */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', width: '100%', zIndex: '2' }}>
          <div className='font-montserrat font-[700]  md:text-[45px] text-[25px] leading-[56px]'>
            Event Detail's
          {/* <p>experience at our upcoming event!</p>  */}
          </div>
          <p className='font-karla font-[400] md:text-[20px] text-[15px] leading-[30px'>Special offer to suit you plan</p>
        </div>
    </div>
            {/* event detailPart */}
            <div className='my-12 grid grid-cols-3'>
                <div className='col-span-2'>
                    {/* <div className='flex items-center justify-center text-3xl font-serif mb-2 text-gray-700 '>Event <span className='pl-2 text-purple-400'>Details</span></div> */}
                    <div className=''>
                        <div className='mx-8'><img src={event.photo} className="rounded-xl h-[400px] w-[750px]  " alt={event.photo}></img></div>
                        
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
                                   
                                    {/* for timer */}
                                    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>
                                        {remainingTime > 0 ? (
                                            <div className=" space-x-2">
                                                <div className=" ">
                                                    {/* Display the countdown timer */}
                                                    <div className="grid grid-cols-3 auto-cols-max ">
                                                        <div className=" text-sm text-center  text-neutral-content bg-purple-300 border  "><span className='countdown font-mono  '>{formatTime(remainingTime).hours}</span><br />Hours</div>
                                                        <div className=" text-sm text-center  text-neutral-content  bg-purple-300 border "><span className='countdown font-mono '>{formatTime(remainingTime).minutes}</span><br />Minutes</div>
                                                        <div className="text-sm text-center  text-neutral-content  bg-purple-300 border "><span className='countdown font-mono '>{formatTime(remainingTime).seconds}</span><br />Seconds</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : "Event has started"}
                                    </div>
                                    {/* <div className='font-serif text-gray-600 mx-4 my-2 text-lg'> Artist: {event.artist.map((artist, index) => <span key={index}>{artist.user.name}</span>)}</div> */}
                                </div>
                            </div>
                             {/* for artist */}
                             <div className='flex'>
                                <div className='font-serif text-gray-500 mx-4  text-lg flex justify-center items-center'>
                                  
                                    {event.artist.map((artist, index) => (
                                        <div key={index} className='mx-12'>
                                            <p className='font-[500] mb-2 text-[30px] text-gray-700'>Artist ({artist.user.name}) </p>
                                            {/* <div>sponsor_type: {sponsor.sponser_type}</div> */}
                                            <img src={artist.photo} className='rounded-xl h-[200px] w-[350px] ' alt={artist.name} />
                                            <div className='text-[24px] font-[500] text-gray-700 '></div>
                                        </div>
                                    ))}
                                </div>
                                 {/* for sponser */}
                                <div className='font-serif text-gray-500 mx-4  text-lg flex justify-center items-center'>
                                  
                                    {event.sponser.map((sponsor, index) => (
                                        <div key={index} className='mx-12'>
                                            
                                            <div className='font-[500] mb-2 text-[30px] text-gray-700'>Sponser ({sponsor.name})</div>
                                            {/* <div>sponsor_type: {sponsor.sponser_type}</div> */}
                                            <img src={sponsor.photo} className='rounded-xl h-[200px] w-[350px]' alt={sponsor.name} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                           
                            {/* <div className='flex'> */}
                                
                            {/* </div> */}
                          <button onClick={handleOpenPopUp} className='my-8 mx-12  bg-purple-500 text-white px-36 py-1 rounded '>Book Now</button>
                        
                    </div>
                  
                </div>
                {/* for side part */}
                <div>
                     <PageEventPage/>                       
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