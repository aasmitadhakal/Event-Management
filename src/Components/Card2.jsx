import Navbar from "./Navbar"
import {useState,useEffect} from 'react'
import axios from 'axios'
import {BsCalendar2Date }from 'react-icons/bs'
import {AiOutlineFieldTime} from 'react-icons/ai'
import {CiLocationOn} from 'react-icons/ci'
import {MdReduceCapacity} from 'react-icons/md'
import {BsCashCoin} from 'react-icons/bs'
import {BsPeople} from 'react-icons/bs'
import {FaPeopleGroup} from 'react-icons/fa6'
import img from '../assets/card.jpg'
function Card2() {
  const [data,setData] =useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const username = localStorage.getItem('emailinput') 
  const userPassword = localStorage.getItem('passwordinput');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const config = {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
      'Content-Type': 'application/json'
    }
  } 
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
    <div className="z-0">
      <Navbar/>
    <div className="card-container">
      <div className="my-8">
        <div><p className="text-purple-600 font-bold text-xl flex justify-center item-center    ">Event</p></div>
        <div><p className="text-4xl font-bold  text-gray-700 flex justify-center item-center ">POPULAR EVENT</p></div>   
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:mx-8 mx-12 '>
             {data&&data.map(item => (
               
                  <div className="shadow-md hover:shadow-xl hover:translate-y-0.5 ">
                 
                  <div className="flex items-center justify-center z-0"><img src={img} alt=""></img></div>
                  <div className="flex items-center justify-center text-gray-400 hover:text-purple-600  text-xl hover:text-2xl cursor-pointer ">{item.event_name}</div>
                  <div className=" ">
                    <div className="">
                  <div className="ml-4 flex font-serif text-gray-600"><span className="ml-4 mb-1 pr-1 font-serif text-l text-purple-600">Date</span> <span className="text-purple-600 pr-2 mt-1"><BsCalendar2Date /></span> {item.date}</div>
                  <div className=" ml-4 flex text-gray-600"><span className="font-serif ml-4 mb-1  pr-2 font-medium  text-purple-600">Time</span><span className="text-purple-600 pr-2 mt-1"> <AiOutlineFieldTime /></span>{item.time}</div>
                  <div className="flex ml-4 text-gray-600"><span className="font-serif ml-4 mb-1  pr-2 font-medium text-purple-600">Location</span><span className="text-purple-600 pr-2 mt-1"> <CiLocationOn /></span>{item.location}</div>
                  <div className=" ml-4 text-gray-600 flex"><span className="text-purple-600 mb-1 font-serif ml-4  pr-2 font-medium">Capacity</span><span className="text-purple-600 pr-2 mt-1"> <MdReduceCapacity /></span>{item.capacity}</div>
                  </div>
                  <div>
                  <div className=" ml-4 flex text-gray-600"><span className="font-serif ml-4 mb-1  pr-2 font-medium text-purple-600">Entry Fee</span><span className="text-purple-600 pr-2 mt-1"> <BsCashCoin /></span>{item.entry_fee}</div>
                  <div className="ml-4 flex text-gray-600"> <span className="font-serif  ml-4 mb-1 pr-2 font-medium text-purple-600">Artist</span><span className="text-purple-600 pr-2 mt-1"> <BsPeople /></span>{item.artist}</div>
                  <div className=" ml-4 flex text-gray-600"><span className=" font-serif ml-4  pr-2 mb-1 font-medium text-purple-600" >Sponser</span><span className="text-purple-600 pr-2 mt-1"> <FaPeopleGroup /></span> {item.sponser}</div>
                  </div>
                  </div>
                  </div>
              
             ))}
         </div>

    </div>
    {renderPagination()}
    </div>
  )
}

export default Card2