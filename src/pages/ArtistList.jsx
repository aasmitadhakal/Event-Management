import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import notify from '../utlis/notifier'

function ArtistList() {
    const [data,setData] =useState('')
    const [deleted, setDeleted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'application/json'
        }
      };
    const getData =()=>{
            axios.get(`https://ayushkandel.pythonanywhere.com/artist/search/?search=${searchQuery}&page=${currentPage}`,config)
            .then(result=>{
              const { value, count } = result.data.results;
              setData(result.data.results);
              setTotalPages(Math.ceil(count / 10));
              // setData(result.data.results)
               console.log(result.data.results)
            })
            .catch(error=>{
                console.error(error);
            })
    }
    useEffect(()=>{
     getData()
    },[])

     //saving value on local storage for update
     const settoLocalstorage =(id,contact,gender,province,district,municipality,ward,photo,user,description,type_of_the_performer,performed_in)=>{
      localStorage.setItem("artistid",id)
      localStorage.setItem("artistcontact",contact)
      localStorage.setItem("artistgender",gender)
      localStorage.setItem("artistprovince",province)
      localStorage.setItem("artistdistrict",district)
      localStorage.setItem("artistmunicipality",municipality)
      localStorage.setItem("artistward",ward)
      localStorage.setItem("artistphoto",photo)
      localStorage.setItem("artistperformed_in",performed_in)
      localStorage.setItem("artistdescription",description)
      localStorage.setItem("artistPerformer",type_of_the_performer)
      localStorage.setItem("artistuser",user)
    }
     //posting delete api
     const DeleteData=(id,e)=>{
      e.preventDefault();
      axios.delete(`https://ayushkandel.pythonanywhere.com/artist/delete/${id}`,config)
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
        const visiblePages = 4; // Number of visible page buttons (excluding Previous and Next)
        
        // Calculate start and end page numbers based on the current page and the number of visible pages
        let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        let endPage = Math.min(startPage + visiblePages - 1, totalPages);
      
        if (endPage - startPage + 1 < visiblePages) {
          startPage = Math.max(endPage - visiblePages + 1, 1);
        }
      
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
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
      );}
   
  return (
    <div>
      {/* for searchbox */}
       <div className='flex justify-end items-end mx-24'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
          className='border p-2 rounded-2xl '
        />
          <button onClick={getData} className='bg-purple-400 text-white py-1 rounded-xl focus:outline-none  px-8 m-2'>Search</button>
        </div>    
        <div className='overflow-auto mx-6  '>
            <table className='rounded-lg shadow  mx-4 mt-8 mb-4'>
            <thead className='bg-white border-b-2 border-gray-200'>
              <tr className="">
                    <th className=" p-2 text-sm font-semibold ">ID</th>
                    <th className=" p-2 text-sm font-semibold ">Name</th>
                    <th className=" p-2 text-sm font-semibold ">Username</th>
                    <th className=" p-2  text-sm font-semibold ">Contact</th>
                    <th className=" p-2 text-sm font-semibold ">Gender</th>
                    <th className=" p-2 text-sm font-semibold ">Province</th>
                    <th className=" p-2 text-sm font-semibold ">District</th>
                    <th className=" p-2 text-sm font-semibold ">Municipality</th>
                    <th className=" p-2 text-sm font-semibold ">Ward</th>
                    <th className=" p-2 text-sm font-semibold ">Email</th>
                    <th className=" p-2 text-sm font-semibold ">Type of Performer</th>
                    <th className=" p-2 text-sm font-semibold ">Performed In</th>
                    <th className=" p-2 text-sm font-semibold ">Description</th>
                    <th className=" p-2 text-sm font-semibold ">User</th>
                    <th className=" p-2 text-sm font-semibold ">Photo</th>
                    <th className=" p-2 text-sm font-semibold ">Action</th>
              </tr>
             </thead>
             <tbody className='divide-y divide-gray-100'>
             {data&&data.map(item => (
          <tr className="bg-white border-r text-center border-b text-sm text-gray-600 " key={item.id}>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.id}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.user.name}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.user.username}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.contact}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.gender}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.province}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.district}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.municipality}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.ward}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.user.email}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.type_of_the_performer}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.performed_in}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.description}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.user.id}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'><img src={item.photo} className='h-14 w-14 rounded-full'></img></td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
              <Link to ="/aupdate">
              <button
                onClick={(e)=>settoLocalstorage(
                  item.id,
                  item.contact,
                  item.gender,
                  item.province,
                  item.district,
                  item.municipality,
                  item.ward,
                  item.photo,
                  item.user.id,
                  item.description,
                  item.type_of_the_performer,
                  item.performed_in,
                )}
              className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg  hover:bg-purple-800 hover:text-green'>Update</button></Link>
            <button   onClick={(e)=>{DeleteData(item.id,e)}} className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>delete</button></td>
         </tr>
             ))}
         </tbody>
            </table>
        </div>
        {renderPagination()}
    </div>
  )
}

export default ArtistList