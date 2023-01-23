import { z } from "zod";

const leoStringSchema = (appendedValue: string) =>
  z
    .string()
    .endsWith(appendedValue)
    .or(z.string().endsWith(`${appendedValue}.private`))
    .or(z.string().endsWith(`${appendedValue}.public`));

export const leoAddressSchema = z
  .string()
  .startsWith("aleo1")
  .length(63)
  .or(z.string().startsWith("aleo1").endsWith(".private").length(71))
  .or(z.string().startsWith("aleo1").endsWith(".public").length(70));
export type LeoAddress = z.infer<typeof leoAddressSchema>;

export const leoFieldSchema = leoStringSchema("field");
export type LeoField = z.infer<typeof leoFieldSchema>;

export const leoU8Schema = leoStringSchema("u8");
export type LeoU8 = z.infer<typeof leoU8Schema>;

export const leoU32Schema = leoStringSchema("u32");
export type LeoU32 = z.infer<typeof leoU32Schema>;

export const leoU64Schema = leoStringSchema("u64");
export type LeoU64 = z.infer<typeof leoU64Schema>;

export const leoGroupSchema = leoStringSchema("group");
export type LeoGroup = z.infer<typeof leoGroupSchema>;
