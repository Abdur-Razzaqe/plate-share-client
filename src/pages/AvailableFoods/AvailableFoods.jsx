import React from "react";
import { useLoaderData, useNavigation } from "react-router";
import FoodCard from "../../components/FoodCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const AvailableFoods = () => {
  const data = useLoaderData();

  const navigation = useNavigation();
  const foods = Array.isArray(data?.result) ? data.result : [];

  if (navigation.state === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="text-2xl text-center font-bold mb-6">
        Available Foods (<span>{foods.length}</span>)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 space-y-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
