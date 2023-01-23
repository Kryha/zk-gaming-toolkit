import { RequestHandler } from "express";

interface RandomController {
  generate: RequestHandler;
}

export const randomController: RandomController = {
  generate: async (req, res) => {
    // TODO: implement service function
    // const value = await random.generate(req.body.min, req.body.max);
    res.send({ value: 6 });
  },
};
