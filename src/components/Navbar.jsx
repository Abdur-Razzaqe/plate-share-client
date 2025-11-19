import { Link, NavLink, useNavigate } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { IoFastFoodOutline, IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import logo from "../assets/logo.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import icon from "../assets/icon.jpg";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser().then(() => {
      navigate("/");
    });
  };

  const activeClass =
    "text-pink-500 border-b-2 border-pink-500 transition duration-300";

  return (
    <div className="navbar py-0 min-h-0 rounded-full shadow-sm gap-2 glass-card max-w-7xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn  md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <GoHomeFill />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/available-foods"}
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <IoFastFoodOutline /> Available Foods
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="flex items-center gap-1 text-xl font-bold">
          <img src={logo} alt="" className="w-8 h-8 rounded-full" />
          <span className="text-red-400">Plate</span>
          <span className="text-green-400">Share</span>
        </Link>
      </div>
      <div className="navbar-center hidden md:flex font-semibold">
        <ul className="menu menu-horizontal px-1 gap-10">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                "flex items-center gap-1 px-3 py-2 rounded-md" +
                (isActive ? activeClass : "text-gray-700 hover:text-pink-500")
              }
            >
              <GoHomeFill />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/available-foods"}
              className={({ isActive }) =>
                "flex items-center gap-1 px-3 py-2 rounded-md font-bold" +
                (isActive ? activeClass : "text-gray-700 hover:text-pink-500")
              }
            >
              {" "}
              <IoFastFoodOutline />
              Available Foods
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    onError={(e) => (e.target.src = icon)}
                    className="rounded-full w-8 h-8 border border-gray-300 object-cover"
                  />
                ) : (
                  <div className="rounded-full w-8 h-8 border border-gray-300 flex justify-center items-center text-sm font-semibold">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li className="mt-3">
                <Link to={"/add-food"}>
                  <FaUser /> Add Food
                </Link>
              </li>

              <li>
                <Link to={"/manage-my-foods"}>Manage My Foods</Link>
              </li>

              <li>
                <Link to={"/my-food-requests"}>My Food Requests</Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn rounded-full border-gray-300  btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white"
          >
            {" "}
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
