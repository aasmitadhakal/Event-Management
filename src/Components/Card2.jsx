import Navbar from "./Navbar"
import {useState,useEffect} from 'react'
import axios from 'axios'
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
    <div>
      <Navbar/>
    <div className="card-container">
      <div className="mb-8">
        <div><p className="text-purple-600 font-bold text-xl flex justify-center item-center    ">Event</p></div>
        <div><p className="text-4xl font-bold  text-gray-700 flex justify-center item-center ">POPULAR EVENT</p></div>   
        </div>
        <div className='grid grid-cols-4 gap-4 '>
             {data&&data.map(item => (
                <div className="">
                  <div className="border">
                  <div>{item.event_name}</div>
                  <div>Date:{item.date}</div>
                  <div>Time:{item.time}</div>
                  <div>Location:{item.location}</div>
                  <div>Capacity:{item.capacity}</div>
                  <div>Entry Fee:{item.entry_fee}</div>
                  <div> Artist:{item.artist}</div>
                  <div>Sponser:{item.sponser}</div>
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