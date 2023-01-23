import { Router } from "express";
import asyncHandler from "express-async-handler";

import { validate } from "../middlewares";
import { boloneyController } from "./controller";
import { schemas } from "./schemas";

export const router = Router();

router.post("/create-match", validate({ body: schemas.body.createMatch }), asyncHandler(boloneyController.createMatch));

router.post(
  "/create-match-summary",
  validate({ body: schemas.body.createMatchSummary }),
  asyncHandler(boloneyController.createMatchSummary)
);
