import { useState,useEffect } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import notify from '../utlis/notifier'
import { ToastContainer } from 'react-toastify'
function ContentUpadate() {
  const navigate =useNavigate()
  const[heading,setHeading]=useState('')
  const[content,setContent]=useState('')
  const[updated_by,setUpdatedBy]=useState('')
  const[status,setStatus]=useState('')
  const[id,setID]=useState(0)
  const username = localStorage.getItem('emailinput') 
  const userPassword = localStorage.getItem('passwordinput');
  const config = {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
      'Content-Type': 'application/json'
    }
  };
   
  const handleHeading =(e)=>{
    setHeading(e.target.value)
  }
  const handleContent =(e)=>{
    setContent(e.target.value)
  }
  const handleUpadedBy =(e)=>{
    setUpdatedBy(e.target.value)
  }
  const handleStatus =(e)=>{
    setStatus(e.target.value)
  }
  const handleAPi =(e)=>{
    e.preventDefault();
    axios
    .put(`/content-management/update/${id}/`, {
     heading : heading,
     content: content,
     updated_by: updated_by,
     status:status,
    },config)
    .then((result) => {
      console.log(result.data);
      notify("success","data updated successfully")
      navigate("/contentlist",{replace:true});
      handleContent('')
      setHeading('')
      setStatus('')
      setUpdatedBy('')
      
     
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // setLoading(false);
    });
  }
  useEffect(()=>{
    setID(localStorage.getItem("id"));
   setHeading(localStorage.getItem("heading"));
   setContent(localStorage.getItem("content"));
   setStatus(localStorage.getItem("status"));
   setUpdatedBy(localStorage.getItem("updated_by"));
 },[])
  return (
    <div className='  mt-18 flex justify-center items-center p-12 '>
    <form onSubmit={handleAPi}
     className='   p-6 border bg-white shadow-md rounded'>
    <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Update Content</div>
{/* for heading */}
 <div className='relative mb-8  mx-12 '>
 <label for="email" class="absolute   text-gray-600 cursor-text ">Heading</label>
<input
className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autocomplete="off"
 id="heading"
 type="text"
 name="heading"
 value={heading}
//  defaultValue={heading}
 onChange={handleHeading}
/>

</div>
{/* for content */}
<div className='relative mb-4   mx-12  '> 
<label for="Password" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Content</label>
<Editor
className="w-24  flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " autocomplete="off"
id="content"
type="text"
name="content"
value={content}
// defaultValue={content}
 onEditorChange={(value) => setContent(value)}
//  onChange={handleContent}
// onEditorChange={(value)=>handleContent(value)}
/>   
</div>
{/* for updated_by */}
<div className='relative mb-4   mx-12  '> 
<label for="Password" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Updated_by</label>
<input
className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " autocomplete="off"
id="updated_by"
type="text"
name="updated_by"
value={updated_by}
// defaultValue={updated_by}
onChange={handleUpadedBy}
/>   
</div>
{/* for Status */}
<div className='relative mb-4   mx-12  '> 
<label for="Password" class="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Status</label>
<input
className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " autocomplete="off"
id="status"
type="text"
name="status"
value={status}
// defaultValue={status}
onChange={handleStatus}
/>   
</div>

{/* for buttom */}
<div className=''>
<button className='bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4  px-8 mx-10 py-2  rounded-2xl'>Update</button>
</div>
<ToastContainer />
</form>
</div>
  )
}

export default ContentUpadate