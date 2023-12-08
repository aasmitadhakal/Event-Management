import React from 'react'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {IoLocationSharp} from 'react-icons/io5'
import { FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
function Fotter() {
  return (
    <div className='bg-black text-white'>
        <div className='grid grid-cols-3 p-10 mx-36 '>
            {/* for quick link */}
            <div className='text-lg'>
                <ui className='text-xl font-semibold font-sans'>Quick Link</ui>
                <li>About Us</li>
                <li>Event</li>
                <li>Contact</li>
                <li>Upcoming Event</li>
                <li>Blog</li>
            </div>
            {/* for midtext */}
            <div>
                <div className='text-xl font-semibold font-sans text-white '>Join Us</div>
                <div className='flex gap-2 text-xl mt-2'>
                <div><FaFacebookF/></div>
                <div><CiInstagram/></div>
                <div><FaWhatsapp /></div>
                </div>
                
            </div>
            {/* contact */}
            <div className='p-1'>
            <ui className='text-xl font-semibold font-sans list-outside'>Contact</ui>
                <div  className='flex '><span className='mx-2'><BsFillTelephoneFill/></span>9846464646</div>
                <div className='flex'><span className='mx-2'><MdEmail/></span >Email</div>
                <div className='flex'><span className='mx-2'><IoLocationSharp /></span>Location</div>
            </div>
        </div>
        <div className='flex items-center justify-center border-t  pb-4'>© 2014-2023 Mockplus Technology Co., Ltd. All rights reserved.</div>
    </div>
  )
}

export default Fotter