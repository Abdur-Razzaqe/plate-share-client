import React from "react";
import { FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import MyFoodRequests from "../MyFoodRequests/MyFoodRequests";
import LoadingSpinner from "../../components/LoadingSpinner";

const FoodDetails = () => {
  const data = useLoaderData();

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-pink-100 ">
        <img
          src={food_image || "https://via.placeholder.com/600"}
          alt={food_name}
          className="w-full h-80 object-cover"
        />

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{food_name}</h2>
          <p className="text-gray-600 leading-relaxed">
            {additional_notes || "No additional notes provided."}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
              <h3 className="font-semibold text-gray-700 mb-2">
                Food Quantity
              </h3>
              <p className="text-gray-600">{food_quantity}</p>
            </div>

            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
              <h3 className="font-semibold text-gray-700 mb-2">
                <FaClock className="inline-block mr-2 text-pink-500" />
                Expire Date
              </h3>
              <p className="text-gray-600">{expire_date}</p>
            </div>

            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
              <h3 className="font-semibold text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline-block mr-2 text-pink-500" />
                Pickup Location
              </h3>
              <p className="text-gray-600">{pickup_location}</p>
            </div>

            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
              <h3 className="font-semibold text-gray-700 mb-2">
                <FaUser className="inline-block mr-2 text-pink-500" />
                Donator Info
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={donator.image || "https://via.placeholder.com/40"}
                  alt={donator.name}
                  className="w-8 h-8 rounded-full border"
                />
                <div>
                  <p className="text-gray-700 text-sm font-medium">
                    {donator.name}
                  </p>
                  <p className="text-gray-700 text-xm">{donator.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to={"/my-food-requests"}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition cursor-pointer"
            >
              Request Food
            </Link>
          </div>
        </div>
      </div>
      <div className=" max-w-6xl mx-auto mt-12">
        <MyFoodRequests food={food} />
      </div>
    </div>
  );
};

export default FoodDetails;
