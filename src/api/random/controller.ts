import { RequestHandler } from "express";

import { leo } from "../../services";

interface RandomController {
  generateNumber: RequestHandler;
  generateHashChainRecord: RequestHandler;
}

export const randomController: RandomController = {
  generateNumber: async (req, res) => {
    const { seed, min, max, privateKey, viewKey, owner } = req.body;
    const value = await leo.rng.getRandomNumber(privateKey, viewKey, owner, seed, min, max);
    res.send(value);
  },
  generateHashChainRecord: async (req, res) => {
    const { owner, seed, privateKey, viewKey } = req.body;
    const value = await leo.hashChain.getHashChainRecord(privateKey, viewKey, owner, seed);
    res.send(value);
  },
};
