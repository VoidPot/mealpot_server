import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { Context } from "./context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  CountryCode: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  JSON: { input: any; output: any };
  JSONObject: { input: any; output: any };
};

export type ConnectionRole =
  | "ADMIN"
  | "BILLER"
  | "KITCHEN"
  | "MANAGER"
  | "OTHER";

export type ImageType = "BASE64" | "FILENAME" | "PATH" | "URL";

export type Image = {
  __typename?: "Image";
  altText?: Maybe<Scalars["String"]["output"]>;
  caption?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  data: Scalars["String"]["output"];
  deleted?: Maybe<Scalars["Boolean"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  position: Scalars["String"]["output"];
  refId: Scalars["Int"]["output"];
  type: ImageType;
  updatedAt: Scalars["DateTime"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  _: Scalars["String"]["output"];
  login: Response;
  storeLogin: Response;
};

export type MutationArgs = {
  message: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationStoreLoginArgs = {
  storeId: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  _: Scalars["String"]["output"];
  date?: Maybe<Scalars["Date"]["output"]>;
  dateTime?: Maybe<Scalars["DateTime"]["output"]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
  jsonObject?: Maybe<Scalars["JSONObject"]["output"]>;
  store?: Maybe<Store>;
  stores?: Maybe<Array<Maybe<Store>>>;
};

export type Response = {
  __typename?: "Response";
  payload: Scalars["JSON"]["output"];
};

export type Store = {
  __typename?: "Store";
  createdAt: Scalars["DateTime"]["output"];
  deck?: Maybe<Scalars["String"]["output"]>;
  deleted?: Maybe<Scalars["Boolean"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  phone?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  tables: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type Subscription = {
  __typename?: "Subscription";
  _?: Maybe<Scalars["String"]["output"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<NonNullable<unknown>>;
  CONNECTION_ROLE: ResolverTypeWrapper<NonNullable<unknown>>;
  CountryCode: ResolverTypeWrapper<NonNullable<unknown>>;
  Date: ResolverTypeWrapper<NonNullable<unknown>>;
  DateTime: ResolverTypeWrapper<NonNullable<unknown>>;
  EmailAddress: ResolverTypeWrapper<NonNullable<unknown>>;
  IMAGE_TYPE: ResolverTypeWrapper<NonNullable<unknown>>;
  Image: ResolverTypeWrapper<NonNullable<unknown>>;
  Int: ResolverTypeWrapper<NonNullable<unknown>>;
  JSON: ResolverTypeWrapper<NonNullable<unknown>>;
  JSONObject: ResolverTypeWrapper<NonNullable<unknown>>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<NonNullable<unknown>>;
  Store: ResolverTypeWrapper<NonNullable<unknown>>;
  String: ResolverTypeWrapper<NonNullable<unknown>>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: NonNullable<unknown>;
  CountryCode: NonNullable<unknown>;
  Date: NonNullable<unknown>;
  DateTime: NonNullable<unknown>;
  EmailAddress: NonNullable<unknown>;
  Image: NonNullable<unknown>;
  Int: NonNullable<unknown>;
  JSON: NonNullable<unknown>;
  JSONObject: NonNullable<unknown>;
  Mutation: {};
  Query: {};
  Response: NonNullable<unknown>;
  Store: NonNullable<unknown>;
  String: NonNullable<unknown>;
  Subscription: {};
};

export interface CountryCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["CountryCode"], any> {
  name: "CountryCode";
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type ImageResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Image"] = ResolversParentTypes["Image"],
> = {
  altText?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  data?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  deletedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  position?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["IMAGE_TYPE"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  _?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationArgs, "message">
  >;
  login?: Resolver<
    ResolversTypes["Response"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "password" | "username">
  >;
  storeLogin?: Resolver<
    ResolversTypes["Response"],
    ParentType,
    ContextType,
    RequireFields<MutationStoreLoginArgs, "storeId">
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  _?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  dateTime?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  json?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  jsonObject?: Resolver<
    Maybe<ResolversTypes["JSONObject"]>,
    ParentType,
    ContextType
  >;
  store?: Resolver<Maybe<ResolversTypes["Store"]>, ParentType, ContextType>;
  stores?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Store"]>>>,
    ParentType,
    ContextType
  >;
};

export type ResponseResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Response"] = ResolversParentTypes["Response"],
> = {
  payload?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Store"] = ResolversParentTypes["Store"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  deletedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tables?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  _?: SubscriptionResolver<
    Maybe<ResolversTypes["String"]>,
    "_",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = Context> = {
  CountryCode?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Image?: ImageResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

export type CountryCode = Scalars["CountryCode"];
export type Date = Scalars["Date"];
export type DateTime = Scalars["DateTime"];
export type EmailAddress = Scalars["EmailAddress"];
export type Json = Scalars["JSON"];
export type JsonObject = Scalars["JSONObject"];
