import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import RecentBlog from './RecentBlog';
import Footer from './Fotter';

function BlogMain() {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        content: ''
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch blog details
        fetchData();

        // Fetch comments
        fetchComments();
    }, [id]); // Reload data when ID changes

    // Fetch blog details
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

    // Fetch comments
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comment/read/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Make a POST request to the API endpoint with the form data
        axios.post(`comment/create/${id}/`, formData)
            .then(response => {
                console.log('Response:', response.data);
                // Clear form data
                setFormData({ name: '', content: '' });
                // Fetch comments again to update the list
                fetchComments();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div className='grid md:grid-cols-3'>
                <div className='md:mt-39 mt-24 text-gray-500 font-[600] col-span-2'>
                    <div className="md:mx-24 mx-8 md:mb-24 ">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <h1 className="text-2xl font-semibold mb-4">{blogData.title}</h1>
                                <img src={extractImageUrl(blogData.content)} alt="Blog Image" className="mb-4 rounded-lg shadow-lg" />
                                <p className="text-justify">{extractText(blogData.content)}</p><br /><hr />
                                <div className="flex items-center">
                                    <p className="mr-2 text-xs italic">-<span className="font-normal"> {blogData.created_by}</span></p>
                                </div>
                                <div className="flex items-center">
                                    <p className="mr-2 text-xs italic">-<span className="font-normal">{blogData.date_created.substring(0, 10)}</span></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className='md:mx-0 mx-4'>
                    <RecentBlog />
                </div>
            </div>
            <div className=' grid grid-cols-2 gap-x-8  container mx-auto justify-between'>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='my-4 nb-10'>
                            <p className='text-[24px] font-[700] text-gray-700 font-sans flex item center justify-center'>Comment Your Review</p>
                            <p className='text-purple-500 text-[14px] font-[400] leading-[20px] flex item center justify-center'> Feel free to explore and let us know what you think.</p>
                        </div>
                        <div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Your Name'
                                className='border-gray-200 border-2 outline-none px-2 py-4 my-2 rounded w-full focus:border-purple-400'
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                placeholder='Comment Your Review'
                                className='border-gray-200 border-2 outline-none px-2 py-4 h-36 my-2 rounded w-full focus:border-purple-400'
                            ></textarea>
                        </div>
                        <button
                            className='bg-purple-400 text-white px-6 py-2 rounded'
                            type="submit">Submit Comment</button>
                    </form>
                </div>
                <div>
                    <div className='text-[24px] font-[700] text-gray-700 font-sans flex item center justify-center'>Comments</div>
                    {data.map(item => (
                        <div key={item.id} className="border shadow-xl mx-12 my-4 p-2 rounded">
                            <h2 className="text-[16px] font-[600] text-purple-700 my-1 font-sans">{item.name}</h2>
                            <p className="text-gray-500 text-[17px] font-[400] leading-[20px] ">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
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