import { leoExec } from "../utils";

export const powerups = {
  // TODO: implement function
  use: async () => {
    const res = await leoExec.call.powerups(2, 3);
    return res;
  },
};
