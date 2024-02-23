import { useState ,useRef} from 'react'
import axios from '../api/axios'
import { Editor } from '@tinymce/tinymce-react'


import { useNavigate } from 'react-router-dom'
function ContentCreate() {
  const navigate =useNavigate()
  const[heading,setHeading]=useState('')
  const[content,setContent]=useState('')
  const[updated_by,setUpdatedBy]=useState('')
  const[status,setStatus]=useState('Publish')
  // const username = localStorage.getItem('emailinput') 
  // const userPassword = localStorage.getItem('passwordinput');
  const handleHeading =(e)=>{
    setHeading(e.target.value)
  }
 
  // const handleUpadedBy =(e)=>{
  //   setUpdatedBy(e.target.value)
  // }
  const handleUpadedBy = (e) => {
    setUpdatedBy(e.target.value);
  };
  const handleContent =(e)=>{
    setContent(e.target.value)
  }
  const handleStatus =(e)=>{
    setStatus(e.target.value)
  }
  // const config = {
  //   headers: {
  //     'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
  //     'Content-Type': 'application/json'
  //   }
  // };
  const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

  const config = {
    headers: {
        'Authorization': `Bearer ${token}`, // Use the Bearer token here
        'Content-Type': 'application/json'
    }
}
  const handleAPi =(e)=>{
    e.preventDefault();
    axios
    .post("content-management/create/", {
     heading : heading,
     content: content,
     updated_by:updated_by,
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
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  //for editor
  const handleImageUpload = (blobInfo, progress, failure) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:8000", true);

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
  return (
    <div className='  mt-18 flex justify-center items-center p-12 '>
    <form onSubmit={handleAPi}
     className='   p-6 border bg-white shadow-md rounded'>
    <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Create Content</div>
        {/* for heading */}
        <div className='relative mb-8  mx-12 '>
        <label htmlFor="heading" className="absolute   text-gray-600 cursor-text ">Heading</label>
        <input
        className="  flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" 
        id="heading"
        type="number"
        name="heading"
        value={heading}
        onChange={handleHeading}
        />

        </div>
       
         <div className='relative mb-4 mx-12'>
          
         <Editor
    apiKey="1shhj6gxnyfno4jx3wlcldgdjf7ej27d5oat6u8nldxdcuyy"
    onInit={(evt, editor) => editorRef.current = editor}
    initialValue="<p>Try adding an image with image upload!</p>"
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
        images_upload_url: "http://127.0.0.1:8000/media/Event Photos/",
        automatic_uploads: true,
        images_reuse_filename: true,
        images_upload_handler: handleImageUpload,

        // Add the setup function to make touchstart event listeners passive
        setup: function (editor) {
          editor.on('init', function () {
              const editorContainer = editor.getContainer();
              const touchStartListeners = editorContainer.querySelectorAll('*');
              touchStartListeners.forEach(function (el) {
                  el.addEventListener('touchstart', function (e) {
                      e.preventDefault();
                  }, { passive: true }); // Set { passive: true } here to mark the event listener as passive
              });
          });
      }
    }}
/>
       </div> 
     
        {/* for updated_by */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="updated_by" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Updated By</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="updated_by"
        type="text"
        name="updated_by"
        value={updated_by}
        onChange={handleUpadedBy}
        />   
        <select
        value={status}
        onChange={handleStatus}
        className='flex pt-6 text-gray-800 justify-center items-center border-b py-1 px-10 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'>
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