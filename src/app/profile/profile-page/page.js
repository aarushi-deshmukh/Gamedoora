"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";

export default function ProfilePage() {
  const [user, setUser] = useState({ firstName: "John", lastName: "Doe", email: "john@example.com", username: "johndoe" });
  const [activeTab, setActiveTab] = useState("profile"); // Default tab

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Tabs for Navigation */}
      <div className="flex justify-center space-x-6 mt-6">
        <button onClick={() => setActiveTab("profile")} className={`px-6 py-2 rounded ${activeTab === "profile" ? "bg-orange-600 text-white" : "bg-gray-200 text-black"}`}>Profile</button>
        <button onClick={() => setActiveTab("edit")} className={`px-6 py-2 rounded ${activeTab === "edit" ? "bg-orange-600 text-white" : "bg-gray-200 text-black"}`}>Edit</button>
        <button onClick={() => setActiveTab("changePassword")} className={`px-6 py-2 rounded ${activeTab === "changePassword" ? "bg-orange-600 text-white" : "bg-gray-200 text-black"}`}>Change Password</button>
        <button onClick={() => setActiveTab("settings")} className={`px-6 py-2 rounded ${activeTab === "settings" ? "bg-orange-600 text-white" : "bg-gray-200 text-black"}`}>Settings</button>
        <button onClick={() => setActiveTab("delete")} className={`px-6 py-2 rounded ${activeTab === "delete" ? "bg-red-600 text-white" : "bg-gray-200 text-black"}`}>Delete</button>
      </div>

      <main className="flex justify-center mt-8">
        <div className="w-full max-w-lg bg-white shadow-lg p-6 rounded-lg border-l-4 border-orange-500">

          {/* Profile Section */}
          {activeTab === "profile" && (
            <>
              <h2 className="text-2xl font-semibold text-black">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-700">{user.email}</p>
              <p className="mt-2 text-orange-600 font-medium">👤 Username: {user.username}</p>
            </>
          )}

          {/* Edit Profile Section */}
          {activeTab === "edit" && (
            <>
              <h2 className="text-xl font-semibold text-black mb-4">Edit Profile</h2>
              <form onSubmit={(e) => { e.preventDefault(); localStorage.setItem("user", JSON.stringify(user)); alert("Profile updated!"); }}>
                <input type="text" name="firstName" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} className="w-full p-2 border rounded mb-3" placeholder="First Name" required />
                <input type="text" name="lastName" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} className="w-full p-2 border rounded mb-3" placeholder="Last Name" required />
                <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700">Save Changes</button>
              </form>
            </>
          )}

          {/* Change Password Section */}
          {activeTab === "changePassword" && (
            <>
              <h2 className="text-xl font-semibold text-black mb-4">Change Password</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert("Password changed!"); }}>
                <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Current Password" required />
                <input type="password" className="w-full p-2 border rounded mb-3" placeholder="New Password" required />
                <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Confirm New Password" required />
                <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700">Update Password</button>
              </form>
            </>
          )}

          {/* Settings Section */}
          {activeTab === "settings" && (
            <>
              <h2 className="text-xl font-semibold text-black mb-4">Settings</h2>
              <div className="flex items-center justify-between border-b py-2">
                <span className="text-black">Dark Mode</span>
                <input type="checkbox" className="toggle-checkbox w-5 h-5" />
              </div>
              <div className="flex items-center justify-between border-b py-2">
                <span className="text-black">Notifications</span>
                <input type="checkbox" className="toggle-checkbox w-5 h-5" />
              </div>
              <div className="flex items-center justify-between border-b py-2">
                <span className="text-black">Auto Logout</span>
                <input type="checkbox" className="toggle-checkbox w-5 h-5" />
              </div>
              <button className="mt-4 w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700">Save Settings</button>
            </>
          )}

          {/* Delete Account Section */}
          {activeTab === "delete" && (
            <>
              <h2 className="text-xl font-semibold text-black mb-4 text-center">Delete Account</h2>
              <p className="text-red-500 text-center">⚠ This action is irreversible!</p>
              <button onClick={() => { localStorage.removeItem("user"); alert("Account deleted!"); setUser(null); setActiveTab("profile"); }} className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Yes, Delete</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
