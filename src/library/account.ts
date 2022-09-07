import { aleoExec } from "../utils";

export const account = {
  // TODO: store account information somewhere
  create: async () => {
    const res = await aleoExec.createAccount();
    return res;
  },
};
