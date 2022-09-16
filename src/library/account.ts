import { aleoService } from "../services";

export const account = {
  // TODO: store account information somewhere
  create: async () => {
    const res = await aleoService.createAccount();
    return res;
  },
};
