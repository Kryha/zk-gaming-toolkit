import { z } from "zod";

import { diceSchema, leoAddressSchema, leoPrivateKeySchema, leoViewKeySchema, uuidSchema } from "../../types";

export const schemas = {
  body: {
    create: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      owner: leoAddressSchema,
      matchId: uuidSchema,
      diceAmount: z.number().min(1),
    }),
    burn: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      dice: diceSchema,
    }),
    increment: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      dice: diceSchema,
    }),
    decrement: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      dice: diceSchema,
    }),
  },
};
