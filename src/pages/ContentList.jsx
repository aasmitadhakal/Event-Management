import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate,Link } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';
import ArtistUpdate from './ArtistUpdate';


function ContentList() {
  const [statuss, setStatuss] = useState('All');
    const navigate = useNavigate()
    const [data, setData] = useState([]);
     const [deleted, setDeleted] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const username = localStorage.getItem('emailinput') 
     const userPassword = localStorage.getItem('passwordinput');
    const settoLocalstorage =(id,heading,content,updated_by,status)=>{
      localStorage.setItem("id",id)
      localStorage.setItem("heading",heading)
      localStorage.setItem("content",content)
      localStorage.setItem("updated_by",updated_by)
      localStorage.setItem("status",status)
    }

    const handleStatusChange =(event)=>{
      setStatuss(event.target.value);
    };
    const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

  const config = {
      headers: {
          'Authorization': `Bearer ${token}`, // Use the Bearer token here
          'Content-Type': 'application/json'
      }
  }
    
    const getData =()=>{
      axios.get(`https://ayushkandel.pythonanywhere.com/content-management/list/${statuss}/?page=${currentPage}`,config)
      .then(response => {
        const { results, count } = response.data;
          setData(results);
          setTotalPages(Math.ceil(count / 10));
      })
      .catch(error => {
        console.error(error);
      });
    }
    useEffect(() => {
       getData();
      }, [statuss,currentPage]);
      
    const DeleteData=(id,e)=>{
      e.preventDefault();
      axios.delete(`/content-management/delete/${id}`,config)
      .then(response => {
        console.log('Data deleted successfully:', response);
        notify("success","Data Deleted successfully")
        getData();
        setDeleted(true);
       
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
    }
    //for pagination
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    const renderPagination = () => {
      if (totalPages === 1) return null;
  
      const pageNumbers = [];
      const visiblePages = 5; // Number of visible page buttons (excluding Previous and Next)
      
      // Calculate start and end page numbers based on the current page and the number of visible pages
      let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
      let endPage = Math.min(startPage + visiblePages - 1, totalPages);
    
      if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(endPage - visiblePages + 1, 1);
      }
    
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      //foe select tag css
      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border: '2px solid #E5E7EB',
          borderRadius: '0.375rem',
          boxShadow: state.isFocused ? '0 0 0 3px rgba(156, 163, 175, 0.5)' : 'none',
          '&:hover': {
            border: '2px solid #CBD5E0',
          },
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
      };
      
      //for pagination part
      return (
        
        <div className="flex items-center justify-center mt-4 mb-12">
          <button
            className="px-3 py-2 mr-2 bg-purple-400 text-white rounded"
            onClick={handlePrevPage}
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`px-3 py-2 mx-1 ${
                page === currentPage ? 'bg-purple-400 text-white' : 'bg-white text-purple-400'
              } rounded`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-2 ml-2 bg-purple-400 text-white rounded"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      );
    };
    
  return (
    <>
    <div>
   <div className='flex justify-end mr-24 '>
   {/* <Link to='/Ccreate'> <button className='bg-purple-400  ml-4 text-white  py-2 mt-4 mr-2 px-8 rounded-xl hover:bg-purple-900'>Add</button></Link> */}
         <select className=' text-slate-400  border-gray-200 border-2 py-2 px-10 rounded-xl focus:outline-none flex items-center justify-center   ' value={statuss} onChange={handleStatusChange}>
        <option value='All' className=''>Fliter Status (All)</option>
        <option value="Draft" className=''>Draft</option>
        <option value="Publish" className=''>Publish</option>
      
      </select>
      </div>
    <div className="  overflow-auto rounded-lg shadow mx-24 mt-8 "  >
         
 
         <table className="w-full mb-4 ">
      <thead className='bg-white border-b-2 border-gray-200'>
        <tr className="">
          <th className=" p-3 text-sm font-semibold ">ID</th>
          <th className=" p-3  text-sm font-semibold ">Heading</th>
          <th className=" p-3 text-sm font-semibold ">Content</th>
          {/* <th>Date Created</th>
          <th>Date Updated</th> */}
          <th className=" p-3 text-sm font-semibold ">Updated By</th>
          <th className=" p-3 text-sm font-semibold ">Status</th>
          <th className=" p-3 text-sm font-semibold ">Action</th>
          
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100'>
        {data.map(item => (
          <tr className="bg-white border-r text-center border-b text-sm text-gray-600" key={item.id}>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.id}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.heading}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.updated_by}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.status}</td>
            <td>
              <Link to ="/contentupdate">
              <button
                onClick={(e)=>settoLocalstorage(
                  item.id,
                  item.heading,
                  item.content,
                  item.updated_by,
                  item.status,
                )}
              className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg  hover:bg-purple-800 hover:text-green'>Update</button></Link>
            <button onClick={(e)=>{DeleteData(item.id,e)}} className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  <ToastContainer/>

    </div>
    {renderPagination()}
    </div>
    </>
  )
}

export default ContentList