import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const BlogDetail = () => {
    let { id } = useParams(); // Extracting event ID from URL
    // You can fetch the event details using this ID from the API and display them here
    return <h2>Event Detail Page for Event ID: {id}</h2>;
  };

function RecentBlog() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('blog/search/');
          setApiData(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
        <>
        <div className='font-[500] text-[24px] text-gray-700 flex justify-center items-center mt-36 my-4 '>Recent Blogs</div>
        <div className="">
          {apiData.map(item => (
            <div key={item.id} className="my-4 shadow-xl ">
                <Link to={`/blogss/${item.id}`} key={item.id}>
                    <div className='flex'>
                    <div className=''>
                    <img src={extractImageUrl(item.content)} alt="Card" className='rounded h-20 w-24' />
                    </div>
             
                    <div className="w-64">
                        <p className="text-gray-700 p-2 font-[karla] flex justify-center items-center my-1 line-clamp-1">{extractText(item.content)}</p>
                    </div>
                    </div>
                    
              </Link>
            </div>
           
          ))}
        </div>
        </>
      );
    }
    
    function extractImageUrl(content) {
      const match = content.match(/src="([^"]*)"/);
      return match ? match[1] : '';
    }
    
    function extractText(content) {
      const div = document.createElement('div');
      div.innerHTML = content;
      const text = div.textContent || div.innerText || '';
      const words = text.trim().split(/\s+/); // Split text into words
      const truncatedText = words.slice(0, 15).join(' '); // Limit to first 50 words
      return truncatedText;
    }
    

export default RecentBlog