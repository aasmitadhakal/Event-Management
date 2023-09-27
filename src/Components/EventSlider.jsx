
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination ,Autoplay} from "swiper";
import img from '../assets/card.jpg'
import {useState,useEffect} from 'react'
import axios from 'axios'
function EventSlider() {
    const [data,setData] =useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const getData =()=>{
        axios.get(`https://ayushkandel.pythonanywhere.com/event/search/?search=${searchQuery}&page=${currentPage}`,config)
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
const config = {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
      'Content-Type': 'application/json'
    }
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
    <>
    <div className="z-[-1]">
    <div className=" mb-12">
    <div className="mb-8">
        <div><p className="text-purple-600 font-bold text-xl flex justify-center item-center    ">Event</p></div>
       <div><p className="text-4xl font-bold  text-gray-700 flex justify-center item-center ">POPULAR EVENT</p></div> 
        </div>
    </div>
    <div className="mb-8">
     <Swiper

        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper ,z-[-1]"
      >
        
        <div className="card-container">
      {/* <div className="mb-8">
        <div><p className="text-purple-600 font-bold text-xl flex justify-center item-center    ">Event</p></div>
        <div><p className="text-4xl font-bold  text-gray-700 flex justify-center item-center ">POPULAR EVENT</p></div>   
        </div> */}
        <div className=' '>
             {data&&data.map(item => (
               <SwiperSlide>
                  <div className="shadow-md hover:shadow-xl hover:translate-y-0.5 ">
                 
                  <div className="flex items-center justify-center z-0"><img src={img} alt=""></img></div>
                  <div className="flex items-center justify-center text-gray-400   text-2xl ">{item.event_name}</div>
                  <div className=" ">
                    <div className="">
                  <div className="ml-4 flex font-serif text-gray-600"><span className=" ml-2  font-serif text-l">Date:</span> :{item.date}</div>
                  <div className=" ml-4 text-gray-600"><span className="font-serif  ml-2 mb-4 font-medium">Time:</span>:{item.time}</div>
                  <div className=" ml-4 text-gray-600"><span className="font-serif  ml-2 mb-4 font-medium">Location:</span>{item.location}</div>
                  <div className=" ml-4 text-gray-600"><span className="font-serif  ml-2 mb-4 font-medium">Capacity:</span>{item.capacity}</div>
                  </div>
                  <div>
                  <div className=" ml-4 text-gray-600"><span className="font-serif  ml-2 mb-4 font-medium">Entry Fee:</span>{item.entry_fee}</div>
                  <div className="ml-4  text-gray-600"> <span className="font-serif   ml-2 mb-4 font-medium">Artist:</span>{item.artist}</div>
                  <div className=" ml-4 text-gray-600"><span className=" font-serif  ml-2 mb-4 font-medium">Sponser:</span>{item.sponser}</div>
                  </div>
                  </div>
                  </div>
                  </SwiperSlide>
             ))}
         </div>
         {renderPagination()}
    </div>
       
       
        

      </Swiper>
      </div>
      <div className="mt-12"></div>
      </div>
    </>
  )
}

export default EventSlider