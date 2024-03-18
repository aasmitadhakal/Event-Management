import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import RecentBlog from './RecentBlog';
import Footer from './Fotter';
function BlogMain() {
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`blog/detail/${id}`);
                setBlogData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Ensure blogData is not null before accessing its properties
    const textContent = blogData ? extractText(blogData.content) : '';

    return (
        <>
        <div className='grid grid-cols-3'>
        <div className='mt-44 text-gray-500 font-[600] col-span-2'>
           
            <div className="mx-24 mb-24">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">{blogData.title}</h1>
                        <img src={extractImageUrl(blogData.content)} alt="Blog Image" className="mb-4 rounded-lg shadow-lg" />
                        <p>{textContent}</p>
                        {/* <p>Created by: {blogData.created_by}</p>
                        <p>Date created: {blogData.date_created}</p>
                        <p>Date updated: {blogData.date_updated}</p> */}
                    </>
                )}
            </div>
          
            </div>
              {/* for recent content */}
              <div>
                <RecentBlog/>
            </div>
        </div>
        <Footer/>
        </>
    )
}

function extractImageUrl(content) {
    const match = content.match(/src="([^"]*)"/);
    return match ? match[1] : '';
}

function extractText(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.textContent || div.innerText || '';
}

export default BlogMain;