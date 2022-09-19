import { leoService } from "../services";

export const random = {
  // TODO: implement function
  generate: async (min: number, max: number) => {
    const res = leoService.call.random(min, max);
    return res;
  },
};
