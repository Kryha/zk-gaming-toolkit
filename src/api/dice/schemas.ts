import { z } from "zod";

export const RollBody = z.object({
  diceAmount: z.number().min(1).max(5),
});
