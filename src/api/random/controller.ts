import { RequestHandler } from "express";
import { random } from "../../library";

interface RandomController {
  generate: RequestHandler;
}

export const randomController: RandomController = {
  generate: async (_req, res) => {
    const value = await random.generate();
    res.send({ value });
  },
};
