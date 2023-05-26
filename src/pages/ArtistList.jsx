import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate,Link } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';


function ContentList() {
    const[search,setSearch]=useState('') 
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const settoLocalstorage =(id,heading,content,updated_by,status)=>{
      localStorage.setItem("id",id)
      localStorage.setItem("heading",heading)
      localStorage.setItem("content",content)
      localStorage.setItem("updated_by",updated_by)
      localStorage.setItem("status",status)
    }
    const username = localStorage.getItem('emailinput') // Replace with your username
    const userPassword = localStorage.getItem('passwordinput'); // Replace with your password
  
    const config = {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
        'Content-Type': 'application/json'
      }
    };
    const getData =()=>{
      axios.get('/content-management/list/',config)
      .then(response => {
        setData(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
    }
    useEffect(() => {
       getData();
      }, []);
    const DeleteData=(id,e)=>{
      e.preventDefault();
      axios.delete(`/content-management/delete/${id}`)
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
    <>
    <div className='flex justify-end  mt-12'>
    
    <input type='text'
         placeholder='search status...'
         name='search'
        autoComplete='off'
        aria-label='Search talk'
        onChange={(e)=> setSearch(e.target.value)}
          className='pl-18 focus:outline-none   px-3 py-2 font-semibold placeholder-gray-500 text-black focus:ring-purple-500 focus:border-none rounded-2xl border-none ring-2 ring-gray-300  focus:ring-2'
          />
          <Link to='/Ccreate'> <button className='bg-purple-400 mr-24 ml-4 text-white  py-2 px-8 rounded-xl'>Add +</button></Link>
           
          </div>
    <div className="  overflow-auto rounded-lg shadow mx-24 mt-12 "  >
        
         <table className="w-full mb-8 ">
      <thead className='bg-white border-b-2 border-gray-200'>
        <tr className="">
          <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
          <th className="w-44 p-3 text-sm font-semibold tracking-wide text-left">Heading</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Content</th>
          {/* <th>Date Created</th>
          <th>Date Updated</th> */}
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Updated By</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
          <th className="w-44 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
          
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100'>
        {data.filter((item)=>{
          return search.toLowerCase()===''? item : item.status.toLowerCase().includes(search)
        }).map(item => (
          <tr className="bg-white border-r text-center border-b text-sm text-gray-600" key={item.id}>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.id}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.heading}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.content}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.updated_by}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.status}</td>
            <td>
              <Link to ="/put">
              <button
                onClick={(e)=>settoLocalstorage(
                  item.id,
                  item.heading,
                  item.content,
                  item.updated_by,
                  item.status,
                )}
              className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg  hover:bg-purple-800 hover:text-green'>Update</button></Link>
            <button onClick={(e)=>{DeleteData(item.id,e)}} className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  <ToastContainer/>

    </div>
    </>
  )
}

export default ContentList