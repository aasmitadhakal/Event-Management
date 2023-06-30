import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';

function UserList() {
    const [searchQuery, setSearchQuery] = useState(''); 
       const [data,setData] =useState('')
    const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const [deleted, setDeleted] = useState(false);
    const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'application/json'
        }
      };
    const getData =()=>{
            axios.get(`https://ayushkandel.pythonanywhere.com/normal-user/search/?search=${searchQuery}`,config)
            .then(result=>{
                setData(result.data.results)
                console.log(result.data.results)
            })
            .catch(error=>{
                console.error(error);
            })
    }
    useEffect(()=>{
     getData()
    },[])
          //posting delete api
    const DeleteData=(id,e)=>{
      e.preventDefault();
      axios.delete(`https://ayushkandel.pythonanywhere.com/normal-user/delete/${id}`,config)
      .then(response => {
        console.log('Data deleted successfully:', response);
        notify("success","Data Deleted successfully")
        getData();
        setDeleted(true);
       
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
    }
      
  return (
    <div>
      <div className='flex justify-end items-end mx-24'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
          className='border p-2 rounded-2xl '
        />
        <button onClick={getData} className='bg-purple-400 text-white py-1 rounded-xl focus:outline-none  px-8 m-2'>Search</button>
      </div>
        <div className=''>
            <table className='rounded-lg shadow  mx-4 mt-8 mb-4'>
            <thead className='bg-white border-b-2 border-gray-200'>
              <tr className="">
                    <th className=" p-2 text-sm font-semibold ">ID</th>
                    <th className=" p-2 text-sm font-semibold ">Name</th>
                    <th className=" p-2 text-sm font-semibold ">Username</th>
                    <th className=" p-2  text-sm font-semibold ">Contact</th>
                    <th className=" p-2 text-sm font-semibold ">Gender</th>
                    <th className=" p-2 text-sm font-semibold ">Province</th>
                    <th className=" p-2 text-sm font-semibold ">District</th>
                    <th className=" p-2 text-sm font-semibold ">Municipality</th>
                    <th className=" p-2 text-sm font-semibold ">Ward</th>
                    <th className=" p-2 text-sm font-semibold ">Email</th>
                    <th className=" p-2 text-sm font-semibold ">Action</th>
              </tr>
             </thead>
             <tbody className='divide-y divide-gray-100'>
             {data&&data.map(item => (
          <tr className="bg-white border-r text-center border-b text-sm text-gray-600 " key={item.id}>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.id}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.user.name}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.user.username}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.contact}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.gender}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.province}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.district}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.municipality}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.ward}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{item.user.email}</td>
            <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
              <Link to ="">
              <button
              className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg  hover:bg-purple-800 hover:text-green'>Update</button></Link>
            <button onClick={(e)=>{DeleteData(item.id,e)}} 
             className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>delete</button></td>
         </tr>
             ))}
         </tbody>
            </table>
            <ToastContainer />
        </div>
    </div>
  )
}

export default UserList