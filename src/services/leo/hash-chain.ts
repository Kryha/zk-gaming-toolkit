import { join } from "path";

import { programNames } from "../../constants";
import { HashChainRecord, LeoAddress, leoAddressSchema, LeoPrivateKey, LeoViewKey } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, parseOutput, zkRun } from "./util";

const contractPath = join(contractsPath, "hash_chain");

const appName = programNames.HASH_CHAIN;

const getHashChainRecord = async (
  privateKey: LeoPrivateKey,
  viewKey: LeoViewKey,
  owner: LeoAddress,
  seed: number
): Promise<HashChainRecord> => {
  leoAddressSchema.parse(owner); // Validate owner address

  const initialSeed = leoParse.u64(seed);

  const transition = "create_hash_chain_record";
  const params = [owner, initialSeed];

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params });

  return parseOutput.hashChainRecord(record);
};

export const hashChain = { getHashChainRecord };
