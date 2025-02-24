import bcrypt from "bcryptjs";
import { getSession } from "next-auth/react";
import db from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { oldPassword, newPassword } = req.body;

  // Get user from DB
  const user = await db.user.findUnique({ where: { email: session.user.email } });

  if (!user) return res.status(404).json({ message: "User not found" });

  // Check old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect old password" });

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await db.user.update({
    where: { email: session.user.email },
    data: { password: hashedPassword },
  });

  return res.status(200).json({ message: "Password updated successfully" });
}
