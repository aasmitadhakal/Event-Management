import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArtistList() {
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
      const { results,count } = response.data;
      setData(results);
      setTotalPages(Math.ceil(count / 10)); // Assuming 10 items per page
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };
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
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="flex items-center justify-center mt-4">
        <button
          className="px-3 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={handlePrevPage}
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`px-3 py-2 mx-1 ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            } rounded`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-2 ml-2 bg-blue-500 text-white rounded"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    );
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
      {renderPagination()}
    </div>
  );
}

export default ArtistList