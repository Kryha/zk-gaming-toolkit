import { Router } from "express";
import asyncHandler from "express-async-handler";

import { accountController } from "./controller";

export const router = Router();

router.get("/create", asyncHandler(accountController.create));
