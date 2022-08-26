import { Router } from "express";

export const router = Router();

router.get("/", (_, res) => {
  res.send({ msg: "Hello World!" });
});

// TODO: add routes
// TODO: add error handler
