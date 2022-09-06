import { leoExec } from "../utils";

export const keyGen = {
  // TODO: implement function
  generate: async () => {
    const res = leoExec.call.generateKey(2, 3);
    return res;
  },
};
