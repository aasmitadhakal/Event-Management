import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard =({sidebarOpen,toggleSidebar})=>{
    return(
        <div className="flex justify-between h-screen max-h-screen overflow-y-hidden">
    <div
      className={`${
        sidebarOpen ? "w-52" : "w-0 lg:w-15 "
      } transition-all duration-300 ease-in-out absolute  lg:relative left-0 top-0`}
    >
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
    </div>
    <div className="flex-1 h-screen max-h-screen overflow-auto">
      <Navbar toggleSidebar={toggleSidebar} />
      <Outlet/>
      </div>
    </div>
    )
}
export default Dashboard