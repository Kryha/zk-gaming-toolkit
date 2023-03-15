import { z } from "zod";

import { leoAddressSchema, leoPrivateKeySchema, leoViewKeySchema } from "../../types";

export const schemas = {
  body: {
    generateNumber: z
      .object({
        privateKey: leoPrivateKeySchema,
        viewKey: leoViewKeySchema,
        owner: leoAddressSchema,
        seed: z.number(),
        min: z.number(),
        max: z.number(),
      })
      .refine((schema) => schema.min < schema.max, { message: "max has to be greater than min" }),
    generateHashChainRecord: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      owner: leoAddressSchema,
      seed: z.number(),
    }),
  },
};
