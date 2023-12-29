import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace ImageModule {
  interface DefinedFields {
    Image:
      | "id"
      | "refId"
      | "caption"
      | "altText"
      | "data"
      | "type"
      | "position"
      | "deleted"
      | "deletedAt"
      | "createdAt"
      | "updatedAt";
  }

  interface DefinedEnumValues {
    IMAGE_TYPE: "BASE64" | "FILENAME" | "PATH" | "URL";
  }

  export type Image = Pick<Types.Image, DefinedFields["Image"]>;
  export type IMAGE_TYPE = DefinedEnumValues["IMAGE_TYPE"];
  export type DateTime = Types.DateTime;

  export type ImageResolvers = Pick<
    Types.ImageResolvers,
    DefinedFields["Image"] | "__isTypeOf"
  >;

  export interface Resolvers {
    Image?: ImageResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Image?: {
      "*"?: gm.Middleware[];
      id?: gm.Middleware[];
      refId?: gm.Middleware[];
      caption?: gm.Middleware[];
      altText?: gm.Middleware[];
      data?: gm.Middleware[];
      type?: gm.Middleware[];
      position?: gm.Middleware[];
      deleted?: gm.Middleware[];
      deletedAt?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  }
}
