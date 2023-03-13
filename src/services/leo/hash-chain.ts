import { join } from "path";

import { HashChainRecord, LeoAddress, leoAddressSchema } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, execute, parseOutput } from "./util";

const contractPath = join(contractsPath, "hash_chain");

const getHashChainRecord = async (owner: LeoAddress, seed: number): Promise<HashChainRecord> => {
  leoAddressSchema.parse(owner); // Validate owner address

  const initialSeed = leoParse.u64(seed);

  const cmd = `cd ${contractPath} && leo run create_hash_chain_record ${owner} ${initialSeed}`;
  const { stdout } = await execute(cmd);

  return parseOutput.hashChainRecord(stdout);
};

export const hashChain = { getHashChainRecord };
