import { TokenPayload } from "google-auth-library";
import { prisma } from "../providers/prisma.js";
import { mapToObject } from "../utils/common.js";
import logger from "../providers/logger.js";
import { generatePasswordHash } from "../helpers/hash.js";
import { MutationSignUpArgs, RequireFields } from "../types/graphql";

async function isUniqueEmail(email: string) {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });
  return Boolean(result?.email);
}

async function getUser(id: string) {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
}

async function updateUserPassword(id: string, password: string, salt: string) {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
      salt,
    },
  });
  return result;
}

async function updateUserData(
  id: string,
  input: {
    firstName?: String | undefined;
    lastName?: String | undefined;
    avatarId?: String | undefined;
    phoneNumber?: String | undefined;
  },
) {
  if (!Object.keys(input).length) {
    return {};
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...(input as any),
    },
  });
  return result;
}

async function getContextData(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
      deleted: false,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      emailVerified: true,
      googleAuthId: true,
      userProfile: {
        select: {
          id: true,
          role: true,
          profile: {
            select: { id: true, username: true },
          },
        },
      },
    },
  });
  return user;
}

async function getAuthData(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      salt: true,
      password: true,
      email: true,
      id: true,
    },
  });
  return user;
}

async function getGoogleAuthData(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      googleAuthId: true,
      email: true,
      id: true,
    },
  });
  return user;
}

async function updateGoogleAuthData(email: string, googleAuthId: string) {
  const user = await prisma.user.update({
    where: { email },
    data: {
      googleAuthId,
    },
  });
  return user;
}

async function createGoogleSignUp(payload: TokenPayload) {
  const data: any = {
    email: payload.email,
    googleAuthId: payload?.sub,
    ...mapToObject(payload, [
      ["firstName", "given_name"],
      ["lastName", "family_name"],
    ]),
  };

  if (payload.picture) {
    data.avatar = {
      create: {
        data: payload.picture,
        type: "URL",
        ...mapToObject(payload, [
          ["caption", "name"],
          ["altText", "name"],
        ]),
      },
    };
  }

  logger.debug("MUTATION :: GOOGLE SIGN UP", { data });

  const user = await prisma.user.create({
    data,
  });
  return user;
}

async function createSignUp({
  username,
  ...payload
}: RequireFields<MutationSignUpArgs, "email" | "password" | "username">) {
  const [password, salt] = generatePasswordHash(payload.password);

  const user = await prisma.user.create({
    data: {
      ...payload,
      password,
      salt,
      userProfile: {
        create: {
          profile: {
            create: {
              username,
            },
          },
        },
      },
    },
  });
  return user;
}

export default {
  getUser,
  isUniqueEmail,
  getGoogleAuthData,
  updateGoogleAuthData,
  createGoogleSignUp,
  createSignUp,
  getAuthData,
  getContextData,
  updateUserPassword,
  updateUserData,
};
