import { dirname, join } from "path";
import { promisify } from "util";
import { exec } from "child_process";

const appPath = dirname(require.main?.filename || "");
const execute = promisify(exec);

const contractPath = join(appPath, "..", "..", "leocontracts");

const parseOutput = (stdout: string) => {
  const lines = stdout.split("\n");

  const outputs: string[] = [];

  let isAfterOutputsLine = false;
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (isAfterOutputsLine && trimmedLine.startsWith("•")) {
      const value = trimmedLine.substring(2);
      outputs.push(value);
    } else if (trimmedLine.includes("Output")) {
      isAfterOutputsLine = true;
    }
  });

  return outputs;
};

const parseU32 = (value: string) => {
  const [parsed] = value.split("u");
  return Number(parsed);
};

const throwDice = async (a: number, b: number) => {
  const { stdout } = await execute(`cd ${contractPath} && leo run throw_dice ${a}u32 ${b}u32`);
  const [output] = parseOutput(stdout);
  const parsed = parseU32(output);
  return parsed;
};

const generateKey = async (a: number, b: number) => {
  const { stdout } = await execute(`cd ${contractPath} && leo run generate_key ${a}u32 ${b}u32`);
  const [output] = parseOutput(stdout);
  const parsed = parseU32(output);
  return parsed;
};

const generateProof = async (a: number, b: number) => {
  const { stdout } = await execute(`cd ${contractPath} && leo run generate_proof ${a}u32 ${b}u32`);
  const [output] = parseOutput(stdout);
  const parsed = parseU32(output);
  return parsed;
};

const random = async (a: number, b: number) => {
  const { stdout } = await execute(`cd ${contractPath} && leo run random ${a}u32 ${b}u32`);
  const [output] = parseOutput(stdout);
  const parsed = parseU32(output);
  return parsed;
};

const powerups = async (a: number, b: number) => {
  const { stdout } = await execute(`cd ${contractPath} && leo run powerups ${a}u32 ${b}u32`);
  const [output] = parseOutput(stdout);
  const parsed = parseU32(output);
  return parsed;
};

// TODO: redefine functions after contracts real implementation
export const leoExec = {
  call: { throwDice, generateKey, generateProof, random, powerups },
};
