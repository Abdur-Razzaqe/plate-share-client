import React, { useEffect, useState } from "react";

const Overview = () => {
  const [counts, setCounts] = useState({
    totalFoods: 0,
    available: 0,
    donated: 0,
    requests: 0,
  });
  const base =
    import.meta.env.VITE_BASE_API_URL ||
    "https://plate-share-server-lac.vercel.app";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(base + "/foods");
        const data = await res.json();
        const foods = data?.result || data || [];
        const total = foods.length;
        const donated = foods.filter((f) => f.food_status === "donated").length;
        const available = total - donated;

        const reqRes = await fetch(base + "/requests");
        const reqData = await reqRes.json();
        const requests = Array.isArray(reqData)
          ? reqData.length
          : (reqData?.result || []).length;

        setCounts({ totalFoods: total, available, donated, requests });
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm">Total Foods</div>
          <div className="text-2xl font-bold">{counts.totalFoods}</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm">Available</div>
          <div className="text-2xl font-bold">{counts.available}</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm">Requests</div>
          <div className="text-2xl font-bold">{counts.requests}</div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 className="font-semibold mb-3">Food Status</h3>
        <div className="flex items-end gap-4 h-40">
          <div className="flex flex-col items-center">
            <div
              className="w-16 bg-pink-500"
              style={{
                height: `${Math.max(8, (counts.available / Math.max(1, counts.totalFoods)) * 100)}%`,
              }}
            />
            <div className="mt-2 text-sm">Available</div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-16 bg-green-500"
              style={{
                height: `${Math.max(8, (counts.donated / Math.max(1, counts.totalFoods)) * 100)}%`,
              }}
            />
            <div className="mt-2 text-sm">Donated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
