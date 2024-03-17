import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
function BlogPage() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('blog/search/');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className='font-[700] text-[24px] text-gray-700 flex justify-center items-center mt-24 my-4 '>Blog</div>
    <div className="grid grid-cols-3 mx-24 gap-8 mb-24">
      {apiData.map(item => (
        <div key={item.id} className=" shadow-xl ">
            <Link to={`/blog/${item.id}`}>
          <img src={extractImageUrl(item.content)} alt="Card" className='rounded-t-lg' />
          <div className="">
            <p className="text-gray-700 p-2 font-[karla] flex justify-center items-center my-1 line-clamp-1">{extractText(item.content)}</p>
           
            <div className='flex justify-end mx-4 text-sm font-serif'>
            <Link to={`/blog/${item.id}`} className='px-4 hover:bg-purple-400 hover:text-white mb-4 py-1 rounded text-gray-600 bg-gray-200'>View Detail</Link>
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
  const truncatedText = words.slice(0, 30).join(' '); // Limit to first 50 words
  return truncatedText;
}

export default BlogPage;