/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query me {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n": types.MeDocument,
    "\n  query seeFeed($offset: Int!) {\n    seeFeed(offset: $offset) {\n      id\n      user {\n        nickname\n        avatar\n      }\n      file\n      caption\n      likes\n      commentNumber\n      comments {\n        id\n        user {\n          nickname\n        }\n        createdAt\n      }\n      createdAt\n      isMine\n      isLiked\n    }\n  }\n": types.SeeFeedDocument,
    "\n  mutation login($nickname: String!, $password: String!) {\n    login(nickname: $nickname, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  mutation createAccount(\n    $name: String!,\n    $nickname: String!,\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      name: $name,\n      nickname: $nickname,\n      email: $email,\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
};

export function graphql(source: "\n  query me {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n"];
export function graphql(source: "\n  query seeFeed($offset: Int!) {\n    seeFeed(offset: $offset) {\n      id\n      user {\n        nickname\n        avatar\n      }\n      file\n      caption\n      likes\n      commentNumber\n      comments {\n        id\n        user {\n          nickname\n        }\n        createdAt\n      }\n      createdAt\n      isMine\n      isLiked\n    }\n  }\n"): (typeof documents)["\n  query seeFeed($offset: Int!) {\n    seeFeed(offset: $offset) {\n      id\n      user {\n        nickname\n        avatar\n      }\n      file\n      caption\n      likes\n      commentNumber\n      comments {\n        id\n        user {\n          nickname\n        }\n        createdAt\n      }\n      createdAt\n      isMine\n      isLiked\n    }\n  }\n"];
export function graphql(source: "\n  mutation login($nickname: String!, $password: String!) {\n    login(nickname: $nickname, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($nickname: String!, $password: String!) {\n    login(nickname: $nickname, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"];
export function graphql(source: "\n  mutation createAccount(\n    $name: String!,\n    $nickname: String!,\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      name: $name,\n      nickname: $nickname,\n      email: $email,\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount(\n    $name: String!,\n    $nickname: String!,\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      name: $name,\n      nickname: $nickname,\n      email: $email,\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;