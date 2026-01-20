import { motion } from "framer-motion";
import { useContext } from "react";
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
    food_status = "Available",
    donator = {},
  } = food;

  const { name: donatorName, image: donatorImage } = donator;

  const handleViewDetails = () => {
    if (user) {
      navigate(`/foods/${_id}`);
    } else {
      toast.error("Please login to view food details");
      setTimeout(() => navigate("/auth/login"), 1200);
    }
  };

  // Helper to ensure image URLs are valid
  const validImage = (url, fallback) => {
    try {
      if (!url || !url.startsWith("http")) return fallback;
      return url;
    } catch {
      return fallback;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="card bg-base-100 border rounded-2xl overflow-hidden h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={validImage(food_image, "https://via.placeholder.com/400")}
          alt={food_name || "Food Item"}
          className="w-full h-52 object-cover"
        />

        {/* Status Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full text-white ${
            food_status === "Available" ? "bg-pink-600" : "bg-gray-500"
          }`}
        >
          {food_status}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {food_name || "Unnamed Food"}
        </h3>

        {/* Donator + Quantity */}
        {donatorName && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img
                src={validImage(donatorImage, "https://via.placeholder.com/40")}
                alt={donatorName}
                className="w-8 h-8 rounded-full border object-cover"
              />
              <p className="text-sm font-medium text-gray-700">{donatorName}</p>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Qty:</span> {food_quantity || "N/A"}
            </p>
          </div>
        )}

        {/* Meta Info */}
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p>
            <span className="font-medium">Pickup:</span>{" "}
            {pickup_location || "Not specified"}
          </p>
          <p>
            <span className="font-medium">Expire:</span>{" "}
            {expire_date || "No date"}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleViewDetails}
          className="mt-auto btn bg-pink-600 hover:bg-pink-700 text-white rounded-full"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
