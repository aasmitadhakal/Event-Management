import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiAlignJustify } from "react-icons/bi";
import { motion } from 'framer-motion';
import Login from "./Login";
import Register from "./Register";
import { Skeleton } from '@mui/material';
import img from '../assets/logo.jpg';
import axios from "../api/axios";
import './index.css'
import { MdOutlineNotificationsNone } from 'react-icons/md';
import Notification from "./Notification";

function Navbar({ toggleNotifications }) {
    // const navigate = useNavigate();
    const [toggle, settoggle] = useState(false); //'false'
    const [showNavbar, setShownavbar] = useState(false);
    const [hasaccount, setHasaccount] = useState(true);   
    const [mobileView, setMobileview] = useState(true);
    const [navbarData, setNavbarData] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [navBackground, setNavBackground] = useState('bg-white');
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [highlightNotifications, setHighlightNotifications] = useState(false);


    const handleToggleNotifications = (e) => {
        e.stopPropagation();
        setShowNotifications((prevShowNotifications) => !prevShowNotifications);
        setUnreadCount(0); // Reset unread count when opening notifications
        setHighlightNotifications(false); // Remove highlight when opening notifications
    };

    const handleToggleNavbar = () => {
        setShownavbar((prevShowNavbar) => !prevShowNavbar);
        setShowNotifications(false); // Close notification panel when toggling navbar
    };

    const handleclose = (e) => {
        setShownavbar(false);
        setShowNotifications(false);
    };

    const handleReadNotification = () => {
        // Decrease unread count when a notification is read
        setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
      };

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 100); // Change to 100 to trigger sticky behavior after scrolling 100 pixels
       
      };
      window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    useEffect(() => {
        axios.get('dynamic-heading/list/')
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

    useEffect(() => {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/notification/");

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            const recent_notification = parsedData.recent_notifications;
            console.log(recent_notification);
            setNotifications((prevNotifications) => [...prevNotifications, ...recent_notification]);
            setUnreadCount((prevCount) => prevCount + 1);
            setHighlightNotifications(true); // Highlight the notifications button when new notifications arrive
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            ws.close();
        };
    }, []);

    if (loading) {
        return null;
    }

    return (
        <>
            <motion.div className={` ${navBackground} fixed top-0     transition-colors duration-300  z-10000  w-screen  `}>
                <div className='grid grid-cols-2 shadow-xl h-20 '>
                    <div className="pl-4 font-bold text-2xl ml-8 mt-2"><img src={img} className="h-16 w-28" /></div>
                    <div className={"md:hidden block text-3xl font-bold ml-auto mt-2 pr-8"} onClick={() => setMobileview(!mobileView)}><BiAlignJustify /></div>
                    <div className={`z-1000 hidden font-sans-serif text-grays z-1000 transition-all my-2 duration-500 ease-in md:w-auto bg-white w-full absolute md:static md:z-auto  md:px-0 px-36 md:flex justify-around md:mx-0  text-xl `}>
                        {navbarData.map((item, index) => (
                            <div key={index} className="my-2 decoration-clone hover:scale-125 duration-300 hover:text-purple-400">
                                <Link to={`/page/${item.id}`}>{item.heading}</Link>
                            </div>
                        ))}
                        <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/blog'>Blog</Link></div>
                        <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/event'>Event</Link></div>
                        <div className="my-2">
                            <button className="hover:underline decoration-pink-500 decoration-clone hover:scale-125 duration-300 hover:text-purple-400" onClick={handleToggleNavbar}>Login</button>
                        </div>
                        <div className="my-2 text-3xl font-bold">
                            <MdOutlineNotificationsNone onClick={(e) => handleToggleNotifications(e)} className={highlightNotifications ? "text-purple-500" : ""} />
                            {unreadCount > 0 && (
                                // <span className="bg-red-500 text-white rounded-full px-2 ml-1">
                                // <span className="bg-red-500 text-white rounded-full px-2 ml-1 absolute top-0.5 right-0.5 text-xs">
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center absolute top-1 right-1 text-xs">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {mobileView && (
                    <div className="font-sans-serif block md:hidden duration-150 ease-out md:ease-in text-grays z-1000 transition-all   md:w-auto bg-white w-full absolute md:static md:z-auto  md:px-0 px-36   md:grid-cols-6 md:mx-0 z-1000 text-xl" >
                        {navbarData.map((item, index) => (
                            <div key={index} className="my-2 decoration-clone hover:scale-125 duration-300 hover:text-purple-400">
                                <Link to={`/page/${item.id}`}>{item.heading}</Link>
                            </div>
                        ))}
                        <div className="my-2  decoration-clone hover:scale-125 duration-300 hover:text-purple-400"><Link to='/event'>Event</Link></div>
                        <div className="my-2  " ><button className=" hover:underline decoration-pink-500 decoration-clone hover:scale-125 duration-300 hover:text-purple-400" onClick={handleToggleNavbar}>Login</button></div>
                        <div className="my-2 text-3xl font-bold">
                            <MdOutlineNotificationsNone onClick={(e) => handleToggleNotifications(e)} />
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white rounded-full px-2 ml-1">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                {hasaccount ?
                    <Login onClose={handleclose} visible={showNavbar} setHasaccount={setHasaccount} />
                    :
                    <Register setHasaccount={setHasaccount} onClose={handleclose} visible={showNavbar} />
                }
            </motion.div>
            {showNotifications && <Notification recent_notification={notifications} onClose={handleclose} />}
        </>
    );
}

export default Navbar;


