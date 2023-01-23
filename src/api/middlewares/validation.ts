import { RequestHandler } from "express";
import { ZodTypeAny } from "zod";

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
      res.status(400).send(error);
    }
  };
