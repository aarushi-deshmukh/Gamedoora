"use client";

import { useState } from "react";
import { FaUser, FaCalendarAlt, FaFileAlt, FaCog } from "react-icons/fa";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 text-black">
        <h2 className="text-xl font-bold text-orange-500 mb-4">Dashboard</h2>
        <ul className="space-y-3">
          {[
            { key: "profile", label: "Profile", icon: <FaUser /> },
            { key: "edit-profile", label: "Edit Profile", icon: <FaCalendarAlt /> },
            { key: "change-password", label: "Change Password", icon: <FaFileAlt /> },
            { key: "delete-profile", label: "Delete Profile", icon: <FaFileAlt /> },
            { key: "settings", label: "Settings", icon: <FaCog /> },
          ].map((tab) => (
            <li
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`cursor-pointer p-2 rounded flex items-center space-x-2 ${
                selectedTab === tab.key
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {tab.icon} <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {selectedTab === "profile" && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mt-2">Jane Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
          </div>
        )}

        {selectedTab === "edit-profile" && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold text-orange-500">Edit Profile</h2>
            <p>.</p>
          </div>
        )}

        {selectedTab === "change-password" && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold text-orange-500">Change Passowrd</h2>
            <p>No uploaded documents.</p>
          </div>
        )}

        {selectedTab === "delete-profile" && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold text-orange-500">Delete Profile</h2>
            <p>No uploaded documents.</p>
          </div>
        )}

        {selectedTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold text-orange-500">Settings</h2>
            <p>Manage your account settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
