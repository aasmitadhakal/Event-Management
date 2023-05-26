import Sidebar from "../Components/Sidebar";
import Nav2 from "../Components/Nav2";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const PrivateLayout =({})=>{
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen)
    }
  
    return(
        <div className="flex justify-between h-screen max-h-screen overflow-y-hidden">
    <div
      className={`${
        sidebarOpen ? "w-52" : "w-0 lg:w-15 "
      } transition-all duration-300 ease-in-out absolute lg:relative left-0 top-0`}
    >
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

    </div>
    <div className="flex-1 h-screen max-h-screen overflow-auto">
      <Nav2 toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
      <Outlet/>
      </div>
    </div>
//     <>
//     <div className=" h-screen max-h-screen overflow-auto flex flex-col">
//       <div className="flex w-full" >
//         <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSide} />
//       </div >
//       <div className="flex flex-1 bg-gray-200">
//         <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSide} />
//         <div className="w-full h-full flex flex-col px-6 py-2 bg-gray-200">
//           <Outlet />
//         </div>
//       </div>
//     </div >
//   </>
    )
}
export default PrivateLayout