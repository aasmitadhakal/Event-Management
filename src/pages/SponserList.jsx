import { useState,useEffect } from "react"
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import notify from "../utlis/notifier";
function SponserList() {
    const[data,setData]=useState()
    const [deleted, setDeleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    //getting api data
    const fetchData = () => {
      axios
        .get(`https://ayushkandel.pythonanywhere.com/sponser/list/?page=${currentPage}`)
        .then(response => {
          const { results, count } = response.data;
          setData(results);
          setTotalPages(Math.ceil(count / 10)); // Assuming 10 items per page
        })
        .catch(error => {
          console.error('Error fetching API data:', error);
        });
    };
    useEffect(()=>{
        fetchData();
    },[currentPage])

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
      //for pagination part
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
      );
    };
  
    //posting delete api
    const DeleteData=(id,e)=>{
        e.preventDefault();
        axios.delete(`https://ayushkandel.pythonanywhere.com/sponser/delete/${id}`)
        .then(response => {
          console.log('Data deleted successfully:', response);
          notify("success","Data Deleted successfully")
          fetchData();
          setDeleted(true);
         
        })
        .catch(error => {
          console.error('Error deleting data:', error);
        });
      }
     //saving data at local storage to update the values
     const settoLocalstorage =(id,sponser_type,name,amount)=>{
        localStorage.setItem("sid",id)
        localStorage.setItem("sponser_type",sponser_type)
        localStorage.setItem("sname",name)
        localStorage.setItem("samount",amount)
      }
    
  return (
    <div>
    <div className="  overflow-auto rounded-lg shadow mx-24 mt-4  "  >
         <table className="w-full mb-8 ">
      <thead className='bg-white border-b-2 border-gray-200'>
        <tr className="">
          <th className="w-20 p-3 text-sm font-semibold ">ID</th>
          <th className="w-44 p-3 text-sm font-semibold ">Sponser Type</th>
          <th className="w-24 p-3 text-sm font-semibold ">Name</th>
          <th className="w-24 p-3 text-sm font-semibold ">Amount</th>
          <th className="w-44 p-3 text-sm font-semibold ">Action</th>
          
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100'>
        {data&&data.map(item => (
          <tr className="bg-white border-r text-center border-b text-sm text-gray-600" key={item.id}>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.id}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.sponser_type}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.name}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.amount}</td>

            <td>
              <Link to ="/sponserupdate">
              <button
                onClick={(e)=>settoLocalstorage(
                  item.id,
                  item.sponser_type,
                  item.name,
                  item.amount,
                  
                )}
              className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg  hover:bg-purple-800 hover:text-green'>Update</button></Link>
            <button
              onClick={(e)=>{DeleteData(item.id,e)}}
             className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>
                delete
                </button>
                </td>
          </tr>
        ))}
      </tbody>
    </table>
   
  <ToastContainer/>

    </div>
    {renderPagination()}
    </div>

  )
}

export default SponserList