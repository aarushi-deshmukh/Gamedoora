import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not found in our database." });
    }

    // Generate a reset token (optional: store in DB)
    const resetToken = Math.random().toString(36).substring(2);
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send email using Resend
    await resend.emails.send({
      from: "no-reply@yourdomain.com", // Change to your verified sender
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="https://yourapp.com/reset-password?token=${resetToken}">here</a> to reset your password.</p>`,
    });

    res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
