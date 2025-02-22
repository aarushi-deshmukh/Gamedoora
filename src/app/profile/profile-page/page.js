"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }

    fetchUserProfile(token);
  }, [router]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("/api/profile/profile1", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.warn("Invalid or expired token. Logging out...");
          handleLogout();
          return;
        }
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Could not load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        
        {loading ? (
          <p className="text-center text-gray-600">Loading profile...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : user ? (
          <div className="bg-white shadow-md p-6 rounded-lg text-gray-800">
            <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">👤 Username: {user.username}</p>
            <p className="mt-2">🎂 Age: {user.age || "Not specified"}</p>
            <p className="mt-2">📌 Category: {user.category || "General"}</p>

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No user data found.</p>
        )}
      </main>
    </div>
  );
}
