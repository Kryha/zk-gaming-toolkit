import { RequestHandler } from "express";

import { dice } from "../../library";

interface DiceController {
  roll: RequestHandler;
}

export const diceController: DiceController = {
  roll: async (_req, res) => {
    const value = await dice.roll(2);
    res.send({ value });
  },
};
