import "source-map-support/register";

import { createServer } from "http";

import { env, programNames } from "./constants";
import { app, initExpressApp, deployPrograms } from "./services";
import { logger } from "./utils";

const server = createServer(app);

const shutdown = () => {
  logger.info(`🛑 Stopping server [${env.NODE_ENV}] . . .`);

  server.close((error) => {
    if (error) return logger.warn("🧨 Failed closing HTTP service:", error);

    logger.info("👋 Stopped server");
    process.exit(0);
  });
};

const startup = async (): Promise<void> => {
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  logger.info(`🪄  Initialising Express App [${env.NODE_ENV}]...`);
  logger.info(`ZK Mode: ${env.ZK_MODE}`);
  logger.info(`Program Names: ${JSON.stringify(programNames)}`);

  if (env.DEPLOY_PROGRAMS) {
    await deployPrograms();
  }

  initExpressApp();

  server.listen(env.PORT, () => {
    logger.info(`🎧 HTTP service listening on port ${env.PORT}`);
  });
};

startup();
