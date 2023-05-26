import { useState } from 'react'
import axios from '../api/axios'
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate } from 'react-router-dom'
function ContentCreate() {
  const navigate =useNavigate()
  const[heading,setHeading]=useState('')
  const[content,setContent]=useState('')
  const[updated_by,setUpdatedBy]=useState('')
  const[status,setStatus]=useState('')
  const username = localStorage.getItem('emailinput') 
  const userPassword = localStorage.getItem('passwordinput');
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
  const config = {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
      'Content-Type': 'application/json'
    }
  };
  const handleAPi =(e)=>{
    e.preventDefault();
    axios
    .post("/content-management/create/", {
     heading : heading,
     content: content,
     updated_by: updated_by,
     status:status,
    },config)
    .then((result) => {
      console.log(result.data);
      navigate("/contentlist",{replace:true});
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // setLoading(false);
    });
  }
  return (
    <div className='  mt-18 flex justify-center items-center p-12 '>
    <form onSubmit={handleAPi}
     className='   p-6 border bg-white shadow-md rounded'>
    <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Create Content</div>
{/* for heading */}
 <div className='relative mb-8  mx-12 '>
 <label for="email" class="absolute   text-gray-600 cursor-text ">Heading</label>
<input
className="  flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" autocomplete="off"
 id="heading"
 type="text"
 name="heading"
 value={heading}
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
onEditorChange={(value) => setContent(value)}
// onChange={handleContent}
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
onChange={handleUpadedBy}
/>   
</div>
{/* for Status */}
<div className='relative mb-4   mx-12  '> 
<label for="Password" class="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Status</label>
{/* <input
className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " autocomplete="off"
id="status"
type="text"
name="status"
value={status}
onChange={handleStatus}
/>    */}
<select
value={status}
onChange={handleStatus}
 className='flex pt-6 text-gray-800 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'>
  <option className='text-gray-400 ' value='Publish' >Publish</option>
  <option className='text-gray-400 ' value='Draft' >Draft</option>
</select>
</div>

{/* for buttom */}
<div className=''>
<button className='bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4  px-8 mx-10 py-2  rounded-2xl'>Create Content</button>
</div>
</form>
</div>
  )
}

export default ContentCreate