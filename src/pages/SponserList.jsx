import { useState,useEffect } from "react"
import axios from "../api/axios";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import notify from "../utlis/notifier";
function SponserList() {
    const[data,setData]=useState()
    const [deleted, setDeleted] = useState(false);
    //getting api data
    const getData =()=>{
        axios.get('sponser/list/')
        .then (response=>{
            setData(response.data.results);
        })
        .catch(error=>{
            console.log(error)
        });
    }
    useEffect(()=>{
        getData();
    },[])
    //posting delete api
    const DeleteData=(id,e)=>{
        e.preventDefault();
        axios.delete(`/sponser/delete/${id}`)
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
     //saving data at local storage to update the values
     const settoLocalstorage =(id,sponser_type,name,amount)=>{
        localStorage.setItem("id",id)
        localStorage.setItem("sponser_type",sponser_type)
        localStorage.setItem("sname",name)
        localStorage.setItem("samount",amount)
      }
    
  return (
    <div className="  overflow-auto rounded-lg shadow mx-24 mt-12 "  >
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
    

  )
}

export default SponserList