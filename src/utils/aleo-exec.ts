import { dirname, join } from "path";
import { promisify } from "util";
import { exec } from "child_process";

const appPath = dirname(require.main?.filename || "");
const contractPath = join(appPath, "..", "..", "contracts", "gamingTk");

const execute = promisify(exec);

const parseOutput = (stdout: string) => {
  const lines = stdout.split("\n");

  const outputs: string[] = [];

  let isAfterOutputsLine = false;
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (isAfterOutputsLine && trimmedLine.startsWith("•")) {
      const value = trimmedLine.substring(2);
      outputs.push(value);
    } else if (trimmedLine.includes("Outputs")) {
      isAfterOutputsLine = true;
    }
  });

  return outputs;
};

const parseU32 = (value: string) => {
  const [parsed] = value.split("u");
  return Number(parsed);
};

export const aleoExec = {
  build: () => execute(`cd ${contractPath} && aleo build`),

  // TODO: redefine functions after contracts real implementation
  call: {
    throwDice: async (a: number, b: number) => {
      const { stdout } = await execute(`cd ${contractPath} && aleo run throwDice ${a}u32 ${b}u32`);
      const [output] = parseOutput(stdout);
      const parsed = parseU32(output);
      return parsed;
    },

    generateKey: async (a: number, b: number) => {
      const { stdout } = await execute(`cd ${contractPath} && aleo run generateKey ${a}u32 ${b}u32`);
      const [output] = parseOutput(stdout);
      const parsed = parseU32(output);
      return parsed;
    },

    generateProof: async (a: number, b: number) => {
      const { stdout } = await execute(`cd ${contractPath} && aleo run generateProof ${a}u32 ${b}u32`);
      const [output] = parseOutput(stdout);
      const parsed = parseU32(output);
      return parsed;
    },

    random: async (a: number, b: number) => {
      const { stdout } = await execute(`cd ${contractPath} && aleo run random ${a}u32 ${b}u32`);
      const [output] = parseOutput(stdout);
      const parsed = parseU32(output);
      return parsed;
    },

    powerup: async (a: number, b: number) => {
      const { stdout } = await execute(`cd ${contractPath} && aleo run powerup ${a}u32 ${b}u32`);
      const [output] = parseOutput(stdout);
      const parsed = parseU32(output);
      return parsed;
    },
  },
};
