import { RequestHandler } from "express";

import { DELETE_PAYLOAD } from "../../constants";
import { leo } from "../../services";

interface PowerUpsController {
  create: RequestHandler;
  burn: RequestHandler;
  transfer: RequestHandler;
  useBirdsEye: RequestHandler;
}

export const powerUpsController: PowerUpsController = {
  create: async (req, res) => {
    const { owner, matchId, powerUpId, privateKey, viewKey } = req.body;
    const powerUp = await leo.powerUp.createPowerUp(privateKey, viewKey, owner, matchId, powerUpId);
    res.send({ powerUp });
  },
  burn: async (req, res) => {
    const { powerUp, privateKey, viewKey } = req.body;
    await leo.powerUp.burnPowerUp(privateKey, viewKey, powerUp);
    res.send(DELETE_PAYLOAD);
  },
  transfer: async (req, res) => {
    const { receiver, powerUp, privateKey, viewKey } = req.body;
    const updatedPowerUp = await leo.powerUp.transferPowerUp(privateKey, viewKey, receiver, powerUp);
    res.send({ powerUp: updatedPowerUp });
  },
  useBirdsEye: async (req, res) => {
    const { powerUp, diceData, privateKey, viewKey } = req.body;
    const value = await leo.powerUp.useBirdsEye(privateKey, viewKey, powerUp, diceData);
    res.send(value);
  },
};
