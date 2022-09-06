import { leoExec } from "../utils";

export const dice = {
  // TODO: implement function
  roll: async (diceAmount: number) => {
    const res = await leoExec.call.throwDice(2, 3);
    return res;
  },
};
