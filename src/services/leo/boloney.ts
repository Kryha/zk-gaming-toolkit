import { join } from "path";

import { LeoAddress, leoAddressSchema, Match, MatchSettings, MatchSummary, PowerUpProbabilities, Ranking, UUID } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, execute, parseOutput } from "./util";

const matchPath = join(contractsPath, "boloney_match");
const summaryPath = join(contractsPath, "boloney_match_summary");

const createMatch = async (owner: LeoAddress, matchId: UUID, settings: MatchSettings, powerUps: PowerUpProbabilities): Promise<Match> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const leoSettings = leoParse.matchSettings(settings);
  const leoPowerUps = leoParse.powerUpProbabilities(powerUps);

  const settingsParam = leoParse.stringifyLeoCmdParam(leoSettings);
  const powerUpsParam = leoParse.stringifyLeoCmdParam(leoPowerUps);

  const cmd = `cd ${matchPath} && leo run create_match ${owner} ${matchIdParam} ${settingsParam} ${powerUpsParam}`;

  const { stdout } = await execute(cmd);

  return parseOutput.match(stdout);
};

const createMatchSummary = async (owner: LeoAddress, matchId: UUID, ranking: Ranking): Promise<MatchSummary> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const leoRanking = leoParse.ranking(ranking);

  const rankingParam = leoParse.stringifyLeoCmdParam(leoRanking);

  const cmd = `cd ${summaryPath} && leo run create_match_summary ${owner} ${matchIdParam} ${rankingParam}`;

  const { stdout } = await execute(cmd);

  return parseOutput.matchSummary(stdout);
};

export const boloney = { createMatch, createMatchSummary };
