import { leoService } from "../services";

export const dice = {
  // TODO: implement function
  roll: async (diceAmount: number) => {
    const res = await leoService.call.throwDice(2, 3);
    return res;
  },
};
