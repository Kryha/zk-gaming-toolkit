import { Router } from "express";
import asyncHandler from "express-async-handler";

import { diceController } from "./controller";

export const router = Router();

// TODO: add validator
router.post("/roll", asyncHandler(diceController.roll));
