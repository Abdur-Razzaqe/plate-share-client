import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import FoodCard from "../../components/FoodCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const AvailableFoods = () => {
  // const data = useLoaderData();
  // const navigation = useNavigation();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          `https://plate-share-server-lac.vercel.app/foods?search=${encodeURIComponent(
            searchQuery
          )}`
        );

        const data = await res.json();
        setFoods(Array.isArray(data?.result) ? data.result : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [searchQuery]);

  if (loading) {
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
