import { RequestHandler } from "express";

import { account } from "../../library";

interface AccoutController {
  create: RequestHandler;
}

export const accountController: AccoutController = {
  create: async (_req, res) => {
    const newAccount = await account.create();
    res.send(newAccount);
  },
};
