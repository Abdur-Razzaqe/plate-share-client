import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FoodCard from "./FoodCard";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/foods");
        const data = await res.json();

        const allFoods = Array.isArray(data) ? data : data?.result || [];

        const sorted = allFoods
          .filter((item) => item.food_status === "Available")
          .sort((a, b) => {
            const numA = parseInt(a.food_quantity.match(/\d+/))?.[0] || 0;
            const numB = parseInt(b.food_quantity.match(/\d+/))?.[0] || 0;
            return numB - numA;
          })
          .slice(0, 6);

        setFoods(sorted);
      } catch (error) {
        console.log("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 ">
        Feature Foods
      </h2>

      <div className="grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

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
