import { exec } from "child_process";
import { join } from "path";
import { promisify } from "util";

import { NODE_PATH } from "../../constants";
import {
  Dice,
  diceLeoSchema,
  diceSchema,
  Match,
  matchLeoSchema,
  matchSchema,
  MatchSummary,
  matchSummaryLeoSchema,
  matchSummarySchema,
  PowerUp,
  powerUpIdSchema,
  powerUpLeoSchema,
  PowerUpProbabilities,
  PowerUpProbability,
  powerUpSchema,
  Ranking,
  hashChainSchema,
  HashChainRecord,
  hashChainRecordLeoSchema,
  hashChainRecordSchema,
  randomNumberSchemaLeo,
  randomNumberSchema,
  RandomNumber,
  sumSchemaLeo,
  sumSchema,
  Sum,
} from "../../types";
import { decodeId } from "../../utils";

export const execute = promisify(exec);

export const contractsPath = join(NODE_PATH, "contracts");

const PRIVATE = ".private";
const PUBLIC = ".public";

const replaceValue = (value: string, searchValue = "") => value.replace(searchValue, "").replace(PRIVATE, "").replace(PUBLIC, "");

const address = (value: string): string => replaceValue(value);

const field = (value: string): bigint => {
  const parsed = BigInt(replaceValue(value, "field"));
  return parsed;
};

const fieldToString = (value: string): string => {
  const parsed = replaceValue(value, "field");
  return parsed;
};

const u8 = (value: string): number => {
  const parsed = Number(replaceValue(value, "u8"));
  if (isNaN(parsed)) throw new Error("u8 parsing failed");
  return parsed;
};

const u32 = (value: string): number => {
  const parsed = Number(replaceValue(value, "u32"));
  if (isNaN(parsed)) throw new Error("u32 parsing failed");
  return parsed;
};

const u64 = (value: string): number => {
  const parsed = Number(replaceValue(value, "u64"));
  if (isNaN(parsed)) throw new Error("u64 parsing failed");
  return parsed;
};

const parseCmdOutput = (cmdOutput: string): unknown => {
  const lines = cmdOutput.split("\n");

  let res: unknown = {};

  let objectStarted = false;
  let objectFinished = false;
  let done = false;
  let toParse = "";

  lines.forEach((line) => {
    if (done) return;

    if (objectStarted && objectFinished) {
      const correctJson = toParse.replace(/(['"])?([a-z0-9A-Z_.]+)(['"])?/g, '"$2" ');
      res = JSON.parse(correctJson);
      done = true;
    } else if (objectStarted) {
      if (line.startsWith("}")) {
        objectFinished = true;
      }
      const trimmedLine = line.trim();
      toParse = toParse + trimmedLine;
    } else if (line.includes("• {")) {
      toParse = toParse + "{";
      objectStarted = true;
    }
  });

  return res;
};

const match = (cmdOutput: string): Match => {
  const record = parseCmdOutput(cmdOutput);

  const parsed = matchLeoSchema.parse(record);
  const { settings, power_ups } = parsed;

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw new Error("Match parsing failed.");

  const powerUps: PowerUpProbabilities = Object.entries(power_ups).map(([k, prob]): PowerUpProbability => {
    const id = k.replace("pu_", "");
    const parsedId = powerUpIdSchema.parse(id);
    const parsedProb = parseInt(prob);

    if (isNaN(parsedProb)) throw new Error("Power-up probabilities parsing failed.");

    return { id: parsedId, probability: parsedProb };
  });

  const res: Match = {
    _nonce: replaceValue(parsed._nonce),
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    matchId: decodedId,
    settings: {
      players: u8(settings.player_amount),
      dicePerPlayer: u8(settings.dice_per_player),
      initialPowerUpAmount: u8(settings.initial_power_up_amount),
      maxPowerUpAmount: u8(settings.max_power_up_amount),
      healPowerUpAmount: u8(settings.heal_power_up_amount),
      stageNumberDivisor: u8(settings.stage_number_divisor),
      drawRoundOffset: u8(settings.draw_round_offset),
    },
    powerUps,
  };

  return matchSchema.parse(res);
};

const matchSummary = (cmdOutput: string): MatchSummary => {
  const record = parseCmdOutput(cmdOutput);

  const parsed = matchSummaryLeoSchema.parse(record);

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw new Error("Match summary parsing failed.");

  const tmpRanking: Ranking = ["", "", "", "", "", "", "", "", "", ""];

  Object.entries(parsed.ranking).forEach(([k, id]) => {
    if (!id) return;

    const standing = parseInt(k.replace("p_", "")) - 1;
    if (isNaN(standing)) throw new Error("Ranking parsing failed.");

    const parsedField = field(id);
    if (!parsedField) return;

    const playerId = decodeId(parsedField);
    if (!playerId) throw new Error("Ranking parsing failed.");

    tmpRanking[standing] = playerId;
  });

  const ranking = tmpRanking.filter((id) => id !== "");

  const res: MatchSummary = {
    _nonce: replaceValue(parsed._nonce),
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    matchId: decodedId,
    ranking,
  };

  return matchSummarySchema.parse(res);
};

const dice = (cmdOutput: string): Dice => {
  const record = parseCmdOutput(cmdOutput);

  const parsed = diceLeoSchema.parse(record);

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw new Error("Dice parsing failed.");

  const res: Dice = {
    _nonce: replaceValue(parsed._nonce),
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    matchId: decodedId,
    faceAmount: u8(parsed.face_amount),
    diceAmount: u32(parsed.dice_amount),
  };

  return diceSchema.parse(res);
};

const powerUp = (cmdOutput: string): PowerUp => {
  const record = parseCmdOutput(cmdOutput);

  const parsed = powerUpLeoSchema.parse(record);

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw new Error("Power-up parsing failed.");

  const res: PowerUp = {
    _nonce: replaceValue(parsed._nonce),
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    matchId: decodedId,
    powerUpId: powerUpIdSchema.parse(u8(parsed.power_up_id).toString()),
  };

  return powerUpSchema.parse(res);
};

export const randomNumber = (cmdOutput: string): RandomNumber => {
  const parsedOutput = parseCmdOutput(cmdOutput);
  const parsed = randomNumberSchemaLeo.parse(parsedOutput);

  const res: RandomNumber = {
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    randomNumber: u64(parsed.random_number),
  };

  return randomNumberSchema.parse(res);
};

const hashChainRecord = (cmdOutput: string): HashChainRecord => {
  const record = parseCmdOutput(cmdOutput);
  const parsed = hashChainRecordLeoSchema.parse(record);

  const hashChain = Object.values(parsed.hash_chain).map((hash: string) => fieldToString(hash));

  const res: HashChainRecord = {
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    seed: u64(parsed.seed),
    hashChain: hashChainSchema.parse(hashChain),
    _nonce: replaceValue(parsed._nonce),
  };

  return hashChainRecordSchema.parse(res);
};

export const sum = (cmdOutput: string): Sum => {
  const parsedOutput = parseCmdOutput(cmdOutput);
  const parsed = sumSchemaLeo.parse(parsedOutput);

  const res = {
    sum: u8(parsed.sum),
  };

  return sumSchema.parse(res);
};

export const parseOutput = { address, field, u8, u32, u64, match, matchSummary, dice, powerUp, hashChainRecord, randomNumber, sum };
