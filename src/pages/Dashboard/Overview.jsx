import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Overview = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    fetch("https://plate-share-server-polish.vercel.app/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch(
      "https://plate-share-server-polish.vercel.app/dashboard/requests-summary",
    )
      .then((res) => res.json())
      .then((data) => setChartData(data));

    fetch(
      "https://plate-share-server-polish.vercel.app/dashboard/recent-requests",
    )
      .then((res) => res.json())
      .then((data) => setRecentRequests(data));
  }, []);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Users" value={stats.users} />
        <Card title="Foods" value={stats.foods} />
        <Card title="Requests" value={stats.requests} />
        <Card title="Pending" value={stats.pending} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <BarChart width={350} height={300} data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ec4899" />
        </BarChart>

        <PieChart width={350} height={300}>
          <Pie data={chartData} dataKey="count" nameKey="status">
            {chartData.map((_, i) => (
              <Cell key={i} fill={["#22c55e", "#f97316", "#ef4444"][i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Food</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.userEmail}</td>
                <td>{req.foodName}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="p-4 bg-white rounded-xl shadow">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Overview;
