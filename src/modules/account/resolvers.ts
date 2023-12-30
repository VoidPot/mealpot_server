import triggerEmail from "../../helpers/email/index.js";
import { decodeGoogleAuthResponse } from "../../helpers/google-auth.js";
import {
  generatePasswordHash,
  verifyPasswordHash,
} from "../../helpers/hash.js";
import { encodeJWT } from "../../helpers/jwt.js";
import { generateOtp } from "../../helpers/otp.js";
import profile from "../../services/profile.js";
import token from "../../services/token.js";
import user from "../../services/user.js";
import { mapToObject } from "../../utils/common.js";
import { AccountModule } from "./types.js";

const resolvers: AccountModule.Resolvers = {
  Query: {
    usernameExist: async (_parent, { username }) => {
      return await profile.isUniqueUsername(username);
    },
    emailExist: async (_parent, { email }) => {
      return user.isUniqueEmail(email);
    },
  },
  Mutation: {
    googleSignIn: async (
      _parent,
      { input, selectBy },
      { logger, GQLError },
    ) => {
      const payload = await decodeGoogleAuthResponse(input, selectBy);

      logger.debug("MUTATION :: GOOGLE SIGN IN RESOLVER", {
        input,
        selectBy,
        payload,
      });

      if (payload && payload.email_verified && payload.email) {
        const fetchedUser = await user.getGoogleAuthData(payload.email);

        logger.debug("MUTATION :: GOOGLE SIGN IN RESOLVER", {
          fetchedUser,
        });

        if (fetchedUser && fetchedUser.id) {
          const token = encodeJWT({
            id: fetchedUser.id,
            email: fetchedUser.email,
          });

          if (!fetchedUser.googleAuthId && payload?.sub) {
            user.updateGoogleAuthData(fetchedUser.email, payload.sub);
          }

          return {
            code: 200,
            message: "GOOGLE_SIGN_IN",
            payload: {},
            token,
            redirect: "/dashboard",
          };
        }

        const response = await user.createGoogleSignUp(payload);

        const token = encodeJWT({
          id: response.id,
          email: response.email,
        });

        return {
          code: 200,
          message: "GOOGLE_SIGN_UP",
          payload: {
            googleAuthId: payload?.sub,
            email: payload.email,
            ...mapToObject(payload, [
              ["firstName", "given_name"],
              ["lastName", "family_name"],
            ]),
          },
          token,
          redirect: "/complete-google-signup",
        };
      }

      throw GQLError("UNEXPECTED_ERROR", "AUTHENTICATION_FAILED");
    },
    login: async (_parent, { email, password }, { GQLError }) => {
      const response = await user.getAuthData(email);
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
              email: response.email,
            });

            return {
              code: 200,
              message: "EMAIL_LOGIN",
              payload: {},
              token,
              redirect: "/dashboard",
            };
          }

          throw GQLError("INCORRECT_PASSWORD", "ENTITY_NOT_FOUND");
        }

        throw GQLError("NO_PASSWORD_ADDED", "ENTITY_NOT_FOUND");
      }

      throw GQLError("USER_NOT_FOUND", "ENTITY_NOT_FOUND");
    },
    signUp: async (_parent, arg, { GQLError }) => {
      const isUsernameTaken = await profile.isUniqueUsername(arg.username);
      if (isUsernameTaken) {
        throw GQLError("USERNAME_TAKEN", "ENTITY_NOT_FOUND");
      }

      const isEmailTaken = await user.isUniqueEmail(arg.email);
      if (isEmailTaken) {
        throw GQLError("EMAIL_EXIST", "ENTITY_NOT_FOUND");
      }

      const response = await user.createSignUp(arg);

      const token = encodeJWT({
        id: response.id,
        email: response.email,
      });

      const otp = generateOtp(6, {});

      triggerEmail(response.email, "email_verify", [
        ["URL", "https://mealpot.app"],
        ["CODE", otp],
        ["NAME", response.email.split("@")[0]],
      ]);

      return {
        code: 200,
        message: "GOOGLE_SIGN_IN",
        payload: {},
        token,
        redirect: "/dashboard",
      };
    },

    resetPassword: async (
      _parent,
      { email, otp, password },
      { auth, GQLError },
    ) => {
      const response = await token.getToken(email, "MAIL_VERIFY");
      if (!response || !response.id) {
        throw GQLError("TOKEN_NOT_FOUND", "ENTITY_NOT_FOUND");
      }
      const { content } = response;
      if (content !== otp) {
        throw GQLError("INCORRECT_OTP", "ENTITY_NOT_FOUND");
      }

      const [hash, salt] = generatePasswordHash(password);
      await user.updateUserPassword(auth.id, hash, salt);
      return true;
    },

    forgotPassword: async (_parent, arg, { auth }) => {
      const { firstName, lastName, email } = auth;
      const response = await token.createOtpToken(auth.id, "MAIL_VERIFY");

      triggerEmail(email, "email_verify", [
        [
          "URL",
          `https://mealpot.app/reset-password?email=${email}&otp=${response.content}`,
        ],
        ["CODE", response.content],
        ["NAME", firstName || lastName || email.split("@")[0]],
      ]);
      return true;
    },
    changePassword: async (
      _parent,
      { oldPassword, password },
      { auth, GQLError },
    ) => {
      const response = await user.getAuthData(auth.email);
      if (response && response.password && response.salt) {
        const validatePassword = verifyPasswordHash(
          oldPassword,
          response.password,
          response.salt,
        );

        if (validatePassword) {
          const [hash, salt] = generatePasswordHash(password);
          await user.updateUserPassword(auth.id, hash, salt);
          return true;
        }

        throw GQLError("INCORRECT_PASSWORD", "ENTITY_NOT_FOUND");
      }
    },
  },
  // Response: {
  //   __resolveType: (collection) => {}
  // },
  // AuthResponse: {
  //   code: (parent) => {
  //     console.log({ parent });
  //     return 200;
  //   },
  //   // message: "GOOGLE_SIGN_IN",
  //   // payload: {},
  //   // token,
  //   // redirect: "/dashboard",
  // },
};

export default resolvers;
