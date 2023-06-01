import Nav2 from "../Components/Nav2";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import UserSidebar from "../Components/UserSidebar";

const UserLayout=({})=>{
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen)
    }
  
    return(
        <div className="flex justify-between h-screen max-h-screen overflow-y-hidden">
    <div
      className={`${
        sidebarOpen ? "w-52" : "w-15 "
      } transition-all duration-300 ease-in-out absolute lg:relative left-0 top-0`}
    >
      <UserSidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}  />

    </div>
    <div className="flex-1 h-screen max-h-screen overflow-auto">
      <Nav2 toggleSidebar={toggleSidebar} />
      <Outlet/>
      </div>
    </div>
//    
    )
}
export default UserLayout