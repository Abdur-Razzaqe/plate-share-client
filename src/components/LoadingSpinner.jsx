import React from "react";

const LoadingSpinner = ({ fullPage = true }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullPage ? "min-h-screen" : "py-20"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin"></div>

        {/* Inner Dot */}
        <div className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
