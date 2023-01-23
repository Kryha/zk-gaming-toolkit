import { z } from "zod";

export const uuidSchema = z.string().uuid();
export type UUID = z.infer<typeof uuidSchema>;
