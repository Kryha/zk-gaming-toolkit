import { z } from "zod";
import { leoAddressSchema } from "../../types";

export const schemas = {
  body: {
    generateNumber: z
      .object({
        seed: z.number(),
        min: z.number(),
        max: z.number(),
      })
      .refine((schema) => schema.min < schema.max, { message: "max has to be greater than min" }),
    generateHashChainRecord: z.object({
      owner: leoAddressSchema,
      seed: z.number(),
    }),
  },
};
