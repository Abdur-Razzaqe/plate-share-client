import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h[70vh] bg-gradient-to-b from-pink-100 to-rose-100 ">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-pink-500 border-r-rose-400 animate-spin"></div>
        <div className="absolute w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-pulse shadow-lg shadow-pink-200"></div>
        <div className="absolute text-pink-600 font-bold text-sm tracking-wide animate-bounce ">
          Loading....
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
