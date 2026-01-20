import React, { useContext, useState } from "react";
import { FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useLoaderData } from "react-router";
import MyFoodRequests from "../Dashboard/MyFoodRequests";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";

const FoodDetails = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const food = data?.result || {};

  if (!food?._id) {
    return <LoadingSpinner />;
  }

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    donator = {},
  } = food;

  const isOwner = user?.email === donator?.email;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Food Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-pink-100 dark:border-gray-700 transition-all">
        <img
          src={food_image || "https://via.placeholder.com/600"}
          alt={food_name}
          className="w-full h-80 md:h-[400px] object-cover"
        />

        <div className="p-6 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            {food_name}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {additional_notes || "No additional notes provided."}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Quantity */}
            <div className="bg-pink-50 dark:bg-gray-700 p-4 rounded-xl border border-pink-100 dark:border-gray-600">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Food Quantity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {food_quantity}
              </p>
            </div>

            {/* Expire Date */}
            <div className="bg-pink-50 dark:bg-gray-700 p-4 rounded-xl border border-pink-100 dark:border-gray-600">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                <FaClock className="text-pink-500" /> Expire Date
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{expire_date}</p>
            </div>

            {/* Pickup Location */}
            <div className="bg-pink-50 dark:bg-gray-700 p-4 rounded-xl border border-pink-100 dark:border-gray-600">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" /> Pickup Location
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {pickup_location}
              </p>
            </div>

            {/* Donator Info */}
            <div className="bg-pink-50 dark:bg-gray-700 p-4 rounded-xl border border-pink-100 dark:border-gray-600">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                <FaUser className="text-pink-500" /> Donator Info
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={donator.image || "https://via.placeholder.com/40"}
                  alt={donator.name || "Donator"}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <div>
                  <p className="text-gray-700 dark:text-gray-100 text-sm font-medium">
                    {donator.name || "Anonymous"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    {donator.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Request Button */}
          {!isOwner && user && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white px-6 py-2 rounded-full shadow-md transition transform hover:-translate-y-1"
              >
                Request Food
              </button>
            </div>
          )}

          {!user && (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
              Please login to request this food
            </p>
          )}
        </div>
      </div>

      {/* MyFoodRequests Modal */}
      <div className="max-w-6xl mx-auto mt-12">
        <MyFoodRequests
          food={food}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  );
};

export default FoodDetails;
