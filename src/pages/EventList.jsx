import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import notify from '../utlis/notifier'
import { ToastContainer } from 'react-toastify'
function EventList() {
    const [data,setData] =useState([])
    const [deleted, setDeleted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [page, setPage] = useState(1);
    const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'application/json'
        }
      };
      const limit = 10; // Assuming the limit of items per page is 10

      const getData = () => {
        axios.get(`https://ayushkandel.pythonanywhere.com/event/search/?search=${searchQuery}&page=${page}`, config)
          .then(result => {
            setData(result.data.results);
          })
          .catch(error => {
            console.error(error);
          });
      };
useEffect(()=>{
 getData();
},[searchQuery,page])
//posting event complete
const EventComplete=(id,e)=>{
  e.preventDefault();
  axios.post(`https://ayushkandel.pythonanywhere.com/event/complete/${id}/`,config)
  .then(response => {
    console.log('Event Complete successfully:', response);
    notify("success"," Event Complete successfully")

  })
  .catch(error => {
    console.error('error sending data:', error);
  });
}
 //posting delete api
 const DeleteData=(id,e)=>{
    e.preventDefault();
    axios.delete(`https://ayushkandel.pythonanywhere.com/event/delete/${id}`,config)
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
  //     //for pagination
  //     const handlePageChange = (page) => {
  //       if (page >= 1 && page <= totalPages) {
  //         setCurrentPage(page);
  //       }
  //       getData(page);
  //     };
    
  //     const handlePrevPage = () => {
  //       if (currentPage > 1) {
  //         setCurrentPage(currentPage - 1);
  //       }
  //     };
    
  //     const handleNextPage = () => {
  //       if (currentPage < totalPages) {
  //         setCurrentPage(currentPage + 1);
  //       }
  //     };
   
  //     const renderPagination = () => {
  //       if (totalPages === 1) return null;
    
  //       const pageNumbers = [];
  //       const visiblePages = 4; // Number of visible page buttons (excluding Previous and Next)
        
  //       // Calculate start and end page numbers based on the current page and the number of visible pages
  //       let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  //       let endPage = Math.min(startPage + visiblePages - 1, totalPages);
      
  //       if (endPage - startPage + 1 < visiblePages) {
  //         startPage = Math.max(endPage - visiblePages + 1, 1);
  //       }
      
  //       for (let i = startPage; i <= endPage; i++) {
  //         pageNumbers.push(i);
  //       }
  // return (
  //   <div className="flex items-center justify-center mt-4 mb-12">
  //         <button
  //           className="px-3 py-2 mr-2 bg-purple-400 text-white rounded"
  //           onClick={handlePrevPage}
  //         >
  //           Previous
  //         </button>
  //         {pageNumbers.map((page) => (
  //           <button
  //             key={page}
  //             className={`px-3 py-2 mx-1 ${
  //               page === currentPage ? 'bg-purple-400 text-white' : 'bg-white text-purple-400'
  //             } rounded`}
  //             onClick={() => handlePageChange(page)}
  //           >
  //             {page}
  //           </button>
  //         ))}
  //         <button
  //           className="px-3 py-2 ml-2 bg-purple-400 text-white rounded"
  //           onClick={handleNextPage}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     );}
   
  return (
    <div className='mb-8'>
      {/* for searchbox */}
       <div className='flex justify-end items-end mx-24'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
          className='border p-2 rounded-2xl w-64 pl-12'
        />
          <button onClick={() => setPage(1)}
           className='bg-purple-400 text-white py-1 rounded-xl focus:outline-none  px-8 m-2'
           >Search</button>
        </div>    
        <div className='overflow-auto mx-6  '>
            <table className='rounded-lg shadow  mx-4 mt-8 mb-4'>
            <thead className='bg-white border-b-2 border-gray-200'>
              <tr className="">
                    <th className=" p-2 text-sm font-semibold ">ID</th>
                    <th className=" p-2 text-sm font-semibold ">Event Name</th>
                    <th className=" p-2 text-sm font-semibold ">Date</th>
                    <th className=" p-2  text-sm font-semibold ">Time</th>
                    <th className=" p-2 text-sm font-semibold ">Location</th>
                    <th className=" p-2 text-sm font-semibold ">Capacity</th>
                    <th className=" p-2 text-sm font-semibold ">Entry Fee</th>
                    <th className=" p-2 text-sm font-semibold ">Event Completed</th>
                    <th className=" p-2 text-sm font-semibold ">Artist</th>
                    <th className=" p-2 text-sm font-semibold ">Sponser</th>

              </tr>
             </thead>
             <tbody className='divide-y divide-gray-100'>
             {data&&data.map(item => (
          <tr className="bg-white border-r text-center border-b text-sm text-gray-600 " key={item.id}>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.id}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.event_name}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.date}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.time}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.location}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.capacity}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.entry_fee}</td>
            {/* <td className='p-2 text-sm text-gray-700 whitespace-nowrap'><img src={item.photo}></img></td> */}
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.artist}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.sponser}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
            <button onClick={(e)=>{DeleteData(item.id,e)}} className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>delete  </button></td>
           <td className='p-2 text-sm text-gray-700 whitespace-nowrap'> <button  onClick={(e)=>{EventComplete(item.id,e)}} className='bg-orange-400 text-white py-1 px-6 rounded-lg hover:bg-orange-600 hover:text-red'><span>Event complete</span></button></td>
         </tr>
             ))}
         </tbody>
            </table>
        </div>
        {/* //for pagination */}
        <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Previous
        </button>
        <div className="flex ">
          {[...Array(4)].map((_, index) => {
            const currentPage = page + index;
            return (
              <button
                key={currentPage}
                onClick={() => setPage(currentPage)}
                className={`mx-1 px-3 py-2 rounded-full ${
                  currentPage === page ? 'bg-purple-400 text-white' : 'bg-gray-300'
                } hover:bg-purple-500 hover:text-white`}
              >
                {currentPage}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={data.length === 0 || data.length < 10}
          className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Next
        </button>
      </div>
      
        <ToastContainer/>
    </div>
  )
}

export default EventList