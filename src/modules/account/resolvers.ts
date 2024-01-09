import { verifyPasswordHash } from "../../helpers/hash.js";
import { encodeJWT } from "../../helpers/jwt.js";
import account from "../../services/account.js";
import { AccountModule } from "./types.js";

const resolvers: AccountModule.Resolvers = {
  Mutation: {
    login: async (_parent, { username, password }, { GQLError }) => {
      const response = await account.getAuthData(username);
      if (response && response.id) {
        if (response.password && response.salt) {
          const validatePassword = verifyPasswordHash(
            password,
            response.password,
            response.salt,
          );

          if (validatePassword) {
            const token = encodeJWT({
              id: response.id,
            });

            return {
              payload: { token },
            };
          }

          throw GQLError("INCORRECT_PASSWORD", "ENTITY_NOT_FOUND");
        }

        throw GQLError("NO_PASSWORD_ADDED", "ENTITY_NOT_FOUND");
      }

      throw GQLError("USER_NOT_FOUND", "ENTITY_NOT_FOUND");
    },
    storeLogin: async (_parent, { storeId }, { user, GQLError }) => {
      if (user.stores.includes(storeId)) {
        const token = encodeJWT({
          id: user.id,
          storeId,
        });
        return {
          payload: { token },
        };
      }

      throw GQLError("NO_ACCESS", "ENTITY_NOT_FOUND");
    },
  },
};

export default resolvers;
