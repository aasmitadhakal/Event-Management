import React from "react";
import { AiOutlineClose, AiFillCaretDown,AiOutlineDown, AiOutlineKey } from "react-icons/ai";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaCodePullRequest } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { MdOutlineEventSeat } from "react-icons/md";
import {
  FaRegListAlt,
  FaBook,
  FaUser,
  FaUsers,
  FaCog,
  FaPassport,
} from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiAdminLine, RiOrganizationChart } from "react-icons/ri";
import { MdLibraryAdd, MdPassword } from "react-icons/md";
import { useState } from "react";

const activeRouteCss = "text-[#1f3d6e]";
const activetoggleCss = "text-[#1f3d6e]";
const activeHoverCss ="bg-light-white";
const routes = [
  {
    path: "/profile",
    name: "Profile",
    icon: <FaUser />,
  },
  {
    name: "Normal Users",
    icon: <CiUser />,
    submenus: [
      {
        name: "View Users",
        icon: <FaRegListAlt />,
        path: "/listuser",
      },
     
      {
        name: "Update Users",
        icon: <FaRegListAlt />,
        path: "/updateuser",
      },
    ],
  },
  {
    name: "All Users",
    icon: <FaUsers />,
    submenus: [
      {
        name: "View Users",
        icon: <FaRegListAlt />,
        path: "/alluserlist",
      },
      {
        name: "Update Users",
        icon: <FaRegListAlt />,
        path: "/alluserupdate",
      },
      
    ],
  },
  {
    name: "Artist",
    icon: <MdOutlineMedicalInformation />,
    submenus: [
      {
        name: "View Artist",
        icon: <MdLibraryAdd />,
        path: "/alist",
      },
      {
        name: "Add Artist",
        icon: <MdLibraryAdd />,
        path: "/aadd",
      },
      {
        name: "Update Artist",
        icon: <MdLibraryAdd />,
        path: "/aupdate",
      },
    ],
  },
  {
    name: "Sponser",
    icon: <FaPeopleCarryBox />,
    submenus: [
      {
        name: "View Sponser",
        icon: <FaRegListAlt />,
        path: "/sponserlist",
      },
      {
        name: "Add sponser ",
        icon: <MdLibraryAdd />,
        path: "/sponseradd",
      },
      {
        name: "Update Sponser",
        icon: <MdLibraryAdd />,
        path: "/sponserupdate",
      },
    ],
  },
  {
    path: "/eventrequest",
    name: "Event Request",
    icon: <FaCodePullRequest />,
  },
  
  {
    name: "Event",
    icon: <MdOutlineEventSeat />,
    submenus: [
      {
        name: "View Event",
        icon: <FaRegListAlt />,
        path: "/eventlist",
      },
      {
        name: "Add Event ",
        icon: <MdLibraryAdd />,
        path: "/eventadd",
      },
      {
        name: "Update Event",
        icon: <MdLibraryAdd />,
        path: "/eventupdate",
      },
    ],
  },
  {
    name: "Blog",
    icon: <MdOutlineEventSeat />,
    submenus: [
      {
        name: "View Blog",
        icon: <FaRegListAlt />,
        path: "/bloglist",
      },
      {
        name: "Add Blog ",
        icon: <MdLibraryAdd />,
        path: "/blogcreate",
      },
      {
        name: "Update Blog",
        icon: <MdLibraryAdd />,
        path: "/blogupdate",
      },
    ],
  },
  
  {
    name: "CMS",
    icon: <FaBook />,
    submenus: [
      {
        name: "Add",
        icon: <FaRegListAlt />,
        path: "/Ccreate",
      },
      {
        name: "List",
        icon: <FaRegListAlt />,
        path: "/contentlist",
      },
      {
        name: "Update",
        icon: <FaRegListAlt />,
        path: "/contentupdate",
      },
    ],
  },
  {
    name: "Setting",
    icon: <FaCog />,
    submenus: [
      {
        name: "Change Password",
        icon: <MdPassword />,
        path: "/change",
      },
      
    ],
  },
];

// const SideItem = ({ routeObj, sidebarOpen }) => {
//   const [showSubMenu, setShowSubMenu] = useState(false);
//   const toggleSubMenu = () => {
//     setShowSubMenu(!showSubMenu);
//   };
const SideItem = ({ routeObj, sidebarOpen, openIndex, setOpenIndex }) => {
  const isSubMenuOpen = openIndex === routeObj.index;

  const toggleSubMenu = () => {
    setOpenIndex(isSubMenuOpen ? null : routeObj.index);
  };

  return routeObj.submenus ? (
    <div className={`w-full h-full`} onClick={toggleSubMenu}>
      <div className="text-white cursor-pointer justify-start hover:bg-light-white py-2 px-3 rounded flex gap-4 items-center">
        <span className='text-xl '>{routeObj.icon}</span>
        <span>{routeObj.name}</span>
        <span className="ml-auto">{isSubMenuOpen ? <AiOutlineClose /> : <AiOutlineDown />}</span>
      </div>
      {isSubMenuOpen && (
        <div className="transition-all rounded flex flex-col gap-1 p-1">
          {routeObj.submenus.map((submenu, index) => {
            return (
              <NavLink
                key={index}
                to={submenu.path}
                className={`text-white justify-start font-bold px-3 hover:bg-light-white py-2 rounded flex gap-2 items-center`}
              >
                <span className="font-bold text-xl text-white">{submenu.icon}</span>
                <span>{submenu.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <NavLink
      to={routeObj.path}
      className={`px-3 rounded flex justify-start gap-4 items-center hover:bg-light-white py-2 text-white `}
    >
      <span className="font-bold text-xl text-white">{routeObj.icon}</span>
      <span>{routeObj.name}</span>
    </NavLink>
  );
};

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="cursor-pointer w-full h-screen overflow-auto z-99 bg-gradient-to-t from-blue-200 to-purple-400 font-sans font font-medium text-sm">
      {/* Top Header */}
      <div className="border-b border-b-white flex justify-between lg:justify-center items-center py-2">
        {/* <h1 className="text-xl my-2 font-medium text-white inline">Admin </h1>
        <span onClick={toggleSidebar}>
          <svg
            className="w-6 h-6 mt-3 text-white ml-2 text-xs font-medium"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </span> */}
          {
            sidebarOpen ? (
                <div className="flex gap-x-8">
             <h1 className="text-xl my-2 font-medium text-white font-serif inline">Admin </h1>
             <div className="flex ">
        <span onClick={toggleSidebar}>
       
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
          const routeObj = { ...route, index };
          return (
            <SideItem
              key={index}
              routeObj={routeObj}
              sidebarOpen={sidebarOpen}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
