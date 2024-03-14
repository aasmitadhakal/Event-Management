import React from "react";
function Notification({ recent_notification, onClose }) {
  if (!recent_notification || recent_notification.length === 0) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 w-96 h-1/2 mt-[71px] text-gray-700 overflow-auto scrollbar rounded shadow-xl z-1000">
      <div className="p-4">
        {recent_notification.map((notification, index) => (
          <div key={index}>{notification.message}<br /><hr /> </div>
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
