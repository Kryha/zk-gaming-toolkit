import { RequestHandler } from "express";
import { Signature, Address } from "../../aleo-sdk";

import { leo } from "../../services";

interface AccoutController {
  create: RequestHandler;
  verify: RequestHandler;
}

export const accountController: AccoutController = {
  create: async (_req, res) => {
    const newAccount = await leo.account.create();
    res.send(newAccount);
  },
  verify: async (req, res) => {
    const { message, playerSign, pubAddress } = req.body;

    const messageBuffer = new TextEncoder().encode(message);

    const signature = Signature.from_string(playerSign);
    const address = Address.from_string(pubAddress);

    const isVerryfied = signature.verify(address, messageBuffer);

    res.send({ verified: isVerryfied });
  },
};
