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

export const diceDataSchema = z.object({
  dice_1: z.number(),
  dice_2: z.number(),
  dice_3: z.number(),
  dice_4: z.number(),
  dice_5: z.number(),
  dice_6: z.number(),
  dice_7: z.number(),
  dice_8: z.number(),
  dice_9: z.number(),
  dice_10: z.number(),
});
export type DiceData = z.infer<typeof diceDataSchema>;

export const diceDataLeoSchema = z.object({
  dice_1: leoU8Schema,
  dice_2: leoU8Schema,
  dice_3: leoU8Schema,
  dice_4: leoU8Schema,
  dice_5: leoU8Schema,
  dice_6: leoU8Schema,
  dice_7: leoU8Schema,
  dice_8: leoU8Schema,
  dice_9: leoU8Schema,
  dice_10: leoU8Schema,
});
export type DiceDataLeo = z.infer<typeof diceDataLeoSchema>;

export const sumSchemaLeo = z.object({
  sum: leoU8Schema,
});
export type SumLeo = z.infer<typeof sumSchemaLeo>;

export const sumSchema = z.object({
  sum: z.number(),
});
export type Sum = z.infer<typeof sumSchema>;
