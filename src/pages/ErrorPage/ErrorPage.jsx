import React from "react";
import errorImage from "../../assets/error-404.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center text-center min-h-[80vh] px-4 space-y-3">
        <img src={errorImage} alt="" className="w-60 md:w-80 lg:90 mb-6" />
        <div className="space-y-3">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Oops, page not found!
          </h1>
          <p className="text-gray-500 text-sm md:text-base mx-w-md mx-auto">
            The page you are looking for is not available.
            {errorImage.message}
          </p>
        </div>
        <Link
          to={"/"}
          className="btn rounded-full border-gray-300  btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white"
        >
          Back to Home page
        </Link>
      </div>

      <Footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 " />
    </>
  );
};

export default ErrorPage;
