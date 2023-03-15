import { RequestHandler } from "express";

import { leo } from "../../services";

interface AccoutController {
  create: RequestHandler;
}

export const accountController: AccoutController = {
  create: async (_req, res) => {
    const newAccount = await leo.account.create();
    res.send(newAccount);
  },
};
