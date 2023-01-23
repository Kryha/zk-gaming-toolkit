import { z } from "zod";

export const schemas = {
  body: {
    generate: z
      .object({
        min: z.number(),
        max: z.number(),
      })
      .refine((schema) => schema.min < schema.max, { message: "max has to be greater than min" }),
  },
};
