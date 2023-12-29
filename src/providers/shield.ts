/* eslint-disable @typescript-eslint/no-unused-vars */
import { rule, shield } from "graphql-shield";
import logger from "./logger.js";
import { GQLError } from "./error-handlers.js";
import { GraphQLError } from "graphql";
import { Context } from "../types/context.js";

const isAnybody = rule({ cache: "contextual" })(async () => {
  return true;
});

const isNotAuthenticated = rule({ cache: "contextual" })(async (
  _parent,
  _args,
  ctx: Context,
  _info,
) => {
  if (ctx.auth.isTokenExist) {
    return GQLError("AUTHORIZED_NOT_ALLOW", "AUTHENTICATION_FAILED");
  }
  return true;
});

const isAuthenticated = rule({ cache: "contextual" })(async (
  _parent,
  _args,
  ctx: Context,
  _info,
) => {
  if (!ctx.auth.isAuthenticated) {
    return GQLError("UNAUTHORIZED_NOT_ALLOW", "AUTHENTICATION_FAILED");
  }
  return true;
});

export const permissions = shield(
  {
    Query: {
      profile: isAnybody,
      myProfiles: isAuthenticated,
      user: isAuthenticated,
    },
    Mutation: {
      googleSignIn: isNotAuthenticated,
      login: isNotAuthenticated,
      signUp: isNotAuthenticated,
      changePassword: isAuthenticated,
      resetPassword: isNotAuthenticated,
      forgotPassword: isNotAuthenticated,
      createFirstProfile: isAuthenticated,
      updateUser: isAuthenticated,
    },
  },
  {
    async fallbackError(thrownThing, _parent, _args, _context, _info) {
      logger.debug({
        GraphQLError: thrownThing instanceof GraphQLError,
        Error: thrownThing instanceof Error,
        thrownThing,
      });
      if (thrownThing instanceof GraphQLError) {
        // expected errors
        return thrownThing;
      }
      if (thrownThing instanceof Error) {
        // unexpected errors
        logger.error(thrownThing);
        return GQLError("SHIELD_FALLBACK_ERROR");
      }
      // what the hell got thrown
      logger.error(
        "The resolver threw something that is not an error.",
        thrownThing,
      );
      return GQLError("SHIELD_FALLBACK_ERROR");
    },
  },
);
