import { RequestHandler } from "express";

import { DELETE_PAYLOAD } from "../../constants";
import { leo } from "../../services";

interface PowerUpsController {
  create: RequestHandler;
  burn: RequestHandler;
  transfer: RequestHandler;
}

export const powerUpsController: PowerUpsController = {
  create: async (req, res) => {
    const { owner, matchId, powerUpId } = req.body;
    const powerUp = await leo.powerUp.createPowerUp(owner, matchId, powerUpId);
    res.send({ powerUp });
  },
  burn: async (req, res) => {
    const { powerUp } = req.body;
    await leo.powerUp.burnPowerUp(powerUp);
    res.send(DELETE_PAYLOAD);
  },
  transfer: async (req, res) => {
    const { receiver, powerUp } = req.body;
    const updatedPowerUp = await leo.powerUp.transferPowerUp(receiver, powerUp);
    res.send({ powerUp: updatedPowerUp });
  },
};
