import { Router } from "express";

import { router as diceRouter } from "./dice/route";
import { router as accountRouter } from "./account/route";
import { router as powerupsRouter } from "./powerups/route";
import { router as randomRouter } from "./random/route";
import { router as boloneyRouter } from "./boloney/route";

import { handleError } from "./middlewares";

export const router = Router();

router.use("/dice", diceRouter);
router.use("/account", accountRouter);
router.use("/power-ups", powerupsRouter);
router.use("/random", randomRouter);
router.use("/boloney", boloneyRouter);

router.use(handleError);
