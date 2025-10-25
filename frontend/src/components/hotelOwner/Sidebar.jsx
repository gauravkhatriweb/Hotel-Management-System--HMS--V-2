import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
  ];

  return (
    <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-r-full transition-colors duration-200 ${
              isActive
                ? "bg-gray-200 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          <img src={item.icon} alt={item.name} className="h-5 w-5" />
          <span className="md:block hidden">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
