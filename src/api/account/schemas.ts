import { z } from "zod";

export const schemas = {
  body: {
    verify: z.object({
      message: z.string(),
      playerSign: z.string(),
      pubAddress: z.string(),
    }),
  },
};
