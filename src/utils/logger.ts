import { createLogger, format, transports } from "winston";

import { env } from "../constants";

const logLevel = env.NODE_ENV === "production" ? "http" : "debug";

export const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level.slice(0, 7).padEnd(7, " ")} - ${message}`;
    })
  ),
  transports: [new transports.Console()],
});
