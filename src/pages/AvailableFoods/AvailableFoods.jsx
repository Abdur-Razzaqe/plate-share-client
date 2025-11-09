import React from "react";
import { useLoaderData } from "react-router";
import FoodCard from "../../components/FoodCard";

const AvailableFoods = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <div className="text-2xl text-center font-bold">Available Foods</div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
