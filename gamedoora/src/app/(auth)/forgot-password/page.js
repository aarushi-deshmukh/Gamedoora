"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center m-5">Forgot Password</h1>
      <p className="text-gray-600 text-sm text-center mt-2">
        Enter your recovery email address associated with your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none text-black"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Reset Password
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-500 font-medium">{message}</p>}
      
      <p className="mt-4 text-center text-gray-500 text-sm">
        Remembered your password?{" "}
        <a href="/login" className="text-indigo-600 hover:underline">Login here</a>
      </p>
    </div>
  );
}
