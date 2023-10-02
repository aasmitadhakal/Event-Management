import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecentEvent from './RecentEvent';
import EventList from './EventList';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const username = localStorage.getItem('emailinput') 
  const userPassword = localStorage.getItem('passwordinput');
  const navigate = useNavigate();
  useEffect(() => {
    // Make an Axios request to fetch event data
    axios.get(`https://ayushkandel.pythonanywhere.com/event/search/?search=${searchQuery}&page=${currentPage}`,config)
      .then((response) => {
        setEvents(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const config = {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
      'Content-Type': 'application/json'
    }
  } 
  const onViewMoreClick = (event) => {
    // Navigate to the event detail page with the event data
    navigate(`/events/${event.id}`, { state:{event} });
  };

  return (
    <div>
      <Navbar/>
      <RecentEvent/>
      <EventList events={events} onViewMoreClick={onViewMoreClick} searchQuery={searchQuery} currentPage={currentPage} />
    </div>
  );
};

export default EventListPage;