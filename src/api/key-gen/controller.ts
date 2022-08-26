import { RequestHandler } from "express";

import { keyGen } from "../../library";

interface KeyGenController {
  generate: RequestHandler;
}

export const keyGenController: KeyGenController = {
  generate: async (_req, res) => {
    const value = await keyGen.generate();
    res.send({ value });
  },
};
