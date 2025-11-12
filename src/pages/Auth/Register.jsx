import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";

const Register = () => {
  const { createUser, googleLogin, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const photo = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("password must contain at least one uppercase letter!");
      setLoading(false);
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("password must contain at least one lowercase letter!");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("password must be at least 6 characters! weak password");
      setLoading(false);
      return;
    }
    try {
      const result = await createUser(email, password);
      const user = result.user;
      if (!user) throw new Error("User creation failed");

      await updateUserProfile(name, photo);
      toast.success("Registration successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/email-already- in-use":
          toast.error("User already exists! Please login");
          break;
        case "auth/weak-password":
          toast.error("Password io too weak!");
          break;
        default:
          toast.error(error.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await googleLogin();
      toast.success(`Welcome ${result.user.displayName || "User"}!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />{" "}
      <div className="flex justify-center items-center min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
          <h2 className="font-semibold text-2xl text-center">
            Register your account
          </h2>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              {/* Name  */}
              <label className="label text-sm font-semibold ">Name</label>
              <input
                name="name"
                type="Text"
                className="input w-full"
                placeholder="Name"
                required
              />
              {/* Photo URL  */}
              <label className=" label text-sm font-semibold">Photo URL</label>
              <input
                name="photoURL"
                type="text"
                className="input w-full"
                placeholder=" Profile photo URL"
              />

              {/* Email  */}
              <label className="label text-sm font-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
                required
              />

              {/* Password */}
              <span className="relative">
                {" "}
                <label className="label text-sm font-semibold">Password</label>
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                  required
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-7 cursor-pointer z-50"
                >
                  {show ? <FaEye size={24} /> : <IoEye size={24} />}
                </span>
              </span>
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-outline  mt-4 text-white ${
                  loading ? "bg-gray-400" : " bg-pink-500 hover:bg-pink-600"
                }`}
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </fieldset>
          </form>
          <div className="divider text-gray-400"> OR</div>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`btn btn-outline w-[85%] mx-auto flex items-center justify-center gap-2 text-white ${
              loading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {" "}
            <FcGoogle size={22} />
            Sign up with Google
          </button>
          <p className="font-semibold text-center py-2">
            Already have an Account ?{" "}
            <Link to="/auth/login" className="text-secondary">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
