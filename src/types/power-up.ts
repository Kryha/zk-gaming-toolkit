import { z } from "zod";

import { uuidSchema } from "./common";
import { leoAddressSchema, leoFieldSchema, leoGroupSchema, leoU64Schema, leoU8Schema } from "./leo";

export const powerUpProbabilitiesLeoSchema = z.object({
  pu_1: leoU8Schema,
  pu_2: leoU8Schema,
  pu_3: leoU8Schema,
  pu_4: leoU8Schema,
  pu_5: leoU8Schema,
  pu_6: leoU8Schema,
  pu_7: leoU8Schema,
  pu_8: leoU8Schema,
  pu_9: leoU8Schema,
});
export type PowerUpProbabilitiesLeo = z.infer<typeof powerUpProbabilitiesLeoSchema>;

export const powerUpIdSchema = z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
export type PowerUpId = z.infer<typeof powerUpIdSchema>;

export const powerUpProbabilitySchema = z.object({
  id: powerUpIdSchema,
  probability: z.number().min(0).max(100),
});
export type PowerUpProbability = z.infer<typeof powerUpProbabilitySchema>;

export const powerUpProbabilitiesSchema = z.array(powerUpProbabilitySchema).length(9);
export type PowerUpProbabilities = z.infer<typeof powerUpProbabilitiesSchema>;

export const powerUpLeoSchema = z.object({
  owner: leoAddressSchema,
  gates: leoU64Schema,
  match_id: leoFieldSchema,
  power_up_id: leoU8Schema,
  _nonce: leoGroupSchema,
});
export type PowerUpLeo = z.infer<typeof powerUpLeoSchema>;

export const powerUpSchema = z.object({
  owner: leoAddressSchema,
  gates: z.number(),
  matchId: uuidSchema,
  powerUpId: powerUpIdSchema,
  _nonce: leoGroupSchema,
});
export type PowerUp = z.infer<typeof powerUpSchema>;
