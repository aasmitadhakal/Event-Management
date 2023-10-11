import React from 'react';
import Navbar from "./Navbar"
import {useState,useEffect} from 'react'
import axios from 'axios'
import {BsCalendar2Date }from 'react-icons/bs'
import {AiOutlineFieldTime} from 'react-icons/ai'
import {CiLocationOn} from 'react-icons/ci'
import {MdReduceCapacity} from 'react-icons/md'
import {BsCashCoin} from 'react-icons/bs'
import {BsPeople} from 'react-icons/bs'
import {CiSaveUp2} from 'react-icons/ci'
import {FaPeopleGroup} from 'react-icons/fa6'
import {BsFillHeartFill} from 'react-icons/bs'
import img from '../assets/event2.jpg'
import { Skeleton } from '@mui/material';
import { motion } from "framer-motion"
const EventDetail = ({ event }) => {
 
  const cardVariants = {
    hover: {
      y: -4, // Move the card 10 pixels up
    },
    initial: {
      y: 0, // Initial position
    },
  };

  return (
    <>
    <Navbar />
    
    <motion.div
    // whileHover="hover" 
    // initial={{opacity :0}}
    // animate={{opacity:2}}
    // exit={{opacity:0}}
    // transition={{duration:0.5}}
    className="  md:z-[-1] z-[-1] bg-white  relative "
    //  variants={cardVariants}
     >
 <div className=''>
    <div className=" relative flex   justify-center items-center  "><img src={img} className="opacity-80  w-full h-84  rounded " alt=""></img></div>
    <div className="p-2 rounded-xl font-serif top-36 mx-4 md:mx-72 text-3xl  absolute left-10 text-black-900 cursor-pointer bg-purple-200 ">{event.event_name}</div>
    <div className='top-56  flex justify-center item-center  text-xl  absolute left-80 mx-64 bg-purple-300 text-black-900 px-4 py-2 rounded-xl hover:bg-purple-600 hover:text-white  '><button>Book Now</button></div>
    
      <div className='bg-white absolute top-80 shadow-xl h-64 w-2/3 mx-44  grid grid-cols-3 gap-x-12'>
        {/* for date */}
        <div className='mt-8'>
          <div className='text-3xl text-purple-500 mx-8'><BsCalendar2Date  /></div>
         <div className='font-serif text-xl mx-4  text-purple-700'>Event Date</div>
         <div className='font-serif text-gray-600 mx-4'>{event.date}</div>
        </div>
        {/* for time */}
        <div className='mt-8'>
        <div className='text-3xl text-purple-500 mx-8'><AiOutlineFieldTime /></div>
         <div className='font-serif text-xl mx-4  text-purple-700'>Event Time</div>
         <div className='font-serif text-gray-600 mx-4'>{event.time}</div>
        </div>
        {/* for location */}
        <div className='mt-8'>
        <div className='text-3xl text-purple-500 mx-8'><CiLocationOn /></div>
         <div className='font-serif text-xl mx-4  text-purple-700'>Location</div>
         <div className='font-serif text-gray-600 mx-4'>{event.location}</div>
        </div>
        {/* for capacity */}
        <div className='mt-8'>
        <div className='text-3xl text-purple-500 mx-8'><MdReduceCapacity /></div>
         <div className='font-serif text-xl mx-4  text-purple-700'>Capacity</div>
         <div className='font-serif text-gray-600 mx-4'>{event.capacity}</div>
        </div>
         {/* for Entry Fee */}
         <div className='mt-8'>
        <div className='text-3xl text-purple-500 mx-8'><MdReduceCapacity /></div>
         <div className='font-serif text-xl mx-4  text-purple-700'>Entry Fee</div>
         <div className='font-serif text-gray-600 mx-4'>{event.entry_fee}</div>
        </div>
      </div>
    {/* <div className="flex p-1 justify-center items-center   font-serif top-36 mx-4 md:mx-72 text-3xl  absolute left-10 text-white cursor-pointer ">{event.event_name}</div>
    <div className=" flex p-1 mx-24 font-serif text-lg text-gray-700"><span className='pr-4'>Date </span><span className="text-purple-600  mt-1"><AiOutlineFieldTime /></span> {event.date}</div>
    <div className="flex  p-1 mx-24 text-lg text-gray-700"><span>Location</span><span className="text-purple-600  mt-1"> <CiLocationOn /></span>{event.location}</div>
    <div className=" flex p-1 mx-24 font-serif text-lg text-gray-700"><span>Capacity </span><span className="text-purple-600  mt-1"><MdReduceCapacity /></span> {event.capacity}</div>
    <div className=" flex p-1 mx-24 font-serif text-lg text-gray-700"><span>Entry Fee </span><span className="text-purple-600  mt-1"><BsCashCoin /></span> {event.entry_fee}</div>
    <div className=" flex p-1 mx-24  font-serif text-lg text-gray-700"><span>Time </span><span className="text-purple-600  mt-1"><AiOutlineFieldTime /></span> {event.time}</div> */}
   
    {/* <div className=" hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 text-white mt-4  px-20 mx-24 pr-18 py-2  rounded-2xl flex ">Book Now</div> */}
    </div> 
    
  
    
   
    
    {/* <div className=" ml-4 flex text-gray-600"><span className=" font-serif ml-4  pr-2 mb-1 font-medium text-purple-600" >Sponser</span><span className="text-purple-600 pr-2 mt-1"> <FaPeopleGroup /></span> {item.artist.join(', ')}</div> */}
   
  </motion.div>
  </>
  );
};

export default EventDetail;