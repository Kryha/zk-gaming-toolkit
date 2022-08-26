import { Router } from "express";
import asyncHandler from "express-async-handler";

import { randomController } from "./controller";

export const router = Router();

// TODO: add validator
router.post("/generate", asyncHandler(randomController.generate));
