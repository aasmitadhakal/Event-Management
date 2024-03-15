import React from 'react'
import img from '../assets/img4.jpg'
import {AiOutlinePlus} from 'react-icons/ai'
function RecentEvent() {
  return (
      <>
      <div className='relative'>
      <div className='w-full h-128' style={{ position: 'absolute', backgroundColor: '#051721', opacity: '0.7', zIndex: '1'}}></div>
        
        {/* Image */}
        <img className='w-full h-128' src={img} alt="Travel" style={{ zIndex: '0'}} />
        
        {/* Text */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', width: '100%', zIndex: '2' }}>
          <div className='font-montserrat font-[700]  md:text-[45px] text-[25px] leading-[56px]'>Join us for an unforgettable 
          <p>experience at our upcoming event!</p> </div>
          <p className='font-karla font-[400] md:text-[20px] text-[15px] leading-[30px'>Special offer to suit you plan</p>
        </div>
      </div>
      </>
        
  )
}

export default RecentEvent
{/* <div>
            <div className='z-[-1] relative flex mt-8 justify-center items-center '><img className='rounded w-2/3 h-84 ' src={img}></img></div>
            <div className=' z-[-1] absolute top-72 right-24 bg-white h-72 shadow-xl w-80 p-4'>
              <div className='font-semibold font-serif'>Date & Time</div>
              <div  className='text-gray-400 font-serif'>Saturday,sep-14,2023 at 20:40 pm </div>
              <div className='font-serif text-purple-600 text-lg font-medium flex mt-2 '><span className='pr-2 mt-1'><AiOutlinePlus /></span> <span className='mb-1'>Add to Calender</span></div>
              <div className='hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600 text-white mt-4  px-8 mx-8 py-2  rounded-xl'><button>Book Now(free)</button></div>
              <div className=' transition-all bg-gray-100  mt-4  px-8 mx-10 py-2  rounded-2xl'><button>Promote Program</button></div>
              <div className='transition-all bg-gray-100  mt-4  px-8 mx-10 py-2  rounded-2xl'><button>No ReFunds</button></div>
            </div>
        </div> */}
    