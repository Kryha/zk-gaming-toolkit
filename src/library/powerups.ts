import { leoService } from "../services";

export const powerups = {
  // TODO: implement function
  use: async () => {
    const res = await leoService.call.powerups(2, 3);
    return res;
  },
};
