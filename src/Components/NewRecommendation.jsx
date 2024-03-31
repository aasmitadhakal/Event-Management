import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const NewRecommendation = () => {
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem('accessToken');
    let { id } = useParams();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                };
                const response = await axios.get('/recommendation/event/', config);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        if (token) {
            fetchEvents();
        }
    }, [token]);

    const renderContent = () => {
        if (!token) {
            return (
                <div className="mt-24 my-24 container mx-auto text-center">
                    <h1 className="text-gray-700 font-serif text-3xl font-bold mb-4">Not Logged In</h1>
                    <p className="text-gray-500">You are not logged in. Please <Link to="/login" className="text-blue-500">log in</Link> to see recommended events.</p>
                </div>
            );
        }

        if (events.length === 0) {
            return (
                <div className="mt-24 my-24 container mx-auto text-center">
                    <h1 className='text-gray-700 font-serif text-[30px] font-[700] flex items-center justify-center '><span style={{ textDecoration: 'underline' }}>Recommended Events</span></h1>{" "}{" "}
                    <p className="text-gray-500">"Sorry, there are no recommended events available for you at the moment."</p>
                </div>
            );
        }

        return (
            <div className='mt-24 my-24 container mx-auto'>
                <h1 className='text-gray-700 font-serif text-[30px] font-[700] flex items-center justify-center '><span style={{ textDecoration: 'underline' }}>Recommended Events</span></h1>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 '>
                    {events.map(event => (
                        <Link to={`/event/${event.id}`} className="slide-link" key={event.id}>
                            <div className='rounded py-4 shadow-xl'>
                                <div className='h-44 w-full '>
                                    <img src={'http://127.0.0.1:8000' + event.photo} alt={event.event_name} className='rounded-t-lg w-full h-full object-cover' />
                                </div>
                                <div className='mt-4'>
                                    <div className='font-serif font-[700] text-[14px] text-gray-700'>{event.event_name}</div>
                                    <div className='flex justify-between mx-8 font-serif font-[400] text-slate-500'>
                                        <div className='flex text-sm items-center'><FaLocationDot className='mx-1' />{event.location}</div>
                                        <div className='flex items-center text-sm'><MdDateRange className='mx-1' />{event.date}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return renderContent();
};

export default NewRecommendation;

