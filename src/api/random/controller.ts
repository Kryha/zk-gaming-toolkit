import { RequestHandler } from "express";

import { random } from "../../library";

interface RandomController {
  generate: RequestHandler;
}

export const randomController: RandomController = {
  generate: async (req, res) => {
    const value = await random.generate(req.body.min, req.body.max);
    res.send({ value });
  },
};
