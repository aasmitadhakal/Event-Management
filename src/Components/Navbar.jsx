import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {BiAlignJustify}from "react-icons/bi";
import {motion} from 'framer-motion';
import Login from "./Login";
import Register from "./Register";
import {MdOutlineNotificationsNone} from 'react-icons/md'
function Navbar(){
    const[toggle,settoggle]=useState('false')
    const[showNavbar,setShownavbar]=useState(false)
    const[hasaccount,setHasaccount]=useState(true)
    // const [navBackground, setNavBackground] = useState('bg-gray-900');
    const [navBackground, setNavBackground] = useState('bg-white');
    const handleclose=(e)=>{
      // if(e.target.id==='container') onClose()
        setShownavbar(false);
    }
    // for changing background color
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
    return(
        <>
        <motion.div
        //  initial={{y:-250}}
        //  animate ={{y:-10}}
        //  transition={{duration: 1, stiffness: 5}}
         className={` ${navBackground} transition-colors duration-300  sticky top-0  w-screen `}>
          <div className='grid grid-cols-2 border-b mt-2'>
              {/* for logo */}
              <div className="pl-4 font-bold text-2xl ml-8 mt-2"><img src="logo.jpg" className="h-16 w-28"></img></div>
              <div className={"md:hidden block text-3xl font-bold ml-auto mt-2 pr-8"}
                
               onClick={()=>settoggle(!toggle)}
               ><BiAlignJustify /></div>
                {/* for content */}
                
              <div className={` text-gray-500 z-1000 transition-all my-2 duration-500 ease-in md:w-auto bg-white w-full absolute md:static md:z-auto  md:px-0 px-36  md:grid grid md:grid-cols-6 grid-cols-1 md:mx-0  text-xl ${toggle ? 'top-14':'top-[-490px]'} `}>
                    {/* for home */}
               <div className=" my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/about us'>Home</Link></div>
                
                {/* for About us */}
                 <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/about us'>About us</Link></div>
                {/* for Contact */}
                <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/about us'>Blog</Link></div>
                 {/* for Event */}
                   <div className="my-2 decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/about us'>Events</Link></div>
                  {/* for login button */}
                  <div className="my-2" ><button className=" hover:underline decoration-pink-500 decoration-clone hover:scale-125 duration-300 hover:text-purple-400   " onClick={()=>setShownavbar(true)}>Login </button></div>
                  {/* for notification */}
                  <div className="my-2 text-3xl font-bold"><MdOutlineNotificationsNone /></div>
                  </div>
                 
                </div>
                {/* <Login onClose={handleclose} visible={showNavbar} /> */}
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