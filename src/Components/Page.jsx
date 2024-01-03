import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
const  Page = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Make an Axios request to fetch the page content based on the 'id' parameter
    axios.get(`event-management/${id}/`)
      .then((response) => {
        setApiData(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching page content:', error);
      });
  }, [id]);

  return (
    <div>
      <Navbar/>
      {/* {pageContent ? (
        <div className='mt-24'>
          
          <div dangerouslySetInnerHTML={{ __html: pageContent.heading.heading }} />
          <div dangerouslySetInnerHTML={{ __html: pageContent.content}} />
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
      
      {Array.isArray(apiData) && apiData.length > 0 ? (
        apiData.map(item => (
          <div
          className='mt-24'
          key={item.id}>
                     <div dangerouslySetInnerHTML={{ __html: item.content}} />
          </div>
        ))
      ) : (
        <p>Loading or no data available</p>
      )}
    </div>
  );
};

export default  Page;