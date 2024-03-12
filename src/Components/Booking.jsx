import React, { useEffect, useRef, useState } from 'react';
import axios from '../api/axios';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { useParams } from 'react-router-dom';

function Booking({ onClose }) {
  const popUpRef = useRef(null);
  const { id } = useParams(); // Extracting event ID from URL
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState();
  const [eventId, setEventId] = useState(id);
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`, // Use the Bearer token here
      'Content-Type': 'multipart/form-data'
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        if (!event.target.closest('button')) {
          onClose(); // Close the pop-up if clicked outside its content area and not on a button
        }
      }
    };

    // Add event listener when the component mounts
    window.addEventListener('click', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  // for api calling
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`event/search/?search=&page=1`);
        const eventData = response.data.results.find((event) => event.id === parseInt(id));
        setEvent(eventData);
        setTotalPrice(eventData.entry_fee);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchEvent();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    setTotalPrice((quantity + 1) * event.entry_fee);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice((quantity - 1) * event.entry_fee);
    }
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  const handlePayClick = () => {
    axios.post(`http://127.0.0.1:8000/ticket/booking/${eventId}/`, { quantity, total_price: totalPrice, event: eventId }, config)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={popUpRef} className="bg-white p-4 rounded shadow-md mx-36">
        <button onClick={onClose} className="absolute top-44 right-32 text-white p-2 md:mx-44">
          Close
        </button>
        {/* for form */}
        {event ? (
          <div className=' '>
            <div className='flex items-center justify-center text-3xl font-serif mb-2 text-gray-700 '>Book <span className='pl-2 text-purple-400'>Event</span></div>
            <div className='grid md:grid-cols-2 p-12'>
              <div ><img src={event.photo} className="h-80" alt=""></img></div>
              <div>
                <div className='text-xl font-serif mx-12 my-2'><span className=''>{event.event_name}</span></div>
                <div className='text-gray-400 font-serif ml-12 text-purple-500 flex'>Deal of the Day: {event.entry_fee}</div>
                <div className='bg-white grid grid-cols-3 gap-x-4 mt-4 mx-4 border-b '>
                  <div className='mb-2'>
                    <div className='text-2xl text-gray-500 mx-8'><BsCalendar2Date /></div>
                    <div className='font-serif text-lg mx-4 text-gray-700'>Event Date</div>
                    <div className='font-serif text-gray-600 mx-4'>{event.date}</div>
                  </div>
                  <div className=''>
                    <div className='text-2xl text-gray-500 mx-4'><AiOutlineFieldTime /></div>
                    <div className='font-serif text-lg text-gray-700'>Event Time</div>
                    <div className='font-serif text-gray-600 mx-4'>{event.time}</div>
                  </div>
                  <div className=''>
                    <div className='text-2xl text-gray-500 mx-8'><CiLocationOn /></div>
                    <div className='font-serif text-lg mx-4 text-gray-700'>Location</div>
                    <div className='font-serif text-gray-600 mx-4'>{event.location}</div>
                  </div>
                </div>
                <div className='my-4 pl-4 grid grid-cols-2'>
                  <div>
                    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>Capacity: {event.capacity}</div>
                    <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>
                        Artist: {event.artist ? event.artist.map((artist, index) => <span key={index}>{artist.user?.name}</span>) : ''}
                        </div>
                        <div className='font-serif text-gray-600 mx-4 my-2 text-lg'>
                        Sponsor: {event.sponsor ? event.sponsor.map((sponsor, index) => <span key={index}>{sponsor?.name}</span>) : ''}
                        </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-serif text-gray-600 mx-4 my-2 text-lg">Total Price:</span>
                      <input type="number" className="mx-3 w-16 text-center" value={totalPrice} readOnly />
                    </div>
                    <div>
                      <span className="font-serif text-gray-600 mx-4 my-2 text-lg">Quantity</span>
                      <button className="px-3 py-1 bg-gray-300 text-white font-bold rounded" onClick={decrementQuantity}>-</button>
                      <span className="mx-3">{quantity}</span>
                      <button className="px-3 py-1 bg-gray-300 text-white font-bold rounded" onClick={incrementQuantity}>+</button>
                    </div>
                  </div>
                </div>
                <button className="hover:bg-purple-400 bg-purple-500 text-white px-12 py-1 mx-36 rounded " onClick={handlePayClick}>Pay Now</button>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default Booking;