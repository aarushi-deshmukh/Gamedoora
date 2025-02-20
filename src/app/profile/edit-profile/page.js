"use client";

import { useState, useEffect } from "react";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    age: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const userId = "67b0552f808e6e7a034d3074";   // changes to be made when connecting to login page
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/edit-profile?userId=${userId}`);
        const data = await res.json();
        console.log("API Response:", data); 

        if (res.ok) {
          setFormData(data);
        } else {
          setMessage(data.error || "Failed to load profile.");
        }
      } catch (error) {
        setMessage("Error fetching profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`/api/profile/edit-profile?userId=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully! ✅");
      } else {
        setMessage(data.error || "Profile update failed ❌");
      }
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-orange-200">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-5">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
              required
            >
              <option value="">Select Category</option>
              <option value="developers">Developers</option>
              <option value="designers">Designers</option>
              <option value="writers">Writers</option>
              <option value="composers">Composers</option>
              <option value="none">None</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Update Profile
          </button>

          {message && <p className="mt-3 text-center text-sm text-black">{message}</p>}
        </form>
      </div>
    </main>
  );
}
