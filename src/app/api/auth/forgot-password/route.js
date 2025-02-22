import nodemailer from "nodemailer";
import connectDB from "../../../../lib/mongo";
import User from "../../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Avoid SSL issues
  },
});

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email. Please enter a registered email address." },
        { status: 404 }
      );
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send reset email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="https://yourapp.com/reset-password?token=${resetToken}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json(
      { message: "Password reset email sent!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing password reset request:", error.message, error.stack);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
