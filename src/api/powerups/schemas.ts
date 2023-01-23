import { z } from "zod";

import { leoAddressSchema, powerUpIdSchema, powerUpSchema, uuidSchema } from "../../types";

export const schemas = {
  body: {
    create: z.object({
      owner: leoAddressSchema,
      matchId: uuidSchema,
      powerUpId: powerUpIdSchema,
    }),
    burn: z.object({
      powerUp: powerUpSchema,
    }),
    transfer: z.object({
      receiver: leoAddressSchema,
      powerUp: powerUpSchema,
    }),
  },
};
