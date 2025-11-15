import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    donator = {},
  } = food;
  const { name, image } = donator;

  const handleViewDetails = () => {
    if (user) {
      navigate(`/foods/${_id}`);
    } else {
      toast.error("Please login to view food details!");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: "0px 12px 30px rgba(255, 72, 100, 0.25) ",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.6 }}
      className="card bg-base-100 shadow-sm rounded-2xl overflow-hidden border border-pink-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <figure className="px-6 pt-6">
          <img
            src={food_image || "https://via.placeholder.com/300"}
            alt={food_name}
            className="rounded-xl w-full h-56 object-cover"
          />
        </figure>
      </div>
      <div className="card-body p-5 space-y-3">
        <h2 className="card-title text-xl font-bold text-gray-800">
          {food_name}
        </h2>
        {name && (
          <div className="flex justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <img
                src={image || "https://via.placeholder.com/40"}
                alt={name}
                className="w-8 h-8 rounded-full border"
              />
              <div>
                <p className="text-gray-700 text-sm font-medium">{name}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">
              {" "}
              Quantity: {food_quantity}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center gap-2 text-center">
          <p className="text-gray-600 text-sm  border border-pink-400 rounded-full bg-green-300 text-center">
            {" "}
            Pickup: {pickup_location}
          </p>
          <p className="text-gray-600 text-sm  border border-pink-300 rounded-full bg-amber-100 text-center">
            {" "}
            Expire: {expire_date}
          </p>
        </div>

        <button
          onClick={handleViewDetails}
          className="w-full mt-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white py-2 rounded-full font-semibold border border-pink-200 hover:shadow-lg cursor-pointer transition-all text-center"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
