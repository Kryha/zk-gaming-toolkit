import { Router } from "express";

import { router as diceRouter } from "./dice/route";
import { router as accountRouter } from "./account/route";
import { router as powerupsRouter } from "./powerups/route";
import { router as proofGenRouter } from "./proof-gen/route";
import { router as randomRouter } from "./random/route";

import { handleError } from "./middlewares";

export const router = Router();

router.use("/dice", diceRouter);
router.use("/account", accountRouter);
router.use("/powerups", powerupsRouter);
router.use("/proof-gen", proofGenRouter);
router.use("/random", randomRouter);

router.use(handleError);
