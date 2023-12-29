import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace ProfileModule {
  interface DefinedFields {
    Query: "profile" | "myProfiles";
    Mutation: "createFirstProfile";
    Profile:
      | "id"
      | "username"
      | "content"
      | "theme"
      | "layout"
      | "placement"
      | "deleted"
      | "deletedAt"
      | "createdAt"
      | "updatedAt";
  }

  export type Query = Pick<Types.Query, DefinedFields["Query"]>;
  export type Profile = Pick<Types.Profile, DefinedFields["Profile"]>;
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>;
  export type JSONObject = Types.JsonObject;
  export type DateTime = Types.DateTime;

  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >;
  export type ProfileResolvers = Pick<
    Types.ProfileResolvers,
    DefinedFields["Profile"] | "__isTypeOf"
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Profile?: ProfileResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      profile?: gm.Middleware[];
      myProfiles?: gm.Middleware[];
    };
    Mutation?: {
      "*"?: gm.Middleware[];
      createFirstProfile?: gm.Middleware[];
    };
    Profile?: {
      "*"?: gm.Middleware[];
      id?: gm.Middleware[];
      username?: gm.Middleware[];
      content?: gm.Middleware[];
      theme?: gm.Middleware[];
      layout?: gm.Middleware[];
      placement?: gm.Middleware[];
      deleted?: gm.Middleware[];
      deletedAt?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  }
}
