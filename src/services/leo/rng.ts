import { join } from "path";

import { programNames } from "../../constants";
import { LeoAddress, RandomNumber, LeoPrivateKey, LeoViewKey } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, parseOutput, zkRun } from "./util";

const contractPath = join(contractsPath, "rng");

const appName = programNames.RNG;

const getRandomNumber = async (
  privateKey: LeoPrivateKey,
  viewKey: LeoViewKey,
  owner: LeoAddress,
  seed: number,
  min: number,
  max: number
): Promise<RandomNumber> => {
  const initialSeed = leoParse.u64(seed);
  const minAmount = leoParse.u64(min);
  const maxAmount = leoParse.u64(max);

  const transition = "get_random_number";
  const params = [owner, initialSeed, minAmount, maxAmount];

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params });

  return parseOutput.randomNumber(record);
};

export const rng = { getRandomNumber };
