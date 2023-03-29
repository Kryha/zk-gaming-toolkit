import { ErrorRequestHandler } from "express";
import { apiErrorSchema, StatusCodes } from "../../types";

import { logger } from "../../utils";

export const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
  const parsed = apiErrorSchema.safeParse(err);

  if (parsed.success) {
    logger.error("API error", parsed.data.error);
    res.status(parsed.data.httpError.status).send(parsed.data.httpError.message);
  } else {
    logger.error("Unknown error", err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
