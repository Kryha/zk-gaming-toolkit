import { z } from "zod";

import { uuidSchema } from "./common";
import { leoAddressSchema, leoFieldSchema, leoGroupSchema, leoU32Schema, leoU64Schema, leoU8Schema } from "./leo";

export const diceLeoSchema = z.object({
  owner: leoAddressSchema,
  gates: leoU64Schema,
  match_id: leoFieldSchema,
  face_amount: leoU8Schema,
  dice_amount: leoU32Schema,
  _nonce: leoGroupSchema,
});
export type DiceLeo = z.infer<typeof diceLeoSchema>;

export const diceSchema = z.object({
  owner: leoAddressSchema,
  gates: z.number(),
  matchId: uuidSchema,
  faceAmount: z.number().min(1),
  diceAmount: z.number().min(1),
  _nonce: leoGroupSchema,
});
export type Dice = z.infer<typeof diceSchema>;
