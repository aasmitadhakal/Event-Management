import React, { useState } from "react";
import { Link } from "react-router-dom";
function Notification({ recent_notification, onClose }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!recent_notification || recent_notification.length === 0) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-3 right-2 w-[400px] h-[450px] mt-[71px] text-gray-700 overflow-auto scrollbar rounded shadow-xl z-1000 bg-white border border-gray-300">
      <div className="p-3">
        {recent_notification.map((notification, index) => (
          <div
            key={index}
            className={`notification-item mb-2.5 ${
              hoveredIndex === index ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link to={`/event/${notification.event_id}`}>
            {notification.message}
            </Link>
            <br />
            <hr style={{ borderColor: "#6B7280" }} />
          </div>
        ))}
      </div>
      {/* Close button */}
      <button
        className="absolute top-0 right-0 mr-4 mt-2 text-gray-600"
        onClick={handleClose}
      >
        {/* Close */}
      </button>
    </div>
  );
}

export default Notification;






