import "source-map-support/register";

import { createServer } from "http";

import { NODE_ENV, PORT } from "./constants";
import { app, initExpressApp } from "./services";
import { aleoExec, logger } from "./utils";

const server = createServer(app);

const shutdown = () => {
  logger.info(`🛑 Stopping server [${NODE_ENV}] . . .`);

  server.close((error) => {
    if (error) return logger.warn("🧨 Failed closing HTTP service:", error);

    logger.info("👋 Stopped server");
    process.exit(0);
  });
};

const startup = async (): Promise<void> => {
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  logger.info("🔨 Building Aleo program...");
  await aleoExec.build();
  logger.info("🏰 Aleo program successfully built!");

  logger.info("🪄  Initialising Express App...");
  initExpressApp();

  server.listen(PORT, () => {
    logger.info(`🎧 HTTP service listening on port ${PORT}`);
  });
};

startup();
