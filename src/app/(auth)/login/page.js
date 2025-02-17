"use client";
import { useState } from "react";


export default function Login()
{
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Login successful! ✅");
    } else {
      setMessage(data.error || "Login failed ❌");
    }
  };

  return (
  <main>
    <div>
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
        {message && <p className="mt-4 text-center">{message}</p>}
        <p className="mt-4 text-center text-gray-500 text-sm">
          Forgot your password?{" "}
          <a href="/reset-password" className="text-indigo-600 hover:underline">Reset here</a>
        </p>
      </div>
    </div>
  </main>);
}