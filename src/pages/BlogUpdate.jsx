import { useState,useEffect,useRef } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import notify from '../utlis/notifier'
import { ToastContainer } from 'react-toastify'
function BlogUpdate() {
  const navigate =useNavigate()
  const[id,setID]=useState(0)
  const[content,setContent]=useState('')
 
  const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage
//for editor
  //for editor
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleImageUpload = (blobInfo, progress, failure) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8000/server.php", true);

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      //console.log(blobInfo.filename())

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
        if (progress && typeof progress === "function") {
          const percent = 0;
          progress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject({ message: "Image upload failed", remove: true });
        if (failure && typeof failure === "function") {
          failure("Image upload failed");
        }
      };

      xhr.send(formData);
    });
  };
  const config = {
    headers: {
        'Authorization': `Bearer ${token}`, // Use the Bearer token here
        'Content-Type': 'application/json'
    }
}
   
 
  const handleContent =(e)=>{
    setContent(e.target.value)
  }
  
  const handleAPi =(e)=>{
    e.preventDefault();
    axios
    .put(`/blog/update/${id}/`, {
     
     content: content,
     
    },config)
    .then((result) => {
      console.log(result.data);
      notify("success","data updated successfully")
      navigate("/bloglist",{replace:true});
      handleContent('')
    
     
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // setLoading(false);
    });
  }
      useEffect(()=>{
        setID(localStorage.getItem("bid"));
       
        setContent(localStorage.getItem("blogcontent"));
       
    },[])
  return (
    <div className='  mt-18 flex justify-center items-center p-12 '>
      <form onSubmit={handleAPi}
        className='   p-6 border bg-white shadow-md rounded'>
        <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Update Content</div>
         
        {/* for content */}
         <div className='relative mb-4   mx-12  '> 
          <label htmlFor="Password" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Content</label>
           
          <Editor
      
      apiKey="no-api-key"
      onInit={(evt, editor) => editorRef.current = editor}
      // initialValue=""
      name="content"
      value={content}
      onEditorChange={(value) => setContent(value)}
      init={{
        height: 500,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          
        ],
        toolbar:
          "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        images_upload_url: "http://localhost:8000/server.php",
        automatic_uploads: true,
        images_reuse_filename: true,
        images_upload_handler: handleImageUpload,
      }}
        

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

export default BlogUpdate