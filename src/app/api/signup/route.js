import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB(); // Ensure database connection
    const { firstName, lastName, email, username, age, category, password } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !username || !age || !category || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    if (existingUsername) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ firstName, lastName, email, username, age, category, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "Signup successful!" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
