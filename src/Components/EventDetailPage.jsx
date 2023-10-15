import React from 'react';
import { useLocation } from 'react-router-dom'; 
import EventDetail from './EventDetail';
import { useNavigate } from 'react-router-dom'; 


const EventDetailPage = () => {
  const location = useLocation(); // Use useLocation instead of location prop
  const navigate = useNavigate(); // Use useNavigate for navigation
  const event = location.state.event;
  
  

  return (
    <div>
      
      <EventDetail event={event} />
     
    </div>
  );
};

export default EventDetailPage;
