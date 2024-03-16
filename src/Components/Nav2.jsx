import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexs/auth";

const Nav2 = ({ toggleSidebar }) => {
  const { setAuth } = useAuth();

  const logout = () => {
    sessionStorage.removeItem("token");
    setAuth({ token: null });
  };

  return (
    <nav className="bg-purple-400 p-3 h-[59px] flex justify-between sticky top-0 z-10">
      <div className="flex"></div>
      <div className="">
        <button
          className="bg-white rounded-full px-5 py-1 text-purple-400 justify-end"
          onClick={logout}
        >
          LogOut
        </button>
      </div>
    </nav>
  );
};

export default Nav2;