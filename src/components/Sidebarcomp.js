import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">Home</li>
        <li className="sidebar-menu-item">Settings</li>
        <li className="sidebar-menu-item">Friends</li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;