import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace AccountModule {
  interface DefinedFields {
    Mutation: "login" | "storeLogin";
  }

  interface DefinedEnumValues {
    CONNECTION_ROLE: "ADMIN" | "MANAGER" | "BILLER" | "KITCHEN" | "OTHER";
  }

  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>;
  export type Response = Types.Response;
  export type CONNECTION_ROLE = DefinedEnumValues["CONNECTION_ROLE"];

  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >;

  export interface Resolvers {
    Mutation?: MutationResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Mutation?: {
      "*"?: gm.Middleware[];
      login?: gm.Middleware[];
      storeLogin?: gm.Middleware[];
    };
  }
}
