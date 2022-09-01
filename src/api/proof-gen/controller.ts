import { RequestHandler } from "express";

import { proofGen } from "../../library";

interface ProofGenController {
  generate: RequestHandler;
}

export const proofGenController: ProofGenController = {
  generate: async (_req, res) => {
    const value = await proofGen.generate();
    res.send({ value });
  },
};
