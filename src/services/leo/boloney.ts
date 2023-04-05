import { join } from "path";

import { programNames } from "../../constants";
import {
  LeoAddress,
  leoAddressSchema,
  LeoPrivateKey,
  LeoViewKey,
  Match,
  MatchSettings,
  MatchSummary,
  PowerUpProbabilities,
  Ranking,
  UUID,
} from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, parseOutput, zkRun } from "./util";

const matchPath = join(contractsPath, "boloney_match");
const summaryPath = join(contractsPath, "boloney_match_summary");

const createMatch = async (
  privateKey: LeoPrivateKey,
  viewKey: LeoViewKey,
  owner: LeoAddress,
  matchId: UUID,
  settings: MatchSettings,
  powerUps: PowerUpProbabilities
): Promise<Match> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const leoSettings = leoParse.matchSettings(settings);
  const leoPowerUps = leoParse.powerUpProbabilities(powerUps);

  const settingsParam = leoParse.stringifyLeoCmdParam(leoSettings);
  const powerUpsParam = leoParse.stringifyLeoCmdParam(leoPowerUps);

  const transition = "create_match";
  const params = [owner, matchIdParam, settingsParam, powerUpsParam];

  const record = await zkRun({ privateKey, viewKey, appName: programNames.BOLONEY_MATCH, contractPath: matchPath, transition, params });

  return parseOutput.match(record);
};

const createMatchSummary = async (
  privateKey: LeoPrivateKey,
  viewKey: LeoViewKey,
  owner: LeoAddress,
  matchId: UUID,
  ranking: Ranking
): Promise<MatchSummary> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const leoRanking = leoParse.ranking(ranking);

  const rankingParam = leoParse.stringifyLeoCmdParam(leoRanking);

  const transition = "create_match_summary";
  const params = [owner, matchIdParam, rankingParam];

  const record = await zkRun({
    privateKey,
    viewKey,
    appName: programNames.BOLONEY_MATCH_SUMMARY,
    contractPath: summaryPath,
    transition,
    params,
  });

  return parseOutput.matchSummary(record);
};

export const boloney = { createMatch, createMatchSummary };
