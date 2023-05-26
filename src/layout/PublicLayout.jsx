import { Outlet } from "react-router-dom";
 
function PublicLayout(){
    return(
        <>
        <div className="">
       
      <div className="">
     
        {/* <Navbar /> */}
        
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
        </>
    )
}
export default PublicLayout