import { Router } from "express";
import asyncHandler from "express-async-handler";

import { powerupsController } from "./controller";

export const router = Router();

// TODO: add validator
router.post("/use", asyncHandler(powerupsController.use));
