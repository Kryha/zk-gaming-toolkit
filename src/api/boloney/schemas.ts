import { z } from "zod";

import { leoAddressSchema, matchSettingsSchema, powerUpProbabilitiesSchema, rankingSchema, uuidSchema } from "../../types";

export const schemas = {
  body: {
    createMatch: z.object({
      owner: leoAddressSchema,
      matchId: uuidSchema,
      settings: matchSettingsSchema,
      powerUps: powerUpProbabilitiesSchema,
    }),
    createMatchSummary: z.object({
      owner: leoAddressSchema,
      matchId: uuidSchema,
      ranking: rankingSchema,
    }),
  },
};
