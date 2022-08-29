import { z } from "zod";

export const GenerateBody = z.object({
  min: z.number().positive(),
  max: z.number().positive(),
});
