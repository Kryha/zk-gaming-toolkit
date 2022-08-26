import { ErrorRequestHandler } from "express";

import { logger } from "../../utils";

export const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);
  res.sendStatus(500);
};
