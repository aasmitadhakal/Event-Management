import React from "react";
import { NavLink } from "react-router-dom";
import { BsGraphUpArrow ,BsTicketDetailed} from "react-icons/bs";

import {
  FaRegListAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import {AiOutlineDown} from "react-icons/ai"
import {MdPassword} from "react-icons/md"
import { useState } from "react";

const activeRouteCss = "text-[#1f3d6e]";
const activetoggleCss = "text-[#1f3d6e]";
const activeHoverCss ="bg-light-white";
const routes = [
  {
    path: "/artistprofile",
    name: "Profile",
    icon: <FaUser />,
  },
  
  
  {
    path: "/artistgraph",
    name: "Graph",
    icon: <BsGraphUpArrow />,
  },
  {
    path: "/artisteventdetail",
    name: "Event Detail",
    icon: <BsTicketDetailed />,
  },
  {
    path: "/artistcreatename",
    name: "Create Event",
    icon: <BsTicketDetailed />,
  },
  {
    path: "/artistchangepassword",
    name: "Change Password",
    icon: <MdPassword />,
  },
 
 
];

const SideItem = ({ routeObj }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return routeObj.submenus ? (
    <div className={`w-full  h-full `} onClick={toggleSubMenu}>
        {/* for submenu */}
      <div className=" text-white  cursor-pointer justify-start  hover:bg-light-white py-2  px-3  rounded flex gap-4 items-center">
        <span className={`text-xl ${showSubMenu && activetoggleCss && activeRouteCss }`}>
          {" "}
          {routeObj.icon}
        </span>
        {<span> {routeObj.name}</span>}
          <span className="ml-auto">{<AiOutlineDown />}</span>
      </div>
      {showSubMenu && (
        <div className="transition-all rounded  flex flex-col gap-1 p-1">
          {routeObj.submenus.map((submenu, index) => {
            return (
              <NavLink
                to={submenu.path}
                className={({ isActive }) =>
                `text-white justify-start  font-bold  px-3  hover:bg-light-white py-2  rounded flex  gap-2 items-center ${
                    isActive && activeRouteCss && activeHoverCss
                  } `
                }
              >
                <span className="font-bold text-xl ">{submenu.icon}</span>
                {  <span>{submenu.name}</span>}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <NavLink
      to={routeObj.path}
      className={({ isActive }) =>
        `  px-3   rounded flex justify-start gap-4 items-center hover:bg-light-white py-2 text-white ${
            isActive && activeRouteCss && activeHoverCss
        }`
      }
    >
        {/* for name like profile */}
      <span className="font-bold text-xl ">{routeObj.icon}</span>
      {<span>{routeObj.name}</span>}
    </NavLink>
  );
};

const ArtistSidebar = ({sidebarOpen,toggleSidebar }) => {
  return (
    <>
      <div className=" shadow-xl cursor-pointer w-full h-screen overflow-auto z-99 bg-gradient-to-t bg-gradient-to-t from-blue-200 to-purple-400 text-white  font-sans font font-medium text-sm">
        {/* Top Header */}
        <div className=" border-b border-red-500 border-b-white flex justify-between lg:justify-center items-center py-2">
           {/* <div className="h-12 w-12 ">
            <img src="images.png" className="rounded-2xl"></img>
           </div> */}
           {
            sidebarOpen ? (
                <div className="flex">
             <h1 className="text-xl my-2 font-medium text-purple font-serif inline">Artist Profile </h1>
             <div className="flex">
        <span onClick={toggleSidebar}>
         {/* <FiArrowRightCircle className='absolute -right-8 top-2 w-6 h-6 text-white ml-2 mt-1 text-xs font-medium' /> */}
          <svg
            className="  w-6 h-6 mt-3 text-white ml-2  text-xs font-medium"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          </span>
         </div>
             </div>
            )
            :
            (
            <div onClick={toggleSidebar}>
                <span onClick={toggleSidebar}>
         {/* <FiArrowRightCircle className='absolute -right-8 top-2 w-6 h-6 text-white ml-2 mt-1 text-xs font-medium' /> */}
          <svg
            className="  w-6 h-6 text-white ml-2 mt-1 text-xs font-medium"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>
                </div>
            )
           }
             
          
        </div>
        {/* Routes Area */}
        <div className="w-full mt-3 p-3 flex flex-col gap-3">
          {routes.map((route, index) => {
            return <SideItem  key={index} routeObj={route}  />;
          })}
        </div>
      </div>
    </>
  );
};

export default ArtistSidebar;
