import { Router } from "express";
import asyncHandler from "express-async-handler";

import { accountController } from "./controller";

export const router = Router();

router.post("/create", asyncHandler(accountController.create));
