import { Resend } from "resend";
import connectDB from "@/lib/mongo";
import User from "@/models/User";
import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest and NextResponse

const resend = new Resend(process.env.RESEND_API_KEY);

// Named export for POST method
export const POST = async (req) => { // req is an instance of NextRequest

  const { email } = await req.json(); // Use req.json() to get body data from NextRequest

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email not found in our database." }, { status: 404 });
    }

    // Generate a reset token (optional: store in DB)
    const resetToken = Math.random().toString(36).substring(2);
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send email using Resend
    await resend.emails.send({
      from: "no-reply@gamedoora.com", // Change to your verified sender
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="https://yourapp.com/reset-password?token=${resetToken}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json({ message: "Password reset email sent!" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
