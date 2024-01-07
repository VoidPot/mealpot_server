import { Account, CONNECTION_ROLE, Store } from "@prisma/client";

export type RoleObject = {
  id: number;
  role: CONNECTION_ROLE;
};

export type ContextAuthData = {
  hasHeaderToken: Boolean;
  isAuthenticated: Boolean;
  id: number;
  account?: {
    id: number;
    data: Account;
    stores: Store[];
    token: string;
    roles: RoleObject[];
  };
  store?: {
    id: number;
    role: CONNECTION_ROLE;
    data: Store;
  };
  stores: number[];
};
