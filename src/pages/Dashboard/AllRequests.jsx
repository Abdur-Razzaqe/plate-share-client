import React, { useEffect, useState } from "react";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("https://plate-share-server-lac.vercel.app/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data.result || []));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        All Food Requests ({requests.length})
      </h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req) => (
            <li key={req._id} className="p-4 bg-white rounded shadow">
              <p>
                <b>Food ID:</b> {req.foodId}
              </p>
              <p>
                <b>Email:</b> {req.requesterEmail}
              </p>
              <p>
                <b>Status:</b> {req.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllRequests;
