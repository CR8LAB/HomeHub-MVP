import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function adminLoginService({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user || !user.passwordHash || !user.isActive) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  if (user.systemRole !== "SUPER_ADMIN") {
    return {
      success: false,
      message: "Super admin access required.",
    };
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      systemRole: user.systemRole,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );

  return {
    success: true,
    message: "Super admin login successful.",

    token,

    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      systemRole: user.systemRole,
    },
  };
}

export async function getCurrentAdminService(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user || !user.isActive || user.systemRole !== "SUPER_ADMIN") {
    return {
      success: false,
      message: "Super admin not found.",
    };
  }

  return {
    success: true,

    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      systemRole: user.systemRole,
    },
  };
}
