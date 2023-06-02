import { Account } from "../../aleo-sdk";

export const create = async () => {
  const account = new Account();

  return {
    privateKey: account._privateKey.to_string(),
    viewKey: account._viewKey.to_string(),
    address: account._address.to_string(),
  };
};

export const account = { create };
