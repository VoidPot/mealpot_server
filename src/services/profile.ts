import { prisma } from "../providers/prisma.js";

async function createProfile(username: string) {
  const result = await prisma.profile.create({
    data: {
      username,
    },
  });
  return result;
}

async function getOneProfile(username: string) {
  const result = await prisma.profile.findUnique({
    where: {
      username,
    },
  });
  return result;
}

async function getMyProfiles(userId: string) {
  const result = await prisma.userProfile.findMany({
    where: {
      userId,
    },
    include: {
      profile: true,
    },
  });
  return result.map(({ profile, ...userProfile }) => ({
    ...profile,
    userProfile,
  }));
}

async function isUniqueUsername(username: string) {
  const result = await prisma.profile.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  return Boolean(result?.username);
}

export default {
  getOneProfile,
  getMyProfiles,
  isUniqueUsername,
  createProfile,
};
