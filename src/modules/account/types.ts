import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace AccountModule {
  interface DefinedFields {
    Query: "usernameExist" | "emailExist";
    Mutation:
      | "googleSignIn"
      | "login"
      | "signUp"
      | "changePassword"
      | "resetPassword"
      | "forgotPassword";
    Response: "code" | "message" | "payload" | "token" | "redirect";
  }

  export type Query = Pick<Types.Query, DefinedFields["Query"]>;
  export type EmailAddress = Types.EmailAddress;
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>;
  export type Response = Pick<Types.Response, DefinedFields["Response"]>;
  export type JSON = Types.Json;

  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >;
  export type ResponseResolvers = Pick<
    Types.ResponseResolvers,
    DefinedFields["Response"] | "__isTypeOf"
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Response?: ResponseResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      usernameExist?: gm.Middleware[];
      emailExist?: gm.Middleware[];
    };
    Mutation?: {
      "*"?: gm.Middleware[];
      googleSignIn?: gm.Middleware[];
      login?: gm.Middleware[];
      signUp?: gm.Middleware[];
      changePassword?: gm.Middleware[];
      resetPassword?: gm.Middleware[];
      forgotPassword?: gm.Middleware[];
    };
    Response?: {
      "*"?: gm.Middleware[];
      code?: gm.Middleware[];
      message?: gm.Middleware[];
      payload?: gm.Middleware[];
      token?: gm.Middleware[];
      redirect?: gm.Middleware[];
    };
  }
}
