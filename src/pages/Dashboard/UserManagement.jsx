import React, { useState } from "react";
import { FaUserShield, FaTrashAlt, FaUserEdit } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Ariful Islam", email: "arif@gmail.com", role: "user" },
    { id: 2, name: "Admin Boss", email: "admin@admin.com", role: "admin" },
    { id: 3, name: "Sumaiya Akter", email: "sumaiya@gmail.com", role: "user" },
  ]);

  const handleMakeAdmin = (id) => {
    alert(`User ID ${id} is now an Admin!`);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage All Users</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
          Total Users: {users.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold text-sm">Name</th>
              <th className="p-4 font-semibold text-sm">Email</th>
              <th className="p-4 font-semibold text-sm">Role</th>
              <th className="p-4 font-semibold text-sm text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.name[0]}
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">{user.email}</td>
                <td className="p-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    {/* Make Admin Button (Only show if not admin) */}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition tooltip"
                        title="Make Admin"
                      >
                        <FaUserShield size={18} />
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete User"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
