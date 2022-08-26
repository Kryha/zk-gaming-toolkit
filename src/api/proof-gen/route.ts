import { Router } from "express";
import asyncHandler from "express-async-handler";

import { proofGenController } from "./controller";

export const router = Router();

// TODO: add validator
router.post("/generate", asyncHandler(proofGenController.generate));
