import React from "react";
import { useLoaderData } from "react-router";
import FoodCard from "../../components/FoodCard";

const AvailableFoods = () => {
  const data = useLoaderData();
  console.log(data);
  const foods = data?.result || [];
  console.log("food loaded", foods);
  if (!Array.isArray(foods)) {
    return;
  }

  return (
    <div>
      <div className="text-2xl text-center font-bold">Available Foods</div>

      {foods.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <p>no foods Available right now</p>
      )}
    </div>
  );
};

export default AvailableFoods;
