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
  changePassword?: Maybe<Scalars["Boolean"]["output"]>;
  createFirstProfile?: Maybe<Profile>;
  forgotPassword?: Maybe<Scalars["Boolean"]["output"]>;
  googleSignIn: Response;
  login: Response;
  resetPassword?: Maybe<Scalars["Boolean"]["output"]>;
  signUp: Response;
  updateUser?: Maybe<Scalars["String"]["output"]>;
};

export type MutationArgs = {
  message: Scalars["String"]["input"];
};

export type MutationChangePasswordArgs = {
  oldPassword: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationCreateFirstProfileArgs = {
  username: Scalars["String"]["input"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["EmailAddress"]["input"];
};

export type MutationGoogleSignInArgs = {
  input: Scalars["String"]["input"];
  selectBy?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationLoginArgs = {
  email: Scalars["EmailAddress"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationResetPasswordArgs = {
  email: Scalars["EmailAddress"]["input"];
  otp: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSignUpArgs = {
  email: Scalars["EmailAddress"]["input"];
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  input: UserUpdate;
};

export type Profile = {
  __typename?: "Profile";
  content: Scalars["JSONObject"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deleted?: Maybe<Scalars["Boolean"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  layout: Scalars["JSONObject"]["output"];
  placement: Scalars["JSONObject"]["output"];
  theme: Scalars["JSONObject"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  _: Scalars["String"]["output"];
  date?: Maybe<Scalars["Date"]["output"]>;
  dateTime?: Maybe<Scalars["DateTime"]["output"]>;
  emailExist?: Maybe<Scalars["Boolean"]["output"]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
  jsonObject?: Maybe<Scalars["JSONObject"]["output"]>;
  myProfiles?: Maybe<Array<Maybe<Profile>>>;
  profile?: Maybe<Profile>;
  user?: Maybe<User>;
  usernameExist?: Maybe<Scalars["Boolean"]["output"]>;
};

export type QueryEmailExistArgs = {
  email: Scalars["EmailAddress"]["input"];
};

export type QueryProfileArgs = {
  username: Scalars["String"]["input"];
};

export type QueryUsernameExistArgs = {
  username: Scalars["String"]["input"];
};

export type Response = {
  __typename?: "Response";
  code: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
  payload: Scalars["JSON"]["output"];
  redirect: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
};

export type Subscription = {
  __typename?: "Subscription";
  _?: Maybe<Scalars["String"]["output"]>;
};

export type UserProfileRole = "ADMIN" | "AUTHOR" | "MANAGER";

export type User = {
  __typename?: "User";
  avatar?: Maybe<Image>;
  avatarId?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  deleted?: Maybe<Scalars["Boolean"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  email: Scalars["EmailAddress"]["output"];
  emailVerified: Scalars["Boolean"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  userProfile?: Maybe<UserProfile>;
};

export type UserProfile = {
  __typename?: "UserProfile";
  createdAt: Scalars["DateTime"]["output"];
  deleted?: Maybe<Scalars["Boolean"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  profile: Profile;
  profileId: Scalars["String"]["output"];
  role: UserProfileRole;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type UserUpdate = {
  avatarId?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
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
  Profile: ResolverTypeWrapper<NonNullable<unknown>>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<NonNullable<unknown>>;
  String: ResolverTypeWrapper<NonNullable<unknown>>;
  Subscription: ResolverTypeWrapper<{}>;
  USER_PROFILE_ROLE: ResolverTypeWrapper<NonNullable<unknown>>;
  User: ResolverTypeWrapper<NonNullable<unknown>>;
  UserProfile: ResolverTypeWrapper<NonNullable<unknown>>;
  UserUpdate: ResolverTypeWrapper<NonNullable<unknown>>;
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
  Profile: NonNullable<unknown>;
  Query: {};
  Response: NonNullable<unknown>;
  String: NonNullable<unknown>;
  Subscription: {};
  User: NonNullable<unknown>;
  UserProfile: NonNullable<unknown>;
  UserUpdate: NonNullable<unknown>;
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
  changePassword?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePasswordArgs, "oldPassword" | "password">
  >;
  createFirstProfile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateFirstProfileArgs, "username">
  >;
  forgotPassword?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationForgotPasswordArgs, "email">
  >;
  googleSignIn?: Resolver<
    ResolversTypes["Response"],
    ParentType,
    ContextType,
    RequireFields<MutationGoogleSignInArgs, "input">
  >;
  login?: Resolver<
    ResolversTypes["Response"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  resetPassword?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, "email" | "otp" | "password">
  >;
  signUp?: Resolver<
    ResolversTypes["Response"],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "email" | "password" | "username">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "input">
  >;
};

export type ProfileResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Profile"] = ResolversParentTypes["Profile"],
> = {
  content?: Resolver<ResolversTypes["JSONObject"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  deletedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  layout?: Resolver<ResolversTypes["JSONObject"], ParentType, ContextType>;
  placement?: Resolver<ResolversTypes["JSONObject"], ParentType, ContextType>;
  theme?: Resolver<ResolversTypes["JSONObject"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  emailExist?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<QueryEmailExistArgs, "email">
  >;
  json?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  jsonObject?: Resolver<
    Maybe<ResolversTypes["JSONObject"]>,
    ParentType,
    ContextType
  >;
  myProfiles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Profile"]>>>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProfileArgs, "username">
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  usernameExist?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUsernameExistArgs, "username">
  >;
};

export type ResponseResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Response"] = ResolversParentTypes["Response"],
> = {
  code?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  redirect?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type UserResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  avatar?: Resolver<Maybe<ResolversTypes["Image"]>, ParentType, ContextType>;
  avatarId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  deletedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["EmailAddress"], ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  userProfile?: Resolver<
    Maybe<ResolversTypes["UserProfile"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["UserProfile"] = ResolversParentTypes["UserProfile"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  deletedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes["Profile"], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["USER_PROFILE_ROLE"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
};

export type CountryCode = Scalars["CountryCode"];
export type Date = Scalars["Date"];
export type DateTime = Scalars["DateTime"];
export type EmailAddress = Scalars["EmailAddress"];
export type Json = Scalars["JSON"];
export type JsonObject = Scalars["JSONObject"];
