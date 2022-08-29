import { aleoExec } from "../utils";

export const keyGen = {
  // TODO: implement function
  generate: async () => {
    const res = await aleoExec.call.generateKey(2, 3);
    return res;
  },
};
