import { Router } from "express";
import asyncHandler from "express-async-handler";

import { powerupsController } from "./controller";

export const router = Router();

router.post("/use", asyncHandler(powerupsController.use));
