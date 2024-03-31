import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import notify from '../utlis/notifier'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'
function EventList() {
    const [data,setData] =useState([])
    const [deleted, setDeleted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [page, setPage] = useState(1);
    let { id } = useParams();
    const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'application/json'
        }
      };
      const limit = 10; // Assuming the limit of items per page is 10

      const getData = () => {
        axios.get(`event/search/?search=${searchQuery}&page=${page}`, config)
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
  axios.post(`event/complete/${id}/`,config)
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
    axios.delete(`event/delete/${id}`,config)
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
  const settoLocalstorage =(id,artist,sponser,event_name,date,time,location,photo,capacity,entry_fee)=>{
    localStorage.setItem("eventid",id)
    localStorage.setItem("eventartist",artist)
    localStorage.setItem("eventsponser",sponser)
    localStorage.setItem("event_name",event_name)
    localStorage.setItem("eventdate",date)
    localStorage.setItem("eventtime",time)
    localStorage.setItem("eventlocation",location)
    localStorage.setItem("eventphoto",photo)
    localStorage.setItem("eventcapacity",capacity)
    localStorage.setItem("evententry_fee",entry_fee)
  }
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
                    <th className=" p-2 text-sm font-semibold ">photo</th>
                    <th className=" p-2 text-sm font-semibold ">Artist</th>
                    <th className=" p-2 text-sm font-semibold ">Action</th>

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
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'><img src={item.photo}></img></td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.artist}</td>
            {/* <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.sponser}</td> */}
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
            <Link to ={`/eventupdate/${item.id}`}>
              <button
                
              className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg  hover:bg-purple-800 hover:text-green'>Update</button></Link>
            <button onClick={(e)=>{DeleteData(item.id,e)}} className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>delete  </button></td>
           {/* <td className='p-2 text-sm text-gray-700 whitespace-nowrap'> <button  onClick={(e)=>{EventComplete(item.id,e)}} className='bg-orange-400 text-white py-1 px-6 rounded-lg hover:bg-orange-600 hover:text-red'><span>Event complete</span></button></td> */}
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