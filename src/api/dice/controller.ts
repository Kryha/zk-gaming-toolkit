import { RequestHandler } from "express";

import { DELETE_PAYLOAD } from "../../constants";
import { leo } from "../../services";

interface DiceController {
  create: RequestHandler;
  burn: RequestHandler;
  increment: RequestHandler;
  decrement: RequestHandler;
}

export const diceController: DiceController = {
  create: async (req, res) => {
    const { owner, matchId, diceAmount, privateKey, viewKey } = req.body;
    const dice = await leo.dice.createDice(privateKey, viewKey, owner, matchId, diceAmount);
    res.send({ dice });
  },
  burn: async (req, res) => {
    const { dice, privateKey, viewKey } = req.body;
    await leo.dice.burnDice(privateKey, viewKey, dice);
    res.send(DELETE_PAYLOAD);
  },
  increment: async (req, res) => {
    const { dice, privateKey, viewKey } = req.body;
    const updatedDice = await leo.dice.incrementDiceAmount(privateKey, viewKey, dice);
    res.send({ dice: updatedDice });
  },
  decrement: async (req, res) => {
    const { dice, privateKey, viewKey } = req.body;
    const updatedDice = await leo.dice.decrementDiceAmount(privateKey, viewKey, dice);
    res.send({ dice: updatedDice });
  },
};
