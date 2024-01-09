import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace StoreModule {
  interface DefinedFields {
    Query: "stores" | "store";
    Store:
      | "id"
      | "name"
      | "deck"
      | "slug"
      | "email"
      | "phone"
      | "tables"
      | "deleted"
      | "deletedAt"
      | "createdAt"
      | "updatedAt";
  }

  export type Query = Pick<Types.Query, DefinedFields["Query"]>;
  export type Store = Pick<Types.Store, DefinedFields["Store"]>;
  export type DateTime = Types.DateTime;

  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;
  export type StoreResolvers = Pick<
    Types.StoreResolvers,
    DefinedFields["Store"] | "__isTypeOf"
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Store?: StoreResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      stores?: gm.Middleware[];
      store?: gm.Middleware[];
    };
    Store?: {
      "*"?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      deck?: gm.Middleware[];
      slug?: gm.Middleware[];
      email?: gm.Middleware[];
      phone?: gm.Middleware[];
      tables?: gm.Middleware[];
      deleted?: gm.Middleware[];
      deletedAt?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  }
}
