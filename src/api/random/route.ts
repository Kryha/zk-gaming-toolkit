import { Router } from "express";
import asyncHandler from "express-async-handler";

import { validate } from "../middlewares";
import { randomController } from "./controller";
import { schemas } from "./schemas";

export const router = Router();

router.post("/generate", validate({ body: schemas.body.generate }), asyncHandler(randomController.generate));
