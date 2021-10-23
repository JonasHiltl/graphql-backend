/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context as Context } from "./context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UserWhereUniqueInput: { // input type
    id: string; // ID!
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
  Role: "ADMIN" | "DEV" | "USER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  Upload: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  FollowRelation: { // root type
    accepted: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    fromId: string; // String!
    toId: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    emailVerified: boolean; // Boolean!
    firstname: string; // String!
    id: string; // ID!
    lastname?: string | null; // String
    picture?: string | null; // String
    role: NexusGenEnums['Role']; // Role!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  FollowRelation: { // field return type
    accepted: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    from: NexusGenRootTypes['User']; // User!
    fromId: string; // String!
    to: NexusGenRootTypes['User']; // User!
    toId: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
    confirmEmail: boolean; // Boolean!
    logIn: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    resendConfirmationEmail: boolean; // Boolean!
    signUp: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    uploadProfilePicture: string | null; // String
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
    myFollowerCount: NexusGenRootTypes['User']; // User!
    userById: NexusGenRootTypes['User'] | null; // User
    userByUsername: NexusGenRootTypes['User'] | null; // User
    userNameExists: boolean; // Boolean!
  }
  User: { // field return type
    email: string; // String!
    emailVerified: boolean; // Boolean!
    firstname: string; // String!
    followers: NexusGenRootTypes['FollowRelation'][] | null; // [FollowRelation!]
    following: NexusGenRootTypes['FollowRelation'][] | null; // [FollowRelation!]
    id: string; // ID!
    lastname: string | null; // String
    picture: string | null; // String
    role: NexusGenEnums['Role']; // Role!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  FollowRelation: { // field return type name
    accepted: 'Boolean'
    createdAt: 'DateTime'
    from: 'User'
    fromId: 'String'
    to: 'User'
    toId: 'String'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    confirmEmail: 'Boolean'
    logIn: 'AuthPayload'
    resendConfirmationEmail: 'Boolean'
    signUp: 'AuthPayload'
    uploadProfilePicture: 'String'
  }
  Query: { // field return type name
    me: 'User'
    myFollowerCount: 'User'
    userById: 'User'
    userByUsername: 'User'
    userNameExists: 'Boolean'
  }
  User: { // field return type name
    email: 'String'
    emailVerified: 'Boolean'
    firstname: 'String'
    followers: 'FollowRelation'
    following: 'FollowRelation'
    id: 'ID'
    lastname: 'String'
    picture: 'String'
    role: 'Role'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    confirmEmail: { // args
      id: string; // String!
    }
    logIn: { // args
      password: string; // String!
      usernameOrEmail: string; // String!
    }
    signUp: { // args
      email: string; // String!
      firstname: string; // String!
      lastname: string; // String!
      password: string; // String!
      username: string; // String!
    }
    uploadProfilePicture: { // args
      data?: NexusGenScalars['Upload'] | null; // Upload
    }
  }
  Query: {
    userById: { // args
      id: string; // String!
    }
    userByUsername: { // args
      username: string; // String!
    }
    userNameExists: { // args
      username: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}