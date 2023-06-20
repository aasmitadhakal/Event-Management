import React, { useEffect, useState } from 'react';
import axios from 'axios';
function AlluserList() {
    const [data, setData] = useState([]);
    const username = localStorage.getItem('emailinput') 
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
        axios.get(`https://ayushkandel.pythonanywhere.com/all-user-data/`,config)
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
        
  return (
    <div>
  
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
           
         </tr>
       </thead>
       <tbody className='divide-y divide-gray-100'>
         {data.map(item => (
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
             {/* <td>

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
             <button onClick={(e)=>{DeleteData(item.id,e)}} className='bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:text-red'>delete</button></td> */}
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