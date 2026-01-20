import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FoodCard from "./FoodCard";
import FoodSkeleton from "./FoodSkeleton";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          "https://plate-share-server-lac.vercel.app/foods",
        );
        const data = await res.json();

        const allFoods = Array.isArray(data) ? data : data?.result || [];

        const featured = allFoods
          .filter((item) => item.food_status === "Available")
          .sort((a, b) => {
            const numA = parseInt(a.food_quantity.match(/\d+/)?.[0] || 0);
            const numB = parseInt(b.food_quantity.match(/\d+/)?.[0] || 0);
            return numB - numA;
          })
          .slice(0, 8);

        setFoods(featured);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Foods</h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Explore the most generous food donations currently available in our
          community.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <FoodSkeleton key={i} />)
          : foods.map((food) => <FoodCard key={food._id} food={food} />)}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/available-foods")}
          className="btn bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8"
        >
          View All Foods
        </button>
      </div>
    </section>
  );
};

export default FeaturedFoods;
