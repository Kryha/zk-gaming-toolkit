import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { env } from "../constants";
import { router } from "../api";
import { logger } from "../utils";

export const app = express();

export const initExpressApp = () => {
  app.set("port", env.PORT);

  app.use(helmet());

  app.use(
    express.json({
      limit: "100mb",
    })
  );
  app.use(
    express.urlencoded({
      extended: true,
      limit: "100mb",
    })
  );
  app.use(cookieParser());
  app.use(express.static(path.join(process.cwd(), "public")));

  morgan.token(
    "response-time-short",
    function getResponseTimeRounded(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this: any,
      req,
      res
    ) {
      const responseTime = this["response-time"](req, res);
      return `${Math.round(responseTime)}ms`;
    }
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  morgan.token("body", (req: any) => JSON.stringify(req.body));
  const httpLogger = morgan(":method :url :status :remote-addr :response-time-short :body", {
    stream: {
      write: (message: string): void => {
        logger.http(message.trim());
      },
    },
  });
  app.use(httpLogger);

  app.enable("trust proxy");

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: function (origin, callback) {
        const isOriginAllowed = origin && env.CORS_ORIGINS.includes(origin);

        if (!origin || env.NODE_ENV === "development" || isOriginAllowed) return callback(null, true);
        return callback(new Error(`Origin ${origin} is not allowed by CORS policy.`));
      },
      credentials: true,
    })
  );

  app.use(router);
};
