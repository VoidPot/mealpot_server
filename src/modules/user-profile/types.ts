import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace UserProfileModule {
  interface DefinedFields {
    UserProfile:
      | "id"
      | "user"
      | "userId"
      | "profile"
      | "profileId"
      | "role"
      | "deleted"
      | "deletedAt"
      | "createdAt"
      | "updatedAt";
  }

  interface DefinedEnumValues {
    USER_PROFILE_ROLE: "ADMIN" | "MANAGER" | "AUTHOR";
  }

  export type UserProfile = Pick<
    Types.UserProfile,
    DefinedFields["UserProfile"]
  >;
  export type User = Types.User;
  export type Profile = Types.Profile;
  export type USER_PROFILE_ROLE = DefinedEnumValues["USER_PROFILE_ROLE"];
  export type DateTime = Types.DateTime;

  export type UserProfileResolvers = Pick<
    Types.UserProfileResolvers,
    DefinedFields["UserProfile"] | "__isTypeOf"
  >;

  export interface Resolvers {
    UserProfile?: UserProfileResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    UserProfile?: {
      "*"?: gm.Middleware[];
      id?: gm.Middleware[];
      user?: gm.Middleware[];
      userId?: gm.Middleware[];
      profile?: gm.Middleware[];
      profileId?: gm.Middleware[];
      role?: gm.Middleware[];
      deleted?: gm.Middleware[];
      deletedAt?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  }
}
