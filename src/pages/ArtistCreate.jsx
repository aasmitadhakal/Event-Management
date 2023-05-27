import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate,Link } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';


function ArtistCreate() {
  const [statuss, setStatuss] = useState('Publish');
    const navigate = useNavigate()
    const [data, setData] = useState([]);
     const [deleted, setDeleted] = useState(false);
     const username = localStorage.getItem('emailinput') 
     const userPassword = localStorage.getItem('passwordinput');
    const settoLocalstorage =(id,heading,content,updated_by,status)=>{
      localStorage.setItem("id",id)
      localStorage.setItem("heading",heading)
      localStorage.setItem("content",content)
      localStorage.setItem("updated_by",updated_by)
      localStorage.setItem("status",status)
    }

    const handleStatusChange =(event)=>{
      setStatuss(event.target.value);
    };
    const config = {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
        'Content-Type': 'application/json'
      }
    };
    
    const getData =()=>{
      axios.get(`https://ayushkandel.pythonanywhere.com/content-management/list/search/${statuss}`,config)
      .then(response => {
        setData(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
    }
    useEffect(() => {
       getData();
      }, [statuss]);
      
    const DeleteData=(id,e)=>{
      e.preventDefault();
      axios.delete(`/content-management/delete/${id}`,config)
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
   <div className='flex justify-end mr-24 '>
   <Link to='/Ccreate'> <button className='bg-purple-400  ml-4 text-white  py-2 mt-4 mr-2 px-8 rounded-xl hover:bg-purple-900'>Add</button></Link>
         <select className='w-44  hover:bg-purple-900 focus:outline-none bg-purple-400 text-white my-4 flex justify-center items-center py-2 px-6 rounded-xl ' value={statuss} onChange={handleStatusChange}>
        <option value='' className=''>Fliter Status</option>
        <option value="Draft">Draft</option>
        <option value="Publish">Publish</option>
      
      </select>
      </div>
    <div className="  overflow-auto rounded-lg shadow mx-24 mt-8 "  >
         
 
         <table className="w-full mb-8 ">
      <thead className='bg-white border-b-2 border-gray-200'>
        <tr className="">
          <th className=" p-3 text-sm font-semibold ">ID</th>
          <th className=" p-3  text-sm font-semibold ">Heading</th>
          <th className=" p-3 text-sm font-semibold ">Content</th>
          {/* <th>Date Created</th>
          <th>Date Updated</th> */}
          <th className=" p-3 text-sm font-semibold ">Updated By</th>
          <th className=" p-3 text-sm font-semibold ">Status</th>
          <th className=" p-3 text-sm font-semibold ">Action</th>
          
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100'>
        {data.map(item => (
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

export default ArtistCreate