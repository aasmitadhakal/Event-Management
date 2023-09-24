import React, { useEffect, useState } from 'react';
import axios from 'axios';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';
function ArtistCreate() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://ayushkandel.pythonanywhere.com/sponser/list/?page=${currentPage}`
      );
      const { results, count } = response.data;
      setData(results);
      setTotalPages(Math.ceil(count / 10)); // Assuming 10 items per page
    } catch (error) {
      // console.error('Error fetching API data:', error);
    
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
    <table className="min-w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sponsor Type</th>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.sponser_type}</td>
            <td>{item.name}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
        onClick={handlePrevPage}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleNextPage}
      >
        Next
      </button>
      
    </div>
    <ToastContainer />
  </div>
  )
}

export default ArtistCreate