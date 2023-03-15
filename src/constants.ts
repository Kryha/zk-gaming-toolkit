import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().optional().default("development"),
  NODE_PATH: z.string(),
  PORT: z.string().optional().default("5001"),
  CORS_ORIGINS: z
    .string()
    .optional()
    .default("http://localhost:3000,http://localhost:3001")
    .transform((val) => val.split(",")),

  ZK_MODE: z.enum(["leo", "snarkos_display", "snarkos_broadcast"]).optional().default("leo"),

  BOLONEY_MATCH: z.string().optional().default("boloney_match"),
  BOLONEY_MATCH_SUMMARY: z.string().optional().default("boloney_match_summary"),
  DICE: z.string().optional().default("dice"),
  POWER_UP: z.string().optional().default("power_up"),
  RNG: z.string().optional().default("rng"),
  HASH_CHAIN: z.string().optional().default("hash_chain"),
});

export const env = envSchema.parse(process.env);

export const BASE_URL = `localhost:${env.PORT}`;

export const DELETE_PAYLOAD = { message: "deleted" };
