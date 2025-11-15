import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import { FaEye } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("password must contain at least one uppercase letter!");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("password must contain at least one lowercase letter!");
      return;
    }
    if (password.length < 6) {
      toast.error("password must be at least 6 characters!");
      return;
    }

    if (!email || !password) {
      toast.error("Please fil out all fields !");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    signInUser(email, password)
      .then((result) => {
        toast.success(`Welcome back ${result.user.displayName || "User"}!`);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        // console.log("Firebase error", error.code);
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
            toast.error("Too many failed attempts. Try again later");
            break;
          default:
            toast.error("Login failed. Please Registered first");
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success(`Welcome ${result.user.displayName || "user"} !`);
        navigate(from, { replace: true });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from bg-pink-300 via-pink-400 to bg-purple-400 px-4">
        <div className="card backdrop-blur-xl bg-white/20 border-warning/30 shadow-2xl p-8 rounded-3xl w-full max-w-md">
          <h2 className="font-bold text-3xl text-center mb-6 text-gray-900">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Login to continue your journey
          </p>
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset space-y-5">
              {/* Email  */}
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

              {/* Password  */}
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
                className="btn btn-outline  mt-4 text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full w-full py-3 font-semibold shadow-md hover:scale-[1.02] transition"
              >
                Login
              </button>
              <div className="divider text-gray-400"> OR</div>
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full flex items-center justify-center gap-3 py-3 rounded-full bg-white/70 backdrop-blur-sm border shadow hover:bg white transition  "
              >
                <FcGoogle />
                <span className="font-semibold text-gray-700">
                  Sign in with Google
                </span>
              </button>
              <p className=" text-center font-medium mt-3 text-gray-700 ">
                Don't have an Account ?{" "}
                <Link
                  to="/auth/register"
                  className=" text-pink-700 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
