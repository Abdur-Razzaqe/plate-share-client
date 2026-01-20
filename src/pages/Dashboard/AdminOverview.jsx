import React from "react";
import {
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

const AdminOverview = () => {
  const stats = [
    {
      id: 1,
      label: "Total Foods",
      value: "120",
      icon: <FaUtensils />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      label: "Active Users",
      value: "45",
      icon: <FaUsers />,
      color: "bg-green-500",
    },
    {
      id: 3,
      label: "Pending Requests",
      value: "12",
      icon: <FaClipboardList />,
      color: "bg-yellow-500",
    },
    {
      id: 4,
      label: "Completed Donations",
      value: "85",
      icon: <FaCheckCircle />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
          >
            <div className={`${stat.color} p-4 rounded-lg text-white text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold">Recent Food Postings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                  Food Name
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                  Donor
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                  Status
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[1, 2, 3].map((item) => (
                <tr
                  key={item}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                >
                  <td className="p-4 text-sm font-medium">
                    Fresh Vegetable Salad
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    user@example.com
                  </td>
                  <td className="p-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs">
                      Available
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-500 hover:underline text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
