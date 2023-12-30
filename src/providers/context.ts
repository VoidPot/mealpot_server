import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Context } from "../types/context.js";
import logger from "./logger.js";
import configs from "./configs.js";
import { prisma } from "./prisma.js";
import { GQLError } from "./error-handlers.js";
import pubsub, { subscriptionName } from "./pubsub.js";
import { decodeJWT } from "../helpers/jwt.js";
import { ContextAuthData } from "../types/type.js";
import user from "../services/user.js";

const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async ({ req }) => {
  let auth: ContextAuthData = {
    hasToken: false,
    isAuthenticated: false,
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    emailVerified: false,
    googleConnected: false,
    passwordAdded: false,
    profiles: [],
  };

  try {
    const token: any = req.headers.authorization || undefined;
    logger.debug("CONTEXT :: header :: token ", { token });

    if (token) {
      auth.hasToken = true;
      const response = decodeJWT(token);

      if (typeof response === "string") {
        throw GQLError(response, "AUTHENTICATION_FAILED");
      }

      const { id } = response;
      if (id) {
        const response = await user.getContextData(id);
        if (response?.id) {
          auth = {
            ...auth,
            isAuthenticated: true,
            id: response.id,
            email: response.email,
            firstName: response.firstName || "",
            lastName: response.lastName || "",
            emailVerified: response.emailVerified,
            googleConnected: Boolean(response.googleAuthId),
            passwordAdded: Boolean(response.password),
          };
        }
      }
    }
  } catch (error) {
    logger.error("context ::", error);
  }

  return {
    auth,
    logger,
    configs,
    GQLError,
    pubsub,
    subscriptionName,
    database: prisma,
  };
};

export default getContext;
