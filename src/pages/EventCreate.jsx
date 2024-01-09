import React from 'react'
import { useState,useEffect } from 'react'
import axios from '../api/axios'
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate } from 'react-router-dom'
function EventCreate() {
    const navigate = useNavigate()
   
    const [selectedOption, setSelectedOption] = useState(''); // To store the selected option from the dropdown
    const [options, setOptions] = useState([]); // To store the options fetched from the API
    const[event_name,setEvent_name]=useState('')
    const[date,setDate]=useState('')
    const[time,setTime]=useState('')
    const[location,setLocation]=useState('')
    const[capacity,setCapacity]=useState('')
    const[entry_fee,setentry_fee]=useState('')
    const[event_completed,setevent_completed]=useState('')
    const[artist,setArtist]=useState('')
    const[sponser,setSponser]=useState('')
    const username = localStorage.getItem('emailinput') 
      const userPassword = localStorage.getItem('passwordinput');
      const [artists, setArtists] = useState([]);
      const [formData, setFormData] = useState({
          event_name: '',
          date: '',
          time: '',
          location: '',
          capacity: '',
          entry_fee: '',
          photo:null,
          artist: [],
          sponser: [],
        
  });

    // const handleEventName =(e)=>{
    //     setEvent_name(e.target.value)
    //   }
    //   const handleDate =(e)=>{
    //     setDate(e.target.value)
    //   }
    //   const handleTime =(e)=>{
    //     setTime(e.target.value)
    //   }
    //   const handleLocation =(e)=>{
    //     setLocation(e.target.value)
    //   }
    //   const handleCapacity =(e)=>{
    //     setCapacity(e.target.value)
    //   }
    //   const handleEntryFee=(e)=>{
    //     setentry_fee(e.target.value)
    //   }
      const handleEventCompleted =(e)=>{
        setevent_completed(e.target.value)
      }
     
     
      const handleIsAvailable=(e)=>{
        setevent_completed(e.target.checked)
      }
    
      //for artist input field
      const getArtistName = (artistId) => {
        const artist = artists.find((a) => a.id === artistId);
        return artist ? artist.user.name : '';
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'artist' || name === 'sponser') {
          setFormData({
            ...formData,
            [name]: value.split(',').map(item => item.trim()), // Split and trim values
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };
      const config = {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      const handleAPi = (e) => {
        e.preventDefault();
        const postData = new FormData();
        for (const key in formData) {
          if (key === 'photo') {
            postData.append('photo', formData.photo);
          } else {
            postData.append(key, formData[key]);
          }
        }
        axios
        .post("/event/create/", formData,config)
        .then((result) => {
          console.log(result.data);
          //  navigate("/eventlist",{replace:true});
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
        });
      }
     
      //geting data from artist list 
      useEffect(() => {
        // Fetch data from the API when the component mounts
        axios.get('https://ayushkandel.pythonanywhere.com/artist/list/?page=1',config)
        .then((response) => {
          setArtists(response.data.results);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
      
    
  return (
    <div className='  mt-18 flex justify-center items-center p-12 '>
    <form onSubmit={handleAPi} encType="multipart/form-data"
     className='   p-6 border bg-white shadow-md rounded'>
    <div className='mt-4 text-xl mb-8 font-bold text-purple-400 flex justify-center items-center  '>Create Event</div>
    <div className='grid grid-cols-2'>
      <div>
        {/* for eventname */}
        <div className='relative mb-8  mx-12 '>
        <label htmlFor="event_name" className="absolute   text-gray-600 cursor-text ">Heading</label>
        <input
        className="  flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer" 
        id="event_name"
        type="text"
        name="event_name"
        value={formData.event_name}
        onChange={handleChange}
        />

        </div>
        {/* for date */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="date" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Date</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        />   
       
        </div>
       
        {/* for time */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="time" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Time</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="time"
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        />   
        
       
        </div>
        
        {/* for location */}
        <div className='relative mb-4   mx-12  '> 
        <label htmlFor="location" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Location</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        />   
        </div>
       
      </div>
    
      <div>
          {/* for capacity */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="capacity" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Capacity</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="capacity"
        type="text"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        />   
        </div>
          {/* for entryfeee */}
          <div className='relative mb-4   mx-12  '> 
        <label htmlFor="entry_fee" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text  ">Entry_Fee</label>
        <input
        className=" flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors " 
        id="entry_fee"
        type="text"
        name="entry_fee"
        value={formData.entry_fee}
        onChange={handleChange}
        />   
        </div>
        <div className='relative mb-4   mx-12 '>
  <label htmlFor="artist" className='flex justify-center items-center absolute left-0 top-1 text-gray-600 mb-2 cursor-text ' >Artist:</label>
  <Select
    isMulti
    name="artist"
    style={{ width: '800px' }}
    className='flex  pt-6 justify-center items-center  py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors '
    value={formData.artist.map((artistId) => ({
      value: artistId,
      
      label: getArtistName(artistId),
    }))}
    onChange={(selectedOptions) => {
      setFormData({
        ...formData,
        artist: selectedOptions.map((option) => option.value),
      });
    }}
    options={artists.map((artist) => ({
      
      value: artist.id,
      label: artist.user.name,
    }))}
  />
</div>
{/* for sponser */}
<div className='relative mb-4   mx-12 '>
        <label className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text '>Sponsors </label>
        <input
        className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
          type="text"
          name="sponser"
          value={formData.sponser}
          onChange={handleChange}
        />
      </div>
      <div className='relative mb-4 mx-12'>
  <label htmlFor="photo" className="flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text">Photo</label>
  <input
    className="flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors"
    id="photo"
    type="file"
    name="photo"
    onChange={(e) => {
      setFormData({
        ...formData,
        photo: e.target.files[0], // Store the selected file in formData
      });
    }}
  />
</div>
      
         {/* for eventcompleted */}
         {/* <div className=' relative mb-4   mx-12    '> 
        <label htmlFor="eventcompleted" className="flex justify-center items-center absolute left-0 top-[-2] text-gray-600 cursor-text ">Event_Completed</label>
        <input type ='radio'
        className=' flex pt-2 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
             checked={event_completed}
         onChange={handleEventCompleted}
            /> 
        </div> */}
      </div>   
        {/* for buttom */}
       
        </div>
       
        <div className=' mx-44 py-2 flex items-center justify-center bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white  my-4 rounded-2xl'>
        <button className= ''>Create Event</button>
        </div>
        </form>
        </div>
        )
}

export default EventCreate