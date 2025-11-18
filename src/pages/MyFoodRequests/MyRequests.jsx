import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/requests");
        const data = await res.json();

        const MyRequests = data.filter((req) => req.userEmail === user.email);
        setRequests(MyRequests);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user]);

  if (!user) return <p>Please login to see your request</p>;
  if (loading) return <LoadingSpinner />;

  return (
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
              <th className="px-4 py-3 text-center text-sm">Food Name</th>
              <th className="px-4 py-3 text-center text-sm">Donator Email</th>
              <th className="px-4 py-3 text-center text-sm">Location</th>
              <th className="px-4 py-3 text-center text-sm">Reason</th>
              <th className="px-4 py-3 text-center text-sm">Status</th>
              <th className="px-4 py-3 text-center text-sm">Request Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50 bg-white">
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="px-4 py-3 flex items-center gap-2">
                  {req.food_name}
                </td>
                <td className="px-4 py-3">{req.donatorEmail}</td>
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
                <td>{new Date(req.requestDate).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRequests;
