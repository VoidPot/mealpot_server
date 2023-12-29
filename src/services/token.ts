import { prisma } from "../providers/prisma.js";
import { generateOtp } from "../helpers/otp.js";
import { getTokenExpireDate, getUTCnow } from "../utils/date.js";
import { $Enums } from "@prisma/client";

async function createOtpToken(userId: string, type: $Enums.TOKEN_TYPE) {
  const response = await prisma.token.create({
    data: {
      content: generateOtp(6, {}),
      type,
      expiresAt: getTokenExpireDate(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return response;
}

async function getToken(email: string, type: $Enums.TOKEN_TYPE) {
  const response = await prisma.token.findFirst({
    where: {
      type,
      expiresAt: {
        gte: getUTCnow(),
      },
      user: {
        email,
      },
    },
  });
  return response;
}

export default {
  createOtpToken,
  getToken,
};
