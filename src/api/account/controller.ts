import { RequestHandler } from "express";

import { aleo } from "../../services";

interface AccoutController {
  create: RequestHandler;
}

export const accountController: AccoutController = {
  create: async (_req, res) => {
    const newAccount = await aleo.createAccount();
    res.send(newAccount);
  },
};
