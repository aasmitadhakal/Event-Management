import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import EventDetail from './EventDetail';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const EventDetailPage = () => {
  const location = useLocation(); // Use useLocation instead of location prop
  const navigate = useNavigate(); // Use useNavigate for navigation
  const event = location.state.event;
  
  // const goBack = () => {
  //   navigate(-1); // Navigate back to the previous page
  // };

  return (
    <div>
       {/* <Navbar/> */}
      <EventDetail event={event} />
      {/* <button onClick={goBack}>Go Back</button> */}
    </div>
  );
};

export default EventDetailPage;
