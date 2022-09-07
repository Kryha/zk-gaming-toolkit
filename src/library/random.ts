import { leoExec } from "../utils";

export const random = {
  // TODO: implement function
  generate: async (min: number, max: number) => {
    const res = leoExec.call.random(min, max);
    return res;
  },
};
