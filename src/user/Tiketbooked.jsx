import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../assets/ticket.jpg'
function Tiketbooked() {
    const [tickets, setTickets] = useState([]);
    const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

    const config = {
      headers: {
          'Authorization': `Bearer ${token}`, // Use the Bearer token here
          'Content-Type': 'application/json'
      }
  }
   
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user/booked/ticket/',config);
        setTickets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTickets();
  }, []);
  return (
    <div>
    <h1 className="flex justify-center items-center text-xl font-serif mb-4 text-purple-400">Your Booked Tickets</h1>
    {tickets.map((ticket) => (
      <div key={ticket.ticket_id} className="shadow-xl font-serif rounded-lg p-4 mb-4 mx-24 my-18 grid grid-cols-2">
        {/* <div className='h-44 w-2/3'><img src={ticket.event.photo}></img></div> */}
          <div className='' >
            <img className='' src={img}></img>
          </div>
       <div className='p-2'>
          <h2 className=" font-bold text-purple-400 my-1">{ticket.event.event_name}</h2>
          <span className="text-gray-600 my-1"><span className=''>Ticket Num:</span>{ticket.ticket_num}</span>
    
       
          
            <p className="text-gray-600 my-1"><span className='font-medium'>Location:</span> {ticket.event.location}</p>
            <p className="text-gray-600 my-1"><span className='font-medium'>Date:</span> {ticket.event.date}</p>
            <p className="text-gray-600 my-1"><span className='font-medium'>Time:</span> {ticket.event.time}</p>
      
            <p className="text-gray-600 my-1"><span className='font-medium'>Ticket Fee:</span> {ticket.event.entry_fee}</p>
            <p className="text-gray-600 my-1"><span className='font-medium'>Quantity:</span> {ticket.quantity}</p>
            <p className="text-gray-600 my-1"><span className='font-medium'>Total Price:</span> {ticket.total_price}</p>
            </div>
        
      </div>
    ))}
  </div>
  )
}

export default Tiketbooked