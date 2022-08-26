import { Router } from "express";
import asyncHandler from "express-async-handler";

import { keyGenController } from "./controller";

export const router = Router();

// TODO: add validator
router.post("/generate", asyncHandler(keyGenController.generate));
