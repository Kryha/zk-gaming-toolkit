import { RequestHandler } from "express";

import { leo } from "../../services";

interface BoloneyController {
  createMatch: RequestHandler;
  createMatchSummary: RequestHandler;
}

export const boloneyController: BoloneyController = {
  createMatch: async (req, res) => {
    const { owner, matchId, settings, powerUps } = req.body;
    const match = await leo.boloney.createMatch(owner, matchId, settings, powerUps);
    res.send({ match });
  },
  createMatchSummary: async (req, res) => {
    const { owner, matchId, ranking } = req.body;
    const matchSummary = await leo.boloney.createMatchSummary(owner, matchId, ranking);
    res.send({ matchSummary });
  },
};
