import { USER_PROFILE_ROLE } from "@prisma/client";

export type ContextAuthData = {
  isTokenExist: Boolean;
  isAuthenticated: Boolean;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: Boolean;
  googleAuthId?: string;
  googleConnected: Boolean;
  passwordAdded: Boolean;
  profiles: {
    id: string;
    username: string;
    role: USER_PROFILE_ROLE;
    userProfileId: string;
  }[];
};
