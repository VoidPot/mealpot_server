import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Context } from "../types/context.js";
import logger from "./logger.js";
import configs from "./configs.js";
import { prisma } from "./prisma.js";
import { GQLError } from "./error-handlers.js";
import pubsub, { subscriptionName } from "./pubsub.js";
import { ContextAuthData } from "../types/type.js";
import { decodeJWT } from "../helpers/jwt.js";
import accountService from "../services/account.js";

const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async ({ req }) => {
  const user: ContextAuthData = {
    hasHeaderToken: false,
    isAuthenticated: false,
    id: 0,
    stores: [],
  };

  try {
    const token: any = req.headers.authorization || undefined;
    logger.debug("CONTEXT :: header :: token ", { token });
    if (token) {
      user.hasHeaderToken = true;

      const response = decodeJWT(token);
      logger.debug("CONTEXT :: jwt :: decode ", { response });

      if (typeof response === "string") {
        throw GQLError(response, "AUTHENTICATION_FAILED");
      }
      const { id, storeId } = response;

      if (!id) {
        throw GQLError("INVALID_TOKEN", "AUTHENTICATION_FAILED");
      }

      const data = await accountService.getContextData(id);

      logger.debug("CONTEXT :: account :: data ", { response });

      if (!data?.id) {
        throw GQLError("INVALID_TOKEN", "AUTHENTICATION_FAILED");
      }

      user.id = data.id;
      user.isAuthenticated = true;

      if (data) {
        const { connections, ...account } = data;
        user.account = {
          id: account.id,
          data: account,
          stores: connections.map((e) => e.store),
          token,
          roles: connections.map((e) => ({ id: e.store.id, role: e.role })),
        };
        user.stores = connections.map((e) => e.store.id);
        if (storeId) {
          const connection = connections.find(
            (e) => e.store.id === Number(storeId),
          );

          if (connection?.store) {
            user.store = {
              id: connection.store.id,
              role: connection.role,
              data: connection.store,
            };
          }
        }
      }
    }
  } catch (error) {
    logger.error("context ::", error);
  }

  return {
    user,
    logger,
    configs,
    GQLError,
    pubsub,
    subscriptionName,
    database: prisma,
  };
};

export default getContext;
