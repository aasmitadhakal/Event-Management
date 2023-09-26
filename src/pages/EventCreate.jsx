import React from 'react'
import { useState } from 'react'
import axios from '../api/axios'
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate } from 'react-router-dom'
function EventCreate() {
    const navigate = useNavigate()
    const[event_name,setEvent_name]=useState('')
    const[date,setDate]=useState('')
    const[time,setTime]=useState('')
    const[location,setLocation]=useState('')
    const[capacity,setCapacity]=useState('')
    const[entry_fee,setentry_fee]=useState('')
    const[event_completed,setevent_completed]=useState('')
    const[artist,setArtist]=useState('')
    const[sponser,setSponser]=useState('')
    const username = localStorage.getItem('emailinput') 
  const userPassword = localStorage.getItem('passwordinput');
    const handleEventName =(e)=>{
        setEvent_name(e.target.value)
      }
      const handleDate =(e)=>{
        setDate(e.target.value)
      }
      const handleTime =(e)=>{
        setTime(e.target.value)
      }
      const handleLocation =(e)=>{
        setLocation(e.target.value)
      }
      const handleCapacity =(e)=>{
        setCapacity(e.target.value)
      }
      const handleEntryFee=(e)=>{
        setentry_fee(e.target.value)
      }
      const handleEventCompleted =(e)=>{
        setevent_completed(e.target.value)
      }
      const handleArtist =(e)=>{
        setArtist(e.target.value)
      }
      const handleSponser =(e)=>{
        setSponser(e.target.value)
      }
      const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'application/json'
        }
      };
      const handleAPi =(e)=>{
        e.preventDefault();
        axios
        .post("/event/create/", {
         event_name : event_name,
         date: date,
         time: time,
         location:location,
         capacity:capacity,
         entry_fee:entry_fee,
         event_completed:event_completed,
         artist:artist,
         sponser:sponser
        },config)
        .then((result) => {
          console.log(result.data);
           navigate("/eventlist",{replace:true});
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
        });
      }
  return (
    <div className='  mt-18 flex justify-center items-center p-12 '>
    <form onSubmit={handleAPi}
     className='   p-6 border bg-white shadow-md rounded'>
    <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Create Event</div>
        {/* for eventname */}
        <div className='relative mb-8  mx-12 '>
        <label htmlFor="event_name" className="absolute   text-gray-600 cursor-text ">Heading</label>
        <input
        className="  flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" 
        id="event_name"
        type="text"
        name="event_name"
        value={event_name}
        onChange={handleEventName}
        />

        </div>
        {/* for date */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="date" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Date</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="date"
        type="text"
        name="date"
        value={date}
        onChange={handleDate}
        />   
       
        </div>
       
        {/* for time */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="time" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Time</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="time"
        type="text"
        name="status"
        value={time}
        onChange={handleTime}
        />   
       
        </div>
        {/* for location */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="location" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Location</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="location"
        type="text"
        name="location"
        value={location}
        onChange={handleLocation}
        />   
        </div>
          {/* for capacity */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="capacity" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Capacity</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="capacity"
        type="text"
        name="capacity"
        value={capacity}
        onChange={handleCapacity}
        />   
        </div>
          {/* for entryfeee */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="entry_fee" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Entry_Fee</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="entry_fee"
        type="text"
        name="entry_fee"
        value={entry_fee}
        onChange={handleEntryFee}
        />   
        </div>
          {/* for eventcompleted */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="eventcompleted" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Event_Completed</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="eventcompleted"
        type="text"
        name="event_completed"
        value={event_completed}
        onChange={handleEventCompleted}
        />   
        </div>
          {/* for artist */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="artist" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Artist</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="artist"
        type="text"
        name="artist"
        value={artist}
        onChange={handleArtist}
        />   
        </div>
          {/* for sponser */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="sponser" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Sponser</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="sponser"
        type="text"
        name="sponser"
        value={sponser}
        onChange={handleSponser}
        />   
        </div>

        {/* for buttom */}
        <div className=''>
        <button className='bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4  px-8 mx-10 py-2  rounded-2xl'>Create Event</button>
        </div>
        </form>
        </div>
        )
}

export default EventCreate