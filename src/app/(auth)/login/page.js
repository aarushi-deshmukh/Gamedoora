"use client";
import { useState, useEffect } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0); // Track failed attempts
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Prevent hydration mismatch

  useEffect(() => {
    setShowForgotPassword(loginAttempts >= 2);
  }, [loginAttempts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Login successful! ✅");
      setLoginAttempts(0); // Reset on successful login
    } else {
      setMessage(data.error || "Login failed ❌");
      setLoginAttempts((prev) => prev + 1); // Increase failed attempts
    }
  };

  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 text-center m-5">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-center text-black">{message}</p>}

        {showForgotPassword && (
          <a href="/forgot-password" className="text-indigo-600 hover:underline mt-4 text-center text-sm">
            Forgot password?
          </a>
        )}

        <p className="mt-4 text-center text-gray-500 text-sm">
          Create new account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">Sign-Up</a>
        </p>
      </div>
    </main>
  );
}
