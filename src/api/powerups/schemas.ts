import { z } from "zod";

import {
  diceDataSchema,
  leoAddressSchema,
  leoPrivateKeySchema,
  leoViewKeySchema,
  powerUpIdSchema,
  powerUpSchema,
  uuidSchema,
} from "../../types";

export const schemas = {
  body: {
    create: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      owner: leoAddressSchema,
      matchId: uuidSchema,
      powerUpId: powerUpIdSchema,
    }),
    burn: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      powerUp: powerUpSchema,
    }),
    transfer: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      receiver: leoAddressSchema,
      powerUp: powerUpSchema,
    }),
    useBirdsEye: z.object({
      privateKey: leoPrivateKeySchema,
      viewKey: leoViewKeySchema,
      powerUp: powerUpSchema,
      diceData: diceDataSchema,
    }),
  },
};
