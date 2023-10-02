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
import img from '../assets/events.jpg'
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
    <div className='font-serif text-2xl text-purple-600 flex items-center justify-center mt-4 '>Event Details</div>
    <motion.div
    whileHover="hover" 
    initial={{opacity :0}}
    animate={{opacity:2}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    className=" shadow-xl md:z-[-1] z-[-1] bg-white mt-12 relative md:mx-[430px] mx-12 pb-8 mb-12  rounded-2xl"
     variants={cardVariants}>
 <div className=''>
    <div className="  flex   justify-center items-center"><img src={img} className=" rounded h-64 w-70" alt=""></img></div>
    <div className="flex p-1  text-gray-800 font-serif  text-2xl mx-36   cursor-pointer ">{event.event_name}</div>
    <div className=" flex p-1 mx-36 font-serif text-lg text-gray-700"><span>Date </span><span className="text-purple-600  mt-1"><AiOutlineFieldTime /></span> {event.date}</div>
    <div className="flex  p-1 mx-36 text-lg text-gray-700"><span>Location</span><span className="text-purple-600  mt-1"> <CiLocationOn /></span>{event.location}</div>
    <div className=" flex p-1 mx-36 font-serif text-lg text-gray-700"><span>Capacity </span><span className="text-purple-600  mt-1"><MdReduceCapacity /></span> {event.capacity}</div>
    <div className=" flex p-1 mx-36 font-serif text-lg text-gray-700"><span>Entry Fee </span><span className="text-purple-600  mt-1"><BsCashCoin /></span> {event.entry_fee}</div>
    <div className=" flex p-1 mx-36 font-serif text-lg text-gray-700"><span>Time </span><span className="text-purple-600  mt-1"><AiOutlineFieldTime /></span> {event.time}</div>
    <div className=" hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 text-white mt-4  px-20 mx-24 pr-18 py-2  rounded-2xl flex ">Book Now</div>
    </div> 
    
  
    
   
    
    {/* <div className=" ml-4 flex text-gray-600"><span className=" font-serif ml-4  pr-2 mb-1 font-medium text-purple-600" >Sponser</span><span className="text-purple-600 pr-2 mt-1"> <FaPeopleGroup /></span> {item.artist.join(', ')}</div> */}
   
  </motion.div>
  </>
  );
};

export default EventDetail;