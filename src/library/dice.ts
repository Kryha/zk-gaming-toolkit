import { aleoExec } from "../utils";

export const dice = {
  // TODO: implement function
  roll: async (diceAmount: number) => {
    const res = await aleoExec.call.throwDice(2, 3);
    return res;
  },
};
