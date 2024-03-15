import React from "react";
import {  useNavigate } from "react-router-dom";
 import {useAuth } from "../contexs/auth";

const Nav2 = ({ toggleSidebar }) => {
  const {setAuth } = useAuth();

  const logout = () => {
    sessionStorage.removeItem("token");
    setAuth({ token: null });
  };

  return (
    <nav className="bg-purple-400 p-3   flex justify-between ">
      <div className="flex ">
        
      </div>
      <div className="">
        <button
          className="bg-white rounded-full px-5 p-1  text-purple-400  justify-end "
            onClick={logout}
        >
          LogOut
        </button>
      </div>
    </nav>
  );
};
export default Nav2;
