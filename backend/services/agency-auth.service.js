import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function agencyLoginService({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },

    include: {
      agencies: {
        include: {
          agency: true,
        },
      },
    },
  });

  if (!user || !user.passwordHash || !user.isActive) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const membership = user.agencies[0];

  if (!membership) {
    return {
      success: false,
      message: "User is not linked to an agency.",
    };
  }

  if (!membership.agency.isActive) {
    return {
      success: false,
      message: "Agency account is inactive.",
    };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      agencyId: membership.agencyId,
      agencyRole: membership.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );

  return {
    success: true,
    message: "Agency login successful.",

    token,

    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,

      agencyId: membership.agencyId,

      agencyName: membership.agency.name,

      agencySlug: membership.agency.slug,

      agencyRole: membership.role,
    },
  };
}
