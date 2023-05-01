import { HASH_CHAIN_LENGTH, HASH_MAX_RANGE } from "../constants";
import { HashChain } from "../types";
import { getNumericHash, randomInt, range } from "../utils";

export const generate = (seed?: number): { seed: number; hashChain: HashChain } => {
  const generatedSeed = seed ?? randomInt(1, HASH_MAX_RANGE);

  let latestHash = String(generatedSeed);
  const hashChain = range(HASH_CHAIN_LENGTH - 1).map(() => {
    latestHash = String(getNumericHash(String(latestHash)));
    return latestHash;
  });

  return { hashChain, seed: generatedSeed };
};

export const hashChain = { generate };
