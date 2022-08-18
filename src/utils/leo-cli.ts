import { dirname, join } from "path";
import { promisify } from "util";
import { exec } from "child_process";

const appDir = dirname(require.main?.filename || "");
const execute = promisify(exec);

type Contract = "dice" | "key-gen" | "powerups" | "proof-gen" | "random";

const run = async (contract: Contract) => {
  const contractDir = join(appDir, "..", "..", "contracts", contract);
  const execRes = await execute(`cd ${contractDir} && leo run`);
  return execRes;
};

export const leoCli = {
  dice: {
    run: () => run("dice"),
    write: () => {
      // TODO: implement
    },
  },
  keyGen: {
    run: () => run("key-gen"),
    write: () => {
      // TODO: implement
    },
  },
  powerups: {
    run: () => run("powerups"),
    write: () => {
      // TODO: implement
    },
  },
  proofGen: {
    run: () => run("proof-gen"),
    write: () => {
      // TODO: implement
    },
  },
  random: {
    run: () => run("random"),
    write: () => {
      // TODO: implement
    },
  },
};
