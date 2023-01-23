import { z } from "zod";

import { uuidSchema } from "./common";
import { leoAddressSchema, leoFieldSchema, leoGroupSchema, leoU64Schema, leoU8Schema } from "./leo";
import { powerUpProbabilitiesLeoSchema, powerUpProbabilitiesSchema } from "./power-up";

export const matchSettingsLeoSchema = z.object({
  player_amount: leoU8Schema,
  dice_per_player: leoU8Schema,
  initial_power_up_amount: leoU8Schema,
  max_power_up_amount: leoU8Schema,
  heal_power_up_amount: leoU8Schema,
  stage_number_divisor: leoU8Schema,
  draw_round_offset: leoU8Schema,
});
export type MatchSettingsLeo = z.infer<typeof matchSettingsLeoSchema>;

export const matchSettingsSchema = z.object({
  players: z.number().min(0),
  dicePerPlayer: z.number().min(0),
  initialPowerUpAmount: z.number().min(0),
  maxPowerUpAmount: z.number().min(0),
  healPowerUpAmount: z.number().min(0),
  stageNumberDivisor: z.number().min(0),
  drawRoundOffset: z.number().min(0),
});
export type MatchSettings = z.infer<typeof matchSettingsSchema>;

export const rankingLeoSchema = z.object({
  p_1: leoFieldSchema,
  p_2: leoFieldSchema,
  p_3: leoFieldSchema,
  p_4: leoFieldSchema,
  p_5: leoFieldSchema,
  p_6: leoFieldSchema,
  p_7: leoFieldSchema,
  p_8: leoFieldSchema,
  p_9: leoFieldSchema,
  p_10: leoFieldSchema,
});
export type RankingLeo = z.infer<typeof rankingLeoSchema>;

export const rankingSchema = z.array(uuidSchema).max(10);
export type Ranking = z.infer<typeof rankingSchema>;

export const matchSummarySchema = z.object({
  owner: leoAddressSchema,
  gates: z.number(),
  matchId: uuidSchema,
  ranking: rankingSchema,
  _nonce: leoGroupSchema,
});
export type MatchSummary = z.infer<typeof matchSummarySchema>;

export const matchSummaryLeoSchema = z.object({
  owner: leoAddressSchema,
  gates: leoU64Schema,
  match_id: leoFieldSchema,
  ranking: rankingLeoSchema,
  _nonce: leoGroupSchema,
});
export type MatchSummaryLeo = z.infer<typeof matchSettingsLeoSchema>;

export const matchSchema = z.object({
  owner: leoAddressSchema,
  gates: z.number(),
  matchId: uuidSchema,
  settings: matchSettingsSchema,
  powerUps: powerUpProbabilitiesSchema,
  _nonce: leoGroupSchema,
});
export type Match = z.infer<typeof matchSchema>;

export const matchLeoSchema = z.object({
  owner: leoAddressSchema,
  gates: leoU64Schema,
  match_id: leoFieldSchema,
  settings: matchSettingsLeoSchema,
  power_ups: powerUpProbabilitiesLeoSchema,
  _nonce: leoGroupSchema,
});
export type MatchLeo = z.infer<typeof matchLeoSchema>;
