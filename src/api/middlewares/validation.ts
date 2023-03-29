import { RequestHandler } from "express";
import { ZodTypeAny } from "zod";
import { StatusCodes } from "../../types";
import { logger } from "../../utils";

interface ValidateSchemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

export const validate =
  (schemas: ValidateSchemas): RequestHandler =>
  async (req, res, next) => {
    try {
      const promises = [schemas.body?.parseAsync(req.body), schemas.query?.parseAsync(req.query), schemas.params?.parseAsync(req.params)];
      await Promise.all(promises);
      next();
    } catch (error) {
      logger.error("Validation error:", error);
      const payload = {
        message: error,
        code: StatusCodes.BAD_REQUEST,
      };
      res.status(StatusCodes.BAD_REQUEST).send(payload);
    }
  };
