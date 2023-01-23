import { Router } from "express";
import asyncHandler from "express-async-handler";

import { validate } from "../middlewares";
import { diceController } from "./controller";
import { schemas } from "./schemas";

export const router = Router();

router.post("/create", validate({ body: schemas.body.create }), asyncHandler(diceController.create));

router.post("/burn", validate({ body: schemas.body.burn }), asyncHandler(diceController.burn));

router.post("/increment", validate({ body: schemas.body.increment }), asyncHandler(diceController.increment));

router.post("/decrement", validate({ body: schemas.body.decrement }), asyncHandler(diceController.decrement));
