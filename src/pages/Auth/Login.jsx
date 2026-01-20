import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import { FaEye } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    // Basic Validation
    if (!email || !password) {
      toast.error("Please fill out all fields!");
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    signInUser(email, password)
      .then((result) => {
        toast.success(`Welcome back, ${result.user.displayName || "User"}!`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("Invalid email address.");
            break;
          case "auth/user-not-found":
            toast.error("No user found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("Wrong password! Please try again.");
            break;
          case "auth/too-many-requests":
            toast.error("Too many failed attempts. Try again later.");
            break;
          default:
            toast.error("Login failed. Please register first.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success(`Welcome ${result.user.displayName || "User"}!`);
        navigate(from, { replace: true });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
      <Navbar />
      <div className="flex-grow flex justify-center items-center bg-base-200 px-4 py-6">
        <div className="card bg-white w-full max-w-sm shadow-xl py-6 px-6 rounded-2xl">
          <h2 className="font-bold text-3xl text-center mb-2 text-pink-500">
            Welcome Back
          </h2>
          <p className="text-center text-pink-400 mb-6">
            Login to continue your journey
          </p>

          <form onSubmit={handleLogin} className="card-body space-y-5">
            {/* Email */}
            <div>
              <label className="label text-sm font-semibold">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full mt-1 border-gray-300 bg-white/70 backdrop-blur-sm"
                placeholder="Email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="label text-sm font-semibold">Password</label>
              <input
                name="password"
                type={show ? "text" : "password"}
                className="input w-full mt-1 border-gray-300 bg-white/70 backdrop-blur-sm"
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-2 top-7 cursor-pointer z-50"
              >
                {show ? <FaEye size={24} /> : <IoEye size={24} />}
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-outline mt-4 text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full w-full py-3 font-semibold shadow-md hover:scale-[1.02] transition"
            >
              Login
            </button>

            <div className="divider text-gray-400">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-3 py-3 rounded-full bg-white/70 backdrop-blur-sm border shadow hover:bg-white transition"
            >
              <FcGoogle />
              <span className="font-semibold text-gray-700">
                Sign in with Google
              </span>
            </button>

            <p className="font-semibold text-center py-2">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-pink-700 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
