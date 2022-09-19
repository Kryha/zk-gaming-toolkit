import { aleoService } from "../services";

export const account = {
  create: async () => {
    const res = await aleoService.createAccount();
    return res;
  },
};
