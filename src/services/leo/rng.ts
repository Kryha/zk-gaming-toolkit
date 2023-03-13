import { join } from "path";

import { LeoAddress, RandomNumber } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, execute, parseOutput } from "./util";

const rngPath = join(contractsPath, "rng");

const getRandomNumber = async (owner: LeoAddress, seed: number, min: number, max: number): Promise<RandomNumber> => {
  const initialSeed = leoParse.u64(seed);
  const minAmount = leoParse.u64(min);
  const maxAmount = leoParse.u64(max);

  const cmd = `cd ${rngPath} && leo run get_random_number ${owner} ${initialSeed} ${minAmount} ${maxAmount}`;
  const { stdout } = await execute(cmd);

  return parseOutput.randomNumber(stdout);
};

export const rng = { getRandomNumber };
