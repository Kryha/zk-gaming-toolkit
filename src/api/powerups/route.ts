import { Router } from "express";
import asyncHandler from "express-async-handler";

import { validate } from "../middlewares";
import { powerUpsController } from "./controller";
import { schemas } from "./schemas";

export const router = Router();

router.post("/create", validate({ body: schemas.body.create }), asyncHandler(powerUpsController.create));

router.post("/burn", validate({ body: schemas.body.burn }), asyncHandler(powerUpsController.burn));

router.post("/transfer", validate({ body: schemas.body.transfer }), asyncHandler(powerUpsController.transfer));

// TODO: this route does not work currently since it's returning a struct instead of a record
// TODO make dinamic value for picking up PowerUp Ids
router.post("/2", validate({ body: schemas.body.useBirdsEye }), asyncHandler(powerUpsController.useBirdsEye));
