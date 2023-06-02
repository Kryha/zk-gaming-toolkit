import { exec } from "child_process";
import { readFile } from "fs/promises";
import { join } from "path";
import { promisify } from "util";

import { Address, DevelopmentClient, PrivateKey, ViewKey } from "../../aleo-sdk";
import { env, FEE, LOCAL_NETWORK_PRIVATE_KEY, programNames } from "../../constants";
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
  LeoTx,
  leoTxSchema,
  LeoRecord,
  LeoViewKey,
} from "../../types";
import { apiError, attemptFetch, decodeId, logger, wait } from "../../utils";

const developmentClient = new DevelopmentClient(env.DEVELOPMENT_SERVER_URL);

export const execute = promisify(exec);

export const contractsPath = join(env.NODE_PATH, "contracts");

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

export const u8 = (value: string): number => {
  const parsed = Number(replaceValue(value, "u8"));
  if (isNaN(parsed)) throw apiError("u8 parsing failed");
  return parsed;
};

const u32 = (value: string): number => {
  const parsed = Number(replaceValue(value, "u32"));
  if (isNaN(parsed)) throw apiError("u32 parsing failed");
  return parsed;
};

const u64 = (value: string): number => {
  const parsed = Number(replaceValue(value, "u64"));
  if (isNaN(parsed)) throw apiError("u64 parsing failed");
  return parsed;
};

const parseRecordString = (recordString: string): Record<string, unknown> => {
  const correctJson = recordString.replace(/(['"])?([a-z0-9A-Z_.]+)(['"])?/g, '"$2" ');
  return JSON.parse(correctJson);
};

const parseCmdOutput = (cmdOutput: string): Record<string, unknown> => {
  const lines = cmdOutput.split("\n");

  let res: Record<string, unknown> = {};

  let objectStarted = false;
  let objectFinished = false;
  let done = false;
  let toParse = "";

  lines.forEach((line) => {
    if (done) return;

    if (objectStarted && objectFinished) {
      res = parseRecordString(toParse);
      done = true;
    } else if (objectStarted) {
      if (line.startsWith("}")) {
        objectFinished = true;
      }
      const trimmedLine = line.trim();
      toParse = toParse + trimmedLine;
    } else if (line.includes("• {") || line.startsWith("{")) {
      toParse = toParse + "{";
      objectStarted = true;
    }
  });

  return res;
};

const getTxResult = (tx: LeoTx): string | undefined => {
  return tx.execution.transitions.at(0)?.outputs.at(0)?.value;
};

const match = (record: Record<string, unknown>): Match => {
  const parsed = matchLeoSchema.parse(record);
  const { settings, power_ups } = parsed;

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw apiError("Match parsing failed.");

  const powerUps: PowerUpProbabilities = Object.entries(power_ups).map(([k, prob]): PowerUpProbability => {
    const id = k.replace("pu_", "");
    const parsedId = powerUpIdSchema.parse(id);
    const parsedProb = parseInt(prob);

    if (isNaN(parsedProb)) throw apiError("Power-up probabilities parsing failed.");

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

const matchSummary = (record: Record<string, unknown>): MatchSummary => {
  const parsed = matchSummaryLeoSchema.parse(record);

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw apiError("Match summary parsing failed.");

  const tmpRanking: Ranking = ["", "", "", "", "", "", "", "", "", ""];

  Object.entries(parsed.ranking).forEach(([k, id]) => {
    if (!id) return;

    const standing = parseInt(k.replace("p_", "")) - 1;
    if (isNaN(standing)) throw apiError("Ranking parsing failed.");

    const parsedField = field(id);
    if (!parsedField) return;

    const playerId = decodeId(parsedField);
    if (!playerId) throw apiError("Ranking parsing failed.");

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

const dice = (record: Record<string, unknown>): Dice => {
  const parsed = diceLeoSchema.parse(record);

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw apiError("Dice parsing failed.");

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

const powerUp = (record: Record<string, unknown>): PowerUp => {
  const parsed = powerUpLeoSchema.parse(record);

  const decodedId = decodeId(field(parsed.match_id));
  if (!decodedId) throw apiError("Power-up parsing failed.");

  const res: PowerUp = {
    _nonce: replaceValue(parsed._nonce),
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    matchId: decodedId,
    powerUpId: powerUpIdSchema.parse(u8(parsed.power_up_id).toString()),
  };

  return powerUpSchema.parse(res);
};

export const randomNumber = (record: Record<string, unknown>): RandomNumber => {
  const parsed = randomNumberSchemaLeo.parse(record);

  const res: RandomNumber = {
    owner: address(parsed.owner),
    gates: u64(parsed.gates),
    randomNumber: u64(parsed.random_number),
  };

  return randomNumberSchema.parse(res);
};

const hashChainRecord = (record: Record<string, unknown>): HashChainRecord => {
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

const sum = (record: Record<string, unknown>): Sum => {
  const parsed = sumSchemaLeo.parse(record);

  const res = {
    sum: u8(parsed.sum),
  };

  return sumSchema.parse(res);
};

export const parseOutput = { address, field, u8, u32, u64, match, matchSummary, dice, powerUp, hashChainRecord, randomNumber, sum };

const decryptRecord = async (encryptedRecord: LeoRecord, viewKey: LeoViewKey): Promise<Record<string, unknown>> => {
  const decrypted = ViewKey.from_string(viewKey).decrypt(encryptedRecord);
  return parseRecordString(decrypted);
};

interface LeoRunParams {
  contractPath: string;
  params?: string[];
  transition?: string;
}

const leoRun = async ({ contractPath, params = [], transition = "main" }: LeoRunParams): Promise<Record<string, unknown>> => {
  const stringedParams = params.join(" ");
  const cmd = `cd ${contractPath} && leo run ${transition} ${stringedParams}`;

  const { stdout } = await execute(cmd);
  const parsed = parseCmdOutput(stdout);

  return parsed;
};

interface SnarkOsExecuteParams {
  privateKey: string;
  viewKey: string;
  appName: string;
  params?: string[];
  transition?: string;
  fee: number;
}

const snarkOsExecute = async ({
  privateKey,
  viewKey,
  appName,
  params = [],
  transition = "main",
  fee,
}: SnarkOsExecuteParams): Promise<Record<string, unknown>> => {
  // when running locally, transfer some credits to the account in order to facilitate the developer experience
  if (env.ZK_MODE === "testnet_local") {
    await transferCredits(FEE + 6, Address.from_private_key(PrivateKey.from_string(privateKey)).to_string());
    await wait();
  }

  let txId = "";
  let attemptsLeft = 5;
  let executed = false;

  while (!executed && attemptsLeft > 0) {
    try {
      txId = (await developmentClient.executeProgram(`${appName}.aleo`, transition, fee, params, privateKey)).replaceAll('"', "");
      executed = true;
    } catch (error) {
      attemptsLeft--;
      if (attemptsLeft === 0) {
        throw error;
      }
    }
  }

  const baseRoute = env.ZK_MODE === "testnet_public" ? "https://vm.aleo.org/api" : "http://127.0.0.1:3030";
  const url = `${baseRoute}/testnet3/transaction/${txId}`;
  const res = await attemptFetch(url);

  const tx: Record<string, unknown> = res.data;
  const parsedTx = leoTxSchema.parse(tx);
  const result = getTxResult(parsedTx);

  // I know a ternary would be cool, but it creates some weird concurrency issues sometimes
  let parsed = {};
  if (result) {
    parsed = await decryptRecord(result, viewKey);
  }

  return parsed;
};

type ExecuteZkLogicParams = LeoRunParams & SnarkOsExecuteParams;

export const zkRun = (params: ExecuteZkLogicParams): Promise<Record<string, unknown>> => {
  if (env.ZK_MODE === "leo") {
    return leoRun(params);
  } else {
    return snarkOsExecute(params);
  }
};

/**
 * Deploys programs to the public or local Aleo testnet, using the Aleo TS SDK.
 * Before calling this function, make sure to execute "build_local_programs.sh" from the root directory
 * and make sure your account holds at least the required fee amount (56 credits).
 */
export const deployPrograms = async () => {
  const privateKey = env.DEPLOY_PRIVATE_KEY;
  if (!privateKey) return;

  const fees = {
    boloney_match: 5,
    boloney_match_summary: 5,
    dice: 16,
    hash_chain: 5,
    power_up: 15,
    power_up_2a: 5,
    rng: 5,
  };

  const successfulPrograms: string[] = [];

  for (const programName of Object.values(programNames)) {
    logger.info(`Deploying ${programName}`);

    const path = join(contractsPath, programName, "build", "main.aleo");

    const program = await readFile(path, "utf-8");

    let attemptsLeft = 5;
    let deployed = false;

    while (!deployed && attemptsLeft > 0) {
      try {
        await developmentClient.deployProgram(program, fees[programName as keyof typeof fees], privateKey);
        logger.info(`Successfully deployed ${programName}`);
        successfulPrograms.push(programName);
        deployed = true;
      } catch (error) {
        attemptsLeft--;
        if (attemptsLeft === 0) {
          logger.info(`${programName} deployment failed. Check the dev server logs to see if it was already deployed.`);
        }
      }
    }
  }

  logger.info(`Successfully deployed programs: ${successfulPrograms.toString()}`);
};

/**
 * Transfer credits from the account identified by the private key to the account specified as recipient.
 * ! use this function only when the app is connected to a local node
 * @param amount - amount of credits to transfer to the recipient
 * @param recipient - address of the receiver account
 * @param privateKey - private key of the sender account, defaults to the private key of the local chain owner
 * @returns
 */
const transferCredits = async (amount: number, recipient: string, privateKey = LOCAL_NETWORK_PRIVATE_KEY) => {
  let attemptsLeft = 5;
  let transferred = false;

  while (!transferred && attemptsLeft > 0) {
    try {
      await developmentClient.transfer(amount, FEE, recipient, privateKey);
      logger.info(`Successfully transferred ${amount} credits to ${recipient}`);
      transferred = true;
    } catch (error) {
      attemptsLeft--;
      if (attemptsLeft === 0) {
        logger.info(`Transfer of ${amount} credits to ${recipient} failed.`);
      }
    }
  }
};
