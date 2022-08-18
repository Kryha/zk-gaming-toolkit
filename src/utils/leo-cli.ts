import { dirname, join } from "path";
import { promisify } from "util";
import { exec } from "child_process";
import { writeFile } from "fs/promises";

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

const readOutput = () => {
  // TODO: implement
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
  },
  keyGen: {
    run: () => run("key-gen"),
    write: (a: number, b: number) => write("key-gen", generateDefaultInputs(a, b), defaultRegister),
  },
  powerups: {
    run: () => run("powerups"),
    write: (a: number, b: number) => write("powerups", generateDefaultInputs(a, b), defaultRegister),
  },
  proofGen: {
    run: () => run("proof-gen"),
    write: (a: number, b: number) => write("proof-gen", generateDefaultInputs(a, b), defaultRegister),
  },
  random: {
    run: () => run("random"),
    write: (a: number, b: number) => write("random", generateDefaultInputs(a, b), defaultRegister),
  },
};
