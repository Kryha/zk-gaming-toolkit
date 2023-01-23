import { z } from "zod";

import { diceSchema, leoAddressSchema, uuidSchema } from "../../types";

export const schemas = {
  body: {
    create: z.object({
      owner: leoAddressSchema,
      matchId: uuidSchema,
      diceAmount: z.number().min(1),
    }),
    burn: z.object({
      dice: diceSchema,
    }),
    increment: z.object({
      dice: diceSchema,
    }),
    decrement: z.object({
      dice: diceSchema,
    }),
  },
};
