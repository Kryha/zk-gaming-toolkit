import { Router } from "express";
import asyncHandler from "express-async-handler";

import { keyGenController } from "./controller";

export const router = Router();

router.post("/generate", asyncHandler(keyGenController.generate));
