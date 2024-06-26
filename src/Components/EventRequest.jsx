import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';

const EventRequest = () => {
  const [events, setEvents] = useState([]);
  const [acceptedEvents, setAcceptedEvents] = useState([]);
  const [declinedEvents, setDeclinedEvents] = useState([]);
  const token = localStorage.getItem('accessToken');
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/event/request/', config);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAccept = async (eventId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/event/result/${eventId}/accept/`, {}, config);
      setAcceptedEvents([...acceptedEvents, eventId]);
      notify("success","Data Accepted successfully")
    } catch (error) {
      console.error('Error accepting event:', error);
    }
  };

  const handleDecline = async (eventId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/event/result/${eventId}/decline/`, {}, config);
      setDeclinedEvents([...declinedEvents, eventId]);
      notify("success","Data Declined successfully")
    } catch (error) {
      console.error('Error declining event:', error);
    }
  };

  return (
    <>
      <div className='overflow-auto mx-6'>
        {events.length > 0 ? (
          <table className='rounded-lg shadow mx-4 mt-8 mb-4'>
            <thead className='bg-white border-b-2 border-gray-200'>
              <tr className="">
                <th className="p-2 text-sm font-semibold">ID</th>
                <th className="p-2 text-sm font-semibold">Event Name</th>
                <th className="p-2 text-sm font-semibold">Date</th>
                <th className="p-2 text-sm font-semibold">Location</th>
                <th className="p-2 text-sm font-semibold">Capacity</th>
                <th className="p-2 text-sm font-semibold">Entry Fee</th>
                <th className="p-2 text-sm font-semibold">Photo</th>
                <th className="p-2 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {events.map(event => (
                <tr className="bg-white border-r text-center border-b text-sm text-gray-600" key={event.id}>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{event.id}</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{event.event_name}</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{event.date}</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{event.location}</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{event.capacity}</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{event.entry_fee}</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
                    <img src={event.photo} alt={event.event_name} className='h-16 w-24' />
                  </td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
                    <button
                      onClick={() => handleAccept(event.id)}
                      className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg hover:bg-purple-800 hover:text-green'
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(event.id)}
                      className='bg-red-400 text-white px-4 py-2 mr-4 rounded-lg hover:bg-red-800 hover:text-green'
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events  to display</p>
        )}
        <ToastContainer/>
      </div>
    </>
  );
};

export default EventRequest;