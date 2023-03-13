import { Router } from "express";
import asyncHandler from "express-async-handler";

import { validate } from "../middlewares";
import { randomController } from "./controller";
import { schemas } from "./schemas";

export const router = Router();

// TODO: Consider separating these into two different routers
router.post("/number", validate({ body: schemas.body.generateNumber }), asyncHandler(randomController.generateNumber));
router.post(
  "/hash-chain-record",
  validate({ body: schemas.body.generateHashChainRecord }),
  asyncHandler(randomController.generateHashChainRecord)
);
