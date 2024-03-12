// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Pagination } from 'swiper';

// export default function Slider({ events }) {
//   return (
//     <>
//       <Swiper
//         slidesPerView={1}
//         spaceBetween={10}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 4,
//             spaceBetween: 40,
//           },
//           1024: {
//             slidesPerView: 5,
//             spaceBetween: 50,
//           },
//         }}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         {events.map((event, index) => (
//           <SwiperSlide key={index}>
//             <img src={`http://127.0.0.1:8000${event.photo}`} alt={event.event_name} />
//             <h2>{event.event_name}</h2>
//             <p>Date: {event.date}</p>
//             <p>Location: {event.location}</p>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }