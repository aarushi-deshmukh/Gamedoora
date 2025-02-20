import connectDB from "../../../../lib/mongo";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required!" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching profile", details: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required!" }, { status: 400 });
    }

    const { firstName, lastName, email, username, age, category } = await req.json();

    const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
    const existingUsername = await User.findOne({ username, _id: { $ne: userId } });

    if (existingEmail) {
      return NextResponse.json({ error: "Email is already in use!" }, { status: 400 });
    }

    if (existingUsername) {
      return NextResponse.json({ error: "Username is already in use!" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, username, age, category },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully!", user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating profile", details: error.message }, { status: 500 });
  }
}
