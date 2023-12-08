import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './text.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

function TextSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
       
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
        <p 
        className="text-4xl font-serif mb-2  ">To bring the joy and happiness in the  <span className=" text-purple-400 "> life of the people</span></p>
        
        </SwiperSlide>
        <SwiperSlide>
        <p 
        className="text-4xl font-serif mb-2  ">Turning events  <span className=" text-purple-400 "> into memories</span></p>
       
        </SwiperSlide> 
        <SwiperSlide>
        <p 
        className="text-4xl font-serif mb-2  ">Elevating your event to  <span className=" text-purple-400 "> the next level</span></p>

        </SwiperSlide>
      
      </Swiper>
    </>
  );
}
export default TextSlider