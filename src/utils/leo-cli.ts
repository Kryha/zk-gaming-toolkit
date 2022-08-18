import { dirname, join } from "path";
import { promisify } from "util";
import { exec } from "child_process";
import { writeFile, readFile } from "fs/promises";

type Contract = "dice" | "key-gen" | "powerups" | "proof-gen" | "random";

interface AleoInputLine {
  name?: string;
  type: string;
  value: string;
}

const appDir = dirname(require.main?.filename || "");
const execute = promisify(exec);

const getContractPath = (contract: Contract) => join(appDir, "..", "..", "contracts", contract);

const run = (contract: Contract) => {
  const contractPath = getContractPath(contract);
  return execute(`cd ${contractPath} && leo run`);
};

const write = (contract: Contract, inputs: AleoInputLine[], registers: AleoInputLine[]) => {
  const contractPath = getContractPath(contract);
  const inputPath = join(contractPath, "inputs", `${contract}.in`);

  const inputsContent = inputs.map((input, i) => `${input.name || `i${i}`}: ${input.type} = ${input.value};`);
  const registersContent = registers.map((input, i) => `r${i}: ${input.type} = ${input.value};`);

  const content = `[main]
${inputsContent.join("\n")}

[registers]
${registersContent.join("\n")}
`;

  return writeFile(inputPath, content);
};

const readOutput = async (contract: Contract) => {
  const contractPath = getContractPath(contract);
  const outputPath = join(contractPath, "outputs", `${contract}.out`);
  const readRes = await readFile(outputPath, "utf8");

  const lines = readRes.split("\n");

  const values = lines.reduce((vals: string[], line) => {
    if (!line.startsWith("r")) return vals;

    const [_, rightSide] = line.split("=");
    const [value] = rightSide.trim().split(";");

    return [...vals, value];
  }, []);

  return values;
};

// TODO: delete after contracts real implementation
const generateDefaultInputs = (a: number, b: number) => [
  { name: "a", type: "u32", value: a.toString() },
  { name: "b", type: "u32", value: b.toString() },
];

// TODO: delete after contracts real implementation
const defaultRegister = [{ type: "u32", value: "0" }];

// TODO: redefine "write" functions after contracts real implementation
export const leoCli = {
  dice: {
    run: () => run("dice"),
    write: (a: number, b: number) => write("dice", generateDefaultInputs(a, b), defaultRegister),
    readOutput: async () => {
      const outputs = await readOutput("dice");
      if (!outputs.length) throw new Error("No outputs found.");
      return Number(outputs[0]);
    },
    execute: async (a: number, b: number) => {
      await leoCli.dice.write(a, b);
      await leoCli.dice.run();
      return leoCli.dice.readOutput();
    },
  },
  keyGen: {
    run: () => run("key-gen"),
    write: (a: number, b: number) => write("key-gen", generateDefaultInputs(a, b), defaultRegister),
    readOutput: async () => {
      const outputs = await readOutput("key-gen");
      if (!outputs.length) throw new Error("No outputs found.");
      return Number(outputs[0]);
    },
    execute: async (a: number, b: number) => {
      await leoCli.dice.write(a, b);
      await leoCli.dice.run();
      return leoCli.dice.readOutput();
    },
  },
  powerups: {
    run: () => run("powerups"),
    write: (a: number, b: number) => write("powerups", generateDefaultInputs(a, b), defaultRegister),
    readOutput: async () => {
      const outputs = await readOutput("powerups");
      if (!outputs.length) throw new Error("No outputs found.");
      return Number(outputs[0]);
    },
    execute: async (a: number, b: number) => {
      await leoCli.dice.write(a, b);
      await leoCli.dice.run();
      return leoCli.dice.readOutput();
    },
  },
  proofGen: {
    run: () => run("proof-gen"),
    write: (a: number, b: number) => write("proof-gen", generateDefaultInputs(a, b), defaultRegister),
    readOutput: async () => {
      const outputs = await readOutput("proof-gen");
      if (!outputs.length) throw new Error("No outputs found.");
      return Number(outputs[0]);
    },
    execute: async (a: number, b: number) => {
      await leoCli.dice.write(a, b);
      await leoCli.dice.run();
      return leoCli.dice.readOutput();
    },
  },
  random: {
    run: () => run("random"),
    write: (a: number, b: number) => write("random", generateDefaultInputs(a, b), defaultRegister),
    readOutput: async () => {
      const outputs = await readOutput("random");
      if (!outputs.length) throw new Error("No outputs found.");
      return Number(outputs[0]);
    },
    execute: async (a: number, b: number) => {
      await leoCli.dice.write(a, b);
      await leoCli.dice.run();
      return leoCli.dice.readOutput();
    },
  },
};
