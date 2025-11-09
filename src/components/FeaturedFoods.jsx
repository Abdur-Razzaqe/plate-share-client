import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/foods?status=Available&limit=6&short=quantity")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Feature Foods
      </h2>
      {foods.length === 0 ? (
        <p>loading</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <motion.div
              kry={food._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-pink-100 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition "
            >
              <img
                src={food.food_image}
                alt=""
                className="w-full h-56 object-cover"
              />
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-gray-800">
                  {food.food_name}
                </h2>
                <p className="text-gray-600 text-sm">
                  Quantity: {food.food_quantity}
                </p>
                <p className="text-gray-600 text-sm">
                  Pickup: {food.pickup_location}
                </p>

                <button
                  onClick={() => navigate(`/food/${food._id}`)}
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white py-2 rounded-full font-semibold border border-pink-200 hover:shadow-lg cursor-pointer transition-all"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className=" text-center mt-10">
        <button
          onClick={() => navigate("/available-foods")}
          className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 px-8 rounded-full font-semibold border border-pink-200 hover:shadow-lg cursor-pointer transition-all"
        >
          show All
        </button>
      </div>
    </div>
  );
};

export default FeaturedFoods;
