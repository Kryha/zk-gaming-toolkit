import { RequestHandler } from "express";

import { powerups } from "../../library";

interface PowerupsController {
  use: RequestHandler;
}

export const powerupsController: PowerupsController = {
  use: async (_req, res) => {
    const value = await powerups.use();
    res.send({ value });
  },
};
