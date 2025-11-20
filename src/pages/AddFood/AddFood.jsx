import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    food_name: "",
    food_image: "",
    food_quantity: "",
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const foodData = {
      ...formData,
      donator_Name: user?.displayName,
      donator_email: user?.email,
      donator_image: user?.photoURL,
      food_status: "Available",
      // createdAt: new Date(),
    };

    try {
      await axios.post(
        "https://plate-share-server-lac.vercel.app/foods",
        foodData
      );
      toast.success("Food added successfully!");
      setFormData({
        food_name: "",
        food_image: "",
        food_quantity: "",
        pickup_location: "",
        expire_date: "",
        additional_notes: "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to add food. Try again!");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from bg-pink-50 to-rose-100 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-pink-200 ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Food Name
            </label>
            <input
              type="text"
              name="food_name"
              value={formData.food_name}
              onChange={handleChange}
              required
              placeholder="Enter food name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Food Image URL (Upload to imgbb)
            </label>
            <input
              type="url"
              name="food_image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="http://i.ibb.co/...."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Food Quantity
            </label>
            <input
              type="text"
              name="food_quantity"
              value={formData.food_quantity}
              onChange={handleChange}
              required
              placeholder="Serves 2 people"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
              placeholder="Enter pickup location"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Expire Date
            </label>
            <input
              type="date"
              name="expire_date"
              value={formData.expire_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Additional Notes
            </label>

            <textarea
              name="additional_note"
              type="text"
              value={formData.additional_notes || ""}
              onChange={handleChange}
              rows="3"
              placeholder="Any extra info..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-full font-semibold border border-pink-200 hover:shadow-lg transition-all disabled:opacity-70"
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
