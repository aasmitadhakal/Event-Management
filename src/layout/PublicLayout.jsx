import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Notification from "../Components/Notification";

function PublicLayout() {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <Navbar toggleNotifications={toggleNotifications} />
      {showNotifications && <Notification />}
      <Outlet />
    </>
  );
}

export default PublicLayout;