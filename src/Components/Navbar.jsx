import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {BiAlignJustify}from "react-icons/bi";
import {motion} from 'framer-motion';
import Login from "./Login";
import Register from "./Register";
import { Skeleton } from '@mui/material';
import img from '../assets/logo.jpg'
import axios from "axios";
import {MdOutlineNotificationsNone} from 'react-icons/md'
function Navbar({data}){
    const[toggle,settoggle]=useState('false')
    const[showNavbar,setShownavbar]=useState(false)
    const[hasaccount,setHasaccount]=useState(true)
    const[mobileView,setMobileview]=useState(true)
    const [navbarData, setNavbarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [navBackground, setNavBackground] = useState('bg-white');
    const handleclose=(e)=>{
      
        setShownavbar(false);
    }
   //geting heading from api 
   useEffect(() => {
    // Make an Axios request to fetch the data from your API
    axios.get('https://ayushkandel.pythonanywhere.com/dynamic-heading/list/')
      .then((response) => {
        setNavbarData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching navbar data:', error);
        setLoading(false);
      });
  }, []);
    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPosition = window.pageYOffset;
          if (currentScrollPosition > 50) {
            setNavBackground('bg-white');
           
          } else {
            setNavBackground('bg-white');
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      if (loading) {
        return (
           <>
           {/* <div className="md:flex grid-cols-1 mt-8  ">
            <div className="ml-8 pl-24 pr-2 md:pr-64"> <Skeleton variant="circle" width={30} height={30}  /></div>
            <div className="md:flex justify-around  gap-x-24">
            <div><Skeleton variant="text" width={80}   sx={{ fontSize: '1rem' }} /></div>
            <div>
            <Skeleton variant="text" width={80}   sx={{ fontSize: '1rem' }} />
            </div>
            <div>
            <Skeleton variant="text" width={80}   sx={{ fontSize: '1rem' }} />
            </div>
            <div>
            <Skeleton variant="text" width={80}   sx={{ fontSize: '1rem' }} />
            </div>
            </div>
         
           </div> */}
            </>
        );
    }
    return(
        <>
       
        <motion.div
      
         className={` ${navBackground} transition-colors duration-300  fixed top-0 z-10000  w-screen `}>
          <div className='grid grid-cols-2 border-b '>
              {/* for logo */}
              <div className="pl-4 font-bold text-2xl ml-8 mt-2"><img src={img} className="h-16 w-28"></img></div>
              <div className={"md:hidden block text-3xl font-bold ml-auto mt-2 pr-8"}
                 onClick={()=>setMobileview(!mobileView)}
               ><BiAlignJustify /></div>
                {/* for content */}
                
              <div className={`z-1000 hidden font-sans-serif text-grays z-1000 transition-all my-2 duration-500 ease-in md:w-auto bg-white w-full absolute md:static md:z-auto  md:px-0 px-36 md:flex justify-around md:mx-0  text-xl `}>
                   
                  
        
         {navbarData.map((item) => (
                <>
                <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to={`/page/${item.id}`}>{item.heading}</Link></div> 
                {/*  */}
                </>
                ))}
                <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/event'>Event</Link></div>

                  {/* for login button */}
                  <div className="my-2" ><button className=" hover:underline decoration-pink-500 decoration-clone hover:scale-125 duration-300 hover:text-purple-400   " onClick={()=>setShownavbar(true)}>Login </button></div>
                  {/* for notification */}
                  <div className="my-2 text-3xl font-bold"><MdOutlineNotificationsNone /></div>
                  </div>
                  
                </div>
                {/* for mobile view */}
                {mobileView &&(
                  <div className="font-sans-serif block md:hidden duration-150 ease-out md:ease-in text-grays z-1000 transition-all   md:w-auto bg-white w-full absolute md:static md:z-auto  md:px-0 px-36  md:grid  md:grid-cols-6 md:mx-0 z-1000 text-xl" >
                 {navbarData.map((item) => (
                <>
                <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to={`/page/${item.id}`}>{item.heading}</Link></div> 
                
                </>
                ))}
                <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/event'>Event</Link></div>
                   {/* for login button */}
                   <div className="my-2" ><button className=" hover:underline decoration-pink-500 decoration-clone hover:scale-125 duration-300 hover:text-purple-400   " onClick={()=>setShownavbar(true)}>Login </button></div>
                   <div className="my-2 text-3xl font-bold"><MdOutlineNotificationsNone /></div>
                  </div>
                )}
                
              
                {hasaccount?
                <>
                <Login onClose={handleclose} visible={showNavbar} setHasaccount={setHasaccount}  />
                </>
                :
                <>
                <Register setHasaccount={setHasaccount}  onClose={handleclose} visible={showNavbar}/>
                </>
            }
        </motion.div>
       
        </>
    )
}
export default Navbar;