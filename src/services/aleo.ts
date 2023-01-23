import { promisify } from "util";
import { exec } from "child_process";

const execute = promisify(exec);

const createAccount = async () => {
  const { stdout } = await execute("aleo account new");

  const PRIVATE_KEY = "Private";
  const VIEW_KEY = "View";
  const ADDRESS = "Address";

  const parsed = stdout.split("\n").reduce(
    (accountInfo, line) => {
      const trimmedLine = line.trim();

      const lineArr = trimmedLine.split(" ");

      switch (lineArr[0]) {
        case PRIVATE_KEY: {
          return { ...accountInfo, privateKey: lineArr[3] };
        }
        case VIEW_KEY: {
          return { ...accountInfo, viewKey: lineArr[3] };
        }
        case ADDRESS: {
          return { ...accountInfo, address: lineArr[2] };
        }
        default: {
          return accountInfo;
        }
      }
    },
    { privateKey: "", viewKey: "", address: "" }
  );

  return parsed;
};

export const aleo = { createAccount };
