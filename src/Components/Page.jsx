import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
const  Page = () => {
  const { id } = useParams();
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    // Make an Axios request to fetch the page content based on the 'id' parameter
    axios.get(`https://ayushkandel.pythonanywhere.com/event-management/${id}/`)
      .then((response) => {
        setPageContent(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching page content:', error);
      });
  }, [id]);

  return (
    <div>
      <Navbar/>
      {pageContent ? (
        <div>
          <h2>{pageContent.heading.heading}</h2>
          <p>{pageContent.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default  Page;