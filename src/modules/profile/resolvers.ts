import { ProfileModule } from "./types.js";
import profile from "../../services/profile.js";
import { GQLError } from "../../providers/error-handlers.js";

const resolvers: ProfileModule.Resolvers = {
  Query: {
    profile: async (_parent, arg) => {
      return await profile.getOneProfile(arg.username);
    },
    myProfiles: async (_parent, _arg, ctx) => {
      return await profile.getMyProfiles(ctx.auth.id);
    },
  },
  Mutation: {
    createFirstProfile: async (_parent, arg, ctx) => {
      const isUsernameTaken = await profile.isUniqueUsername(arg.username);
      if (isUsernameTaken) {
        throw GQLError("USERNAME_TAKEN", "ENTITY_NOT_FOUND");
      }

      if (ctx.auth.profiles.length) {
        throw GQLError("ONE_PROFILE_ALLOWED", "ENTITY_NOT_FOUND");
      }

      return await profile.createProfile(arg.username);
    },
  },
};

export default resolvers;
