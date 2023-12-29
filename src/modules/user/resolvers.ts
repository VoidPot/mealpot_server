import { UserModule } from "./types";
import user from "../../services/user.js";

const resolvers: UserModule.Resolvers = {
  Query: {
    user: async (_parent, _arg, ctx) => {
      return await user.getUser(ctx.auth.id);
    },
  },

  Mutation: {
    updateUser: async (_parent, { input }, ctx) => {
      return await user.updateUserData(ctx.auth.id, input as any);
    },
  },
};

export default resolvers;
