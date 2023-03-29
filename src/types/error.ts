import { z } from "zod";

export const httpErrorSchema = z.object({
  message: z.string(),
  status: z.number(),
});
export type HttpError = z.infer<typeof httpErrorSchema>;

export const errorSchema = z.object({
  message: z.string(),
  stack: z.string().optional(),
  name: z.string(),
});

export const apiErrorSchema = z.object({
  httpError: httpErrorSchema,
  error: errorSchema,
});
export type ApiError = z.infer<typeof apiErrorSchema>;
