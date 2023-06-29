import React, { useEffect, useState } from 'react';
import axios from 'axios';
import notify from '../utlis/notifier';
import { Link } from 'react-router-dom';
function AlluserList() {
  const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const username = localStorage.getItem('emailinput') 
    const [deleted, setDeleted] = useState(false);
    const userPassword = localStorage.getItem('passwordinput');
    //for authorization
    const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'application/json'
        }
      };
      
    // calling api data
    const getData =()=>{
        axios.get(`https://ayushkandel.pythonanywhere.com/all-user-data-search/?search=${searchQuery}`,config)
        .then(result=>{
            setData(result.data.results)
            console.log(result.data.results)
        })
        .catch(error=>{
            console.error(error);
        })
      }
      useEffect(() => {
         getData();
        }, []);

        //saving data at local storage to update the values
     const settoLocalstorage =(id,email,name,username)=>{
      localStorage.setItem("Alluserid",id)
      localStorage.setItem("Alluseremail",email)
      localStorage.setItem("Allname",name)
      localStorage.setItem("Allusername",username)
    }
         //posting delete api
    const DeleteData=(id,e)=>{
      e.preventDefault();
      axios.delete(`https://ayushkandel.pythonanywhere.com/all-user-data-delete/${id}`,config)
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

     <div className="  overflow-auto rounded-lg shadow mx-24 mt-8 "  >
          
  
          <table className="w-full mb-4 ">
       <thead className='bg-white border-b-2 border-gray-200'>
         <tr className="">
           <th className=" p-3 text-sm font-semibold ">ID</th>
           <th className=" p-3  text-sm font-semibold ">Name</th>
           <th className=" p-3 text-sm font-semibold ">UserName</th>
           <th className=" p-3 text-sm font-semibold ">Email</th>
           <th className=" p-3 text-sm font-semibold ">is_artist</th>
           <th className=" p-3 text-sm font-semibold ">is_user</th>
           <th className=" p-3 text-sm font-semibold ">is_active</th>
           <th className=" p-3 text-sm font-semibold ">is_admin</th>
           <th className=" p-3 text-sm font-semibold ">artist</th>
           <th className=" p-3 text-sm font-semibold ">normaluser</th>
           <th className=" p-3 text-sm font-semibold ">Date_created</th>
           <th className=" p-3 text-sm font-semibold ">date_updated</th>
           <th className=" p-3 text-sm font-semibold ">Action</th>
           
         </tr>
       </thead>
       <tbody className='divide-y divide-gray-100'>
       {data && data.map(item => (
           <tr className="bg-white border-r text-center border-b text-sm text-gray-600" key={item.id}>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.id}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.name}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.username}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.email}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.is_artist?'Yes':'No'}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.is_user?'Yes':'No'}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.is_active?'Yes':'No'}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.is_admin?'Yes':'No'}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.artist?item.artist:item.artist}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.normaluser?item.normaluser:'Null'}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.date_created}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item.date_updated}</td>
             <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
              <Link to ="/alluserupdate">
              <button
                onClick={(e)=>settoLocalstorage(
                  item.id,
                  item.email,
                  item.name,
                  item.username,
                  
                )}
              className='bg-purple-400 text-white px-4 py-2 mr-4 rounded-lg  hover:bg-purple-800 hover:text-green'>Update</button></Link>
            <button
              onClick={(e)=>{DeleteData(item.id,e)}}
             className='bg-red-400 text-white px-4 py-2 mr-4 rounded-lg hover:bg-red-800 hover:text-red'>
                delete
                </button>
                </td>
           </tr>
         ))}
       </tbody>
     </table>
   {/* <ToastContainer/> */}
 
     </div>
    
     </div>
  )
}

export default AlluserList