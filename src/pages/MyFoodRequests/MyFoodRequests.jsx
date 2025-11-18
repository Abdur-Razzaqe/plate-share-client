import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyFoodRequests = ({ food, openModal, setOpenModal }) => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const isOwner = user?.email === food?.donator?.email;

  useEffect(() => {
    if (!isOwner || !food?._id) return;

    const loadRequests = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:3000/foods/${food._id}/requests`
        );
        const data = await res.json();

        setRequests(Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [isOwner, food?._id]);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to request food!");
      return;
    }

    const form = e.target;

    const requestInfo = {
      foodId: food._id,
      food_name: food.food_name,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      location: form.location.value,
      reason: form.reason.value,
      contact: form.contact.value,
      status: "pending",
      donatorEmail: food.donator?.email,
      requestDate: new Date(),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/foods/${food._id}/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestInfo),
        }
      );

      const data = await res.json();
      if (!data.insertedId) throw new Error("Request failed");

      toast.success("Your food request has been submitted!");
      form.reset();
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    }
  };

  const handleStatusChange = async (reqId, newStatus) => {
    try {
      await fetch(`http://localhost:3000/foods/${food._id}/requests/${reqId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Request ${newStatus}!`);

      setRequests((prev) =>
        prev.map((r) => (r._id === reqId ? { ...r, status: newStatus } : r))
      );

      if (newStatus === "accepted") {
        await fetch(`http://localhost:3000/foods/${food._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ food_status: "donated" }),
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mt-12">
      {openModal && !isOwner && (
        <div className="fixed inset-0 bg-pink-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            <h3 className="text-2xl font-bold text-center mb-5 text-gray-800">
              Request Food
            </h3>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <input
                name="location"
                required
                placeholder="Write your location"
                className="input input-bordered w-full"
              />
              <textarea
                name="reason"
                required
                placeholder="Why need food?"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <input
                name="contact"
                required
                placeholder="Contact Number"
                className="input input-bordered w-full"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isOwner && (
        <div className="mt-10 border border-pink-100 rounded-2xl overflow-x-auto shadow text-center">
          <h3 className="text-xl font-semibold text-gray-800 px-4 pt-4">
            Food Requests
          </h3>
          {requests.length === 0 ? (
            <p>No requests yet for this food.</p>
          ) : (
            <table className="min-w-full divide-y divide-pink-100 mt-4">
              <thead className="bg-pink-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Name</th>
                  <th className="px-4 py-3 text-left text-sm">Email</th>
                  <th className="px-4 py-3 text-left text-sm">Location</th>
                  <th className="px-4 py-3 text-left text-sm">Reason</th>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50 bg-white">
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img
                        src={req.userPhoto}
                        alt={req.userName}
                        className="w-8 h-8 rounded-full border"
                      />{" "}
                      {req.userName}
                    </td>
                    <td className="px-4 py-3">{req.userEmail}</td>
                    <td className="px-4 py-3">{req.location}</td>
                    <td className="px-4 py-3">{req.reason}</td>
                    <td
                      className={`px-4 py-2 text-center font-semibold gap-1 ${
                        req.status === "pending"
                          ? "text-yellow-500"
                          : req.status === "accepted"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {req.status}
                    </td>
                    <td className="px-4 py-2 text-center  gap-2">
                      {req.status === "pending" && (
                        <>
                          <div className="space-y-2 ">
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, "accepted")
                              }
                              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 w-full rounded-xl "
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, "rejected")
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 w-full rounded-xl"
                            >
                              Reject
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;
