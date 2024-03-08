import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import './index.css'
const Recommandation = () => {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/recommendation/event/', config);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {events.map(event => (
                    <SwiperSlide key={event.id}>
                        <img src={'http://127.0.0.1:8000'+event.photo} alt={event.event_name} />
                        <h2>{event.event_name}</h2>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                        {/* Add more details as needed */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Recommandation;