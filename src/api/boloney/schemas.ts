import { z } from "zod";

import {
  leoAddressSchema,
  leoPrivateKeySchema,
  leoViewKeySchema,
  matchSettingsSchema,
  powerUpProbabilitiesSchema,
  rankingSchema,
  uuidSchema,
} from "../../types";

export const schemas = {
  body: {
    createMatch: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      owner: leoAddressSchema,
      matchId: uuidSchema,
      settings: matchSettingsSchema,
      powerUps: powerUpProbabilitiesSchema,
    }),
    createMatchSummary: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      owner: leoAddressSchema,
      matchId: uuidSchema,
      ranking: rankingSchema,
    }),
  },
};
