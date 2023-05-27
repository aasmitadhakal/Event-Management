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
    <nav className="bg-white m-4 flex justify-between ">
      <div className="flex ">
        <span onClick={toggleSidebar}>
          <svg
            className="w-6 h-6"
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
      <div className="">
        <button
          className="bg-purple-400 hover:text-white hover:from-purple-700 hover:to-blue-400 transition-all bg-gradient-to-r from-blue-300 to-purple-600  rounded-full px-5 p-1 text-white  justify-end "
            onClick={logout}
        >
          Logouts
        </button>
      </div>
    </nav>
  );
};
export default Nav2;
