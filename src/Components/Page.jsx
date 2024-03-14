import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import PageEventPage from './pageEventPage';
import Recommandation from './Recommandation';

const Page = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Make an Axios request to fetch the page content based on the 'id' parameter
    axios.get(`event-management/${id}/`)
      .then((response) => {
        setApiData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching page content:', error);
      });
  }, [id]);

  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='mt-24 mx-24 col-span-2'>
          {Array.isArray(apiData) && apiData.length > 0 ? (
            apiData.map(item => (
              <div key={item.id}>
                <div dangerouslySetInnerHTML={{ __html: item.content}} />
              </div>
            ))
          ) : (
            <p>Loading or no data available</p>
          )}
        </div>
        <div>
          <PageEventPage/>
        </div>
      </div>
      {id === '1' && <Recommandation />}
    </>
  );
};

export default Page;