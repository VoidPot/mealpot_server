import { StoreModule } from "./types.js";

const resolvers: StoreModule.Resolvers = {
  Query: {
    store: async (_parent, _arg, { user }) => {
      return user.store?.data || {};
    },
    stores: async (_parent, _arg, { user }) => {
      return user.account?.stores || [];
    },
  },
};

export default resolvers;
