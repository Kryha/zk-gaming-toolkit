import { z } from "zod";

import { HASH_CHAIN_LENGTH } from "../constants";
import { leoAddressSchema, leoFieldSchema, leoU64Schema, leoGroupSchema } from "./leo";

export const randomNumberSchemaLeo = z.object({
  owner: leoAddressSchema,
  gates: leoU64Schema,
  random_number: leoU64Schema,
});
export type randomNumberLeo = z.infer<typeof randomNumberSchemaLeo>;

export const randomNumberSchema = z.object({
  owner: leoAddressSchema,
  gates: z.number(),
  randomNumber: z.number(),
});
export type RandomNumber = z.infer<typeof randomNumberSchema>;

const hashChainLeoSchema = z.object({
  hash_1: leoFieldSchema,
  hash_2: leoFieldSchema,
  hash_3: leoFieldSchema,
  hash_4: leoFieldSchema,
  hash_5: leoFieldSchema,
  hash_6: leoFieldSchema,
  hash_7: leoFieldSchema,
  hash_8: leoFieldSchema,
  hash_9: leoFieldSchema,
  hash_10: leoFieldSchema,
  hash_11: leoFieldSchema,
  hash_12: leoFieldSchema,
  hash_13: leoFieldSchema,
  hash_14: leoFieldSchema,
  hash_15: leoFieldSchema,
  hash_16: leoFieldSchema,
  hash_17: leoFieldSchema,
  hash_18: leoFieldSchema,
  hash_19: leoFieldSchema,
  hash_20: leoFieldSchema,
  hash_21: leoFieldSchema,
  hash_22: leoFieldSchema,
  hash_23: leoFieldSchema,
  hash_24: leoFieldSchema,
  hash_25: leoFieldSchema,
  hash_26: leoFieldSchema,
  hash_27: leoFieldSchema,
  hash_28: leoFieldSchema,
  hash_29: leoFieldSchema,
  hash_30: leoFieldSchema,
  hash_31: leoFieldSchema,
  hash_32: leoFieldSchema,
});
export type HashChainLeo = z.infer<typeof hashChainLeoSchema>;

export const hashChainRecordLeoSchema = z.object({
  owner: leoAddressSchema,
  gates: leoU64Schema,
  seed: leoU64Schema,
  hash_chain: hashChainLeoSchema,
  _nonce: leoGroupSchema,
});
export type HashChainRecordLeo = z.infer<typeof hashChainRecordLeoSchema>;

export const hashChainSchema = z.array(z.string()).length(HASH_CHAIN_LENGTH);
export type HashChain = z.infer<typeof hashChainSchema>;

export const hashChainRecordSchema = z.object({
  owner: leoAddressSchema,
  gates: z.number(),
  seed: z.number(),
  hashChain: hashChainSchema,
  _nonce: leoGroupSchema,
});
export type HashChainRecord = z.infer<typeof hashChainRecordSchema>;
