import { aleoExec } from "../utils";

export const powerups = {
  // TODO: implement function
  use: async () => {
    const res = await aleoExec.call.powerup(2, 3);
    return res;
  },
};
