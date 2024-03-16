import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

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
    {/* <div className='font-[700] text-[24px] text-gray-700 flex justify-center items-center mt-12 '>Blog</div> */}
    <div className="grid grid-cols-3 mx-24 gap-8 my-24">
      {apiData.map(item => (
        <div key={item.id} className=" shadow-xl">
          <img src={extractImageUrl(item.content)} alt="Card" className='rounded-t-lg' />
          <div className="">
            <p className="text-gray-700 p-2 font-[karla] flex justify-center items-center my-1 line-clamp-1">{extractText(item.content)}</p>
          </div>
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
  return text.trim();
}

export default BlogPage;