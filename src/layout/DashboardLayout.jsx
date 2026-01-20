import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaPlusCircle,
  FaClipboardList,
  FaTasks,
} from "react-icons/fa";
import logo from "../assets/logo.jpg";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role || "user"; // default role

  // Links based on role
  const links = [
    {
      name: "Overview",
      to: "/dashboard",
      icon: <FaTasks />,
      roles: ["user", "admin"],
    },
    {
      name: "Add Food",
      to: "/dashboard/add-food",
      icon: <FaPlusCircle />,
      roles: ["user"],
    },
    {
      name: "Manage My Foods",
      to: "/dashboard/manage-foods",
      icon: <FaTasks />,
      roles: ["user"],
    },
    {
      name: "My Requests",
      to: "/dashboard/my-requests",
      icon: <FaClipboardList />,
      roles: ["user"],
    },
    {
      name: "All Requests",
      to: "/dashboard/requests",
      icon: <FaClipboardList />,
      roles: ["admin"],
    },
    {
      name: "Manage Users",
      to: "/dashboard/users",
      icon: <FaUsers />,
      roles: ["admin"],
    },
    {
      name: "Profile",
      to: "/dashboard/profile",
      icon: <FaUser />,
      roles: ["user", "admin"],
    },
  ];

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 shadow-sm">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-4"></div>
          <div className="flex-none">
            <div className="avatar"></div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col bg-base-200 w-64">
          <ul className="menu p-4 w-full space-y-1">
            {links
              .filter((link) => link.roles.includes(role))
              .map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        isActive ? "bg-gray-300 dark:bg-gray-600" : ""
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
