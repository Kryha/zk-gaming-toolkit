import { aleoExec } from "../utils";

export const random = {
  // TODO: implement function
  generate: async (min: number, max: number) => {
    const res = aleoExec.call.random(min, max);
    return res;
  },
};
