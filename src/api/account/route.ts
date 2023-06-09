import { Router } from "express";
import asyncHandler from "express-async-handler";

import { schemas } from "./schemas";
import { validate } from "../middlewares";
import { accountController } from "./controller";

export const router = Router();

router.post("/create", asyncHandler(accountController.create));
router.post("/verify", validate({ body: schemas.body.verify }), asyncHandler(accountController.verify));
