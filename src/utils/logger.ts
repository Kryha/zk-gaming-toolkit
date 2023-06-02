import { createLogger, format, transports } from "winston";
import { z } from "zod";

import { env } from "../constants";

const logLevel = env.NODE_ENV === "production" ? "http" : "debug";

const SENSITIVE_PROPS = [/"aleo1[^"]*/g, /aleo1[^ ]*/g, /aleo1[^$]*/g, /"APrivateKey1[^"]*/g, /"AViewKey1[^"]*/g];

export const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      const parsedMessage = z.string().safeParse(message);

      if (!parsedMessage.success) return "";

      let replacedMessage = parsedMessage.data;
      SENSITIVE_PROPS.forEach((prop) => {
        replacedMessage = replacedMessage.replaceAll(prop, '"***"');
      });
      return `${timestamp} ${level.slice(0, 7).padEnd(7, " ")} - ${replacedMessage}`;
    })
  ),
  transports: [new transports.Console()],
});
