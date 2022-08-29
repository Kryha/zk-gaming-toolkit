import { Router } from "express";
import asyncHandler from "express-async-handler";
import { validateRequest } from "zod-express-middleware";

import { randomController } from "./controller";
import { GenerateBody } from "./schemas";

export const router = Router();

// TODO: add validator
router.post("/generate", validateRequest({ body: GenerateBody }), asyncHandler(randomController.generate));
