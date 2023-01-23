import { RequestHandler } from "express";

interface ProofGenController {
  generate: RequestHandler;
}

export const proofGenController: ProofGenController = {
  generate: async (_req, res) => {
    // TODO: imlpement service function
    // const value = await proofGen.generate();
    res.send({ value: 42 });
  },
};
