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
    fetch(`http://localhost:3000/foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:3000/foods/${id}`, {
            method: "DELETE",
          });
          // .then((res) => res.json())
          // .then(() => {
          //   setFoods((prev) => prev.filter((f) => f.id !== id))
          // }

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updateFood = {
      food_name: form.food_name.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };
    fetch(`http://localhost:3000/foods/${selectedFood._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateFood),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Food update successfully!");
        setFoods((prev) =>
          prev.map((f) =>
            f._id === selectedFood._id ? { ...f, ...updateFood } : f
          )
        );
        setSelectedFood(null);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Manage My Foods
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow border border-pink-100 rounded-xl">
          <table className="min-w-full divide-y divide-pink-100">
            <thead className="bg-pink-100 text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Food Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Pickup
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Expire
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-pink-50 bg-white">
              {foods.map((food, idx) => (
                <tr
                  key={food._id}
                  className="hover:bg-pink-50 transition-all duration-200"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">
                    {food.food_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {food.food_quantity}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {food.pickup_location}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {food.expire_date}
                  </td>
                  <td className="px-4 py-3 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => setSelectedFood(food)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
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
      {selectedFood && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-5 text-gray-800 text-center">
              Update Food Info
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="food_name"
                defaultValue={selectedFood.food_name}
                placeholder="Food Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="food_quantity"
                defaultValue={selectedFood.food_quantity}
                placeholder="Food Quantity"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="pickup_location"
                defaultValue={selectedFood.pickup_location}
                placeholder="Pickup Location"
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="expire_date"
                defaultValue={selectedFood.expire_date}
                className="input input-bordered w-full"
              />
              <textarea
                name="additional_notes"
                defaultValue={selectedFood.additional_notes}
                placeholder="Additional Notes"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFood(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 text-white hover:bg-pink-600 transition cursor-pointer"
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
