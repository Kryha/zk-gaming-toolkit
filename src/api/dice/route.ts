import { Router } from "express";
import asyncHandler from "express-async-handler";
import { validateRequest } from "zod-express-middleware";

import { diceController } from "./controller";
import { RollBody } from "./schemas";

export const router = Router();

router.post("/roll", validateRequest({ body: RollBody }), asyncHandler(diceController.roll));
