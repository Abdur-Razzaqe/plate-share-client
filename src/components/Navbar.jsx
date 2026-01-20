import { Link, NavLink, useNavigate } from "react-router";
import { GoHomeFill } from "react-icons/go";
import {
  IoFastFoodOutline,
  IoLogIn,
  IoLogOut,
  IoMoon,
  IoSunny,
  IoGridOutline,
} from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import logo from "../assets/logo.jpg";
import icon from "../assets/icon.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser(navigate);
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const activeClass = "text-pink-600 border-b-2 border-pink-600 font-semibold";

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* ---------- Left ---------- */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? activeClass : "")}
                >
                  <GoHomeFill /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/available-foods"
                  className={({ isActive }) => (isActive ? activeClass : "")}
                >
                  <IoFastFoodOutline /> Available Foods
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? activeClass : "")}
                  >
                    <IoGridOutline /> Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={logo} className="w-9 h-9 rounded-full" />
            <span className="text-red-500">Plate</span>
            <span className="text-green-600">Share</span>
          </Link>
        </div>

        {/* ---------- Center ---------- */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-6 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <GoHomeFill /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/available-foods"
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <IoFastFoodOutline /> Available Foods
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? activeClass : "")}
                >
                  <IoGridOutline /> Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* ---------- Right ---------- */}
        <div className="navbar-end gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="btn btn-ghost btn-circle"
          >
            {theme === "dark" ? <IoSunny /> : <IoMoon />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full border">
                  <img
                    src={user.photoURL || icon}
                    onError={(e) => (e.target.src = icon)}
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
              >
                <li className="px-3 py-2 border-b">
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-xs">{user.email}</p>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/profile">
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="btn btn-sm bg-pink-600 text-white rounded-full"
            >
              <IoLogIn /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
