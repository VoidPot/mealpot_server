import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: "user";
    Mutation: "updateUser";
    User:
      | "id"
      | "firstName"
      | "lastName"
      | "email"
      | "emailVerified"
      | "avatar"
      | "avatarId"
      | "phoneNumber"
      | "userProfile"
      | "deleted"
      | "deletedAt"
      | "createdAt"
      | "updatedAt";
  }

  interface DefinedInputFields {
    UserUpdate: "firstName" | "lastName" | "avatarId" | "phoneNumber";
  }

  export type Query = Pick<Types.Query, DefinedFields["Query"]>;
  export type User = Pick<Types.User, DefinedFields["User"]>;
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>;
  export type UserUpdate = Pick<
    Types.UserUpdate,
    DefinedInputFields["UserUpdate"]
  >;
  export type EmailAddress = Types.EmailAddress;
  export type Image = Types.Image;
  export type UserProfile = Types.UserProfile;
  export type DateTime = Types.DateTime;

  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >;
  export type UserResolvers = Pick<
    Types.UserResolvers,
    DefinedFields["User"] | "__isTypeOf"
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    User?: UserResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    Mutation?: {
      "*"?: gm.Middleware[];
      updateUser?: gm.Middleware[];
    };
    User?: {
      "*"?: gm.Middleware[];
      id?: gm.Middleware[];
      firstName?: gm.Middleware[];
      lastName?: gm.Middleware[];
      email?: gm.Middleware[];
      emailVerified?: gm.Middleware[];
      avatar?: gm.Middleware[];
      avatarId?: gm.Middleware[];
      phoneNumber?: gm.Middleware[];
      userProfile?: gm.Middleware[];
      deleted?: gm.Middleware[];
      deletedAt?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  }
}
