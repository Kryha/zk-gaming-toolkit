import { aleoExec } from "../utils";

export const account = {
  create: async () => {
    const res = await aleoExec.createAccount();
    return res;
  },
};
