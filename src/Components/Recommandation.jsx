import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import SwiperCore, { Keyboard, Navigation, Pagination, Scrollbar } from 'swiper';
import { Link } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';
// Install Swiper modules
SwiperCore.use([Keyboard, Navigation, Pagination, Scrollbar]);

const Recommandation = () => {
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
        <div className='mt-24 my-24 z-[-100]'>
    <h1 className='text-purple-400 font-serif text-[20px] font-[500] pl-12 '>Recommended Event</h1>
    <Swiper
        slidesPerView={1}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        keyboard={{
            enabled: true,
        }}
        breakpoints={{
            769: {
                slidesPerView: 3,
                spaceBetween: 20, // Adjust spacing for larger screens
            },
        }}
        navigation={true}
        pagination={{
            clickable: true,
        }}
        className="mySwiper "
        style={{ position: 'relative', zIndex: '-1' }}
    >
        {events.map(event => (
            <SwiperSlide key={event.id} className="swiper-slide"
           
            >
                <Link to={`/event/${event.id}`} className="slide-link"
                 style={{ position: 'relative', zIndex: '1' }}>
                    <div className='rounded px-4 py-4 '>
                        <div className='h-44 w-80'>
                            <img src={'http://127.0.0.1:8000'+event.photo} alt={event.event_name} className='rounded-t-lg w-full h-full object-cover z-negative' />
                        </div>
                        <div className='mt-4'>
                            <div className='font-serif font-[700] text-[14px] text-purple-400'>{event.event_name}</div>
                            <div className='flex justify-between font-serif font-[400] text-slate-500'>
                                <div className='flex items-center'><FaLocationDot/>{event.location}</div>
                                <div className='flex items-center'><MdDateRange/>{event.date}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </SwiperSlide>
        ))}
    </Swiper>
</div>
    );
};

export default Recommandation;