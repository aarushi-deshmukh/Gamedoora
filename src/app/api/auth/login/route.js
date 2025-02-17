import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongo"; 
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

export async function POST(req) {
  try {
    await connectDB();

    // Ensure the request is in JSON format
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Both email and password are required." }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found with the provided email." }, { status: 400 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send token & user info (excluding password)
    return NextResponse.json({ 
      message: "Login successful!", 
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name, // Assuming your user model has a "name" field
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
