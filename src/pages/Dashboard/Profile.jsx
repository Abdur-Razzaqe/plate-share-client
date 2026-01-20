import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name cannot be empty");
    setSaving(true);
    try {
      await updateUserProfile(name, photo);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        My Profile
      </h2>

      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 space-y-6"
      >
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 text-gray-800 dark:text-gray-100 transition"
            required
          />
        </div>

        {/* Photo URL Field */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Photo URL
          </label>
          <input
            type="url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Link to your profile photo"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 text-gray-800 dark:text-gray-100 transition"
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-400 hover:shadow-lg transition ${
              saving ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
