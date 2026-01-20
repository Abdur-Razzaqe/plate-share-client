import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchFoods = async () => {
      try {
        const res = await fetch(
          `https://plate-share-server-lac.vercel.app/foods?email=${user.email}`,
        );
        const data = await res.json();
        const allFoods = Array.isArray(data.result) ? data.result : [];
        setFoods(allFoods);
      } catch (err) {
        console.error("Error fetching foods:", err);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600",
        cancelButton:
          "px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-lac.vercel.app/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.success) {
              toast.success("Food deleted successfully!");
              setFoods((prev) => prev.filter((f) => f._id !== id));
            } else {
              toast.error("Failed to delete food!");
            }
          })
          .catch(() => toast.error("Error deleting food"));
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedFood?._id) return;

    const form = e.target;
    const updateData = {
      food_name: form.food_name.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };

    try {
      const res = await fetch(
        `https://plate-share-server-lac.vercel.app/foods/${selectedFood._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        },
      );
      const data = await res.json();
      if (data?.success) {
        toast.success("Food updated successfully!");
        setFoods((prev) =>
          prev.map((f) =>
            f._id === selectedFood._id ? { ...f, ...updateData } : f,
          ),
        );
        setSelectedFood(null);
      } else {
        toast.error("Failed to update food!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Manage My Foods (<span>{foods.length}</span>)
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          You haven't added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-pink-100 dark:border-gray-700">
          <table className="min-w-full divide-y divide-pink-100 dark:divide-gray-700 text-center">
            <thead className="bg-pink-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="px-6 py-3">Donator</th>
                <th className="px-6 py-3">Food Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Pickup Location</th>
                <th className="px-6 py-3">Expire Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 dark:divide-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              {foods.map((food) => (
                <tr
                  key={food._id}
                  className="hover:bg-pink-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={
                        food.donator?.image || "https://via.placeholder.com/40"
                      }
                      alt={food.donator?.name || "Donator"}
                      className="w-10 h-10 rounded-full border"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">{food.food_name}</td>
                  <td className="px-6 py-4 font-semibold">
                    {food.food_quantity}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {food.pickup_location}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {food.expire_date}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedFood(food)}
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-lg transition-all">
            <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-5">
              Update Food Info
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="food_name"
                defaultValue={selectedFood.food_name}
                placeholder="Food Name"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                required
              />
              <input
                type="text"
                name="food_quantity"
                defaultValue={selectedFood.food_quantity}
                placeholder="Food Quantity"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                required
              />
              <input
                type="text"
                name="pickup_location"
                defaultValue={selectedFood.pickup_location}
                placeholder="Pickup Location"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                required
              />
              <input
                type="date"
                name="expire_date"
                defaultValue={selectedFood.expire_date}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                required
              />
              <textarea
                name="additional_notes"
                defaultValue={selectedFood.additional_notes}
                placeholder="Additional Notes"
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-100"
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFood(null)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
