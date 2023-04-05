const { exec } = require("child_process");
const { promisify } = require("util");
const { readFileSync } = require("fs");
const { writeFile } = require("fs/promises");

const { APP_NAMES, PRIVATE_KEY, RECORD, VIEW_KEY } = process.env;

const execute = promisify(exec);

const FEES = {
  boloney_match: 600000,
  boloney_match_summary: 600000,
  dice: 2400000,
  power_up: 2400000,
  rng: 600000,
  hash_chain: 600000,
};

const programNames = JSON.parse(readFileSync("./env/programNames.json", "utf8"));

const appNames = APP_NAMES.split(",");

const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const parseBroadcastOutput = (cmdOutput) => {
  const lines = cmdOutput.split("\n");
  const res = lines.find((line) => line.startsWith("at1"))?.trim();
  return res;
};

const parseCmdOutput = (cmdOutput) => {
  const lines = cmdOutput.split("\n");

  let res = {};

  let objectStarted = false;
  let objectFinished = false;
  let done = false;
  let toParse = "";

  lines.forEach((line) => {
    if (done) return;

    if (objectStarted && objectFinished) {
      const correctJson = toParse.replace(/(['"])?([a-z0-9A-Z_.]+)(['"])?/g, '"$2" ');
      res = JSON.parse(correctJson);
      done = true;
    } else if (objectStarted) {
      if (line.startsWith("}")) {
        objectFinished = true;
      }
      const trimmedLine = line.trim();
      toParse = toParse + trimmedLine;
    } else if (line.includes("• {") || line.startsWith("{")) {
      toParse = toParse + "{";
      objectStarted = true;
    }
  });

  return res;
};

const decryptRecord = async (encryptedRecord, viewKey) => {
  const cmd = `snarkos developer decrypt -v ${viewKey} -c ${encryptedRecord}`;
  const { stdout } = await execute(cmd);
  const parsed = parseCmdOutput(stdout);

  return parsed;
};

const attemptFetch = async (url, attempts = 50) => {
  let res = undefined;

  while (!res && attempts > 0) {
    try {
      const fetchRes = await fetch(url);
      res = await fetchRes.json();
    } catch (error) {
      attempts--;
      await wait();
    }
  }

  if (!res) throw new Error(`Failed to fetch ${url}.`);

  return res;
};

const deployedApps = new Set();

const deploy = async () => {
  let record = RECORD;

  for (let appName of appNames) {
    try {
      const fee = FEES[appName];
      if (!fee) throw new Error(`No fee found for ${appName}.`);

      // 1. build the program
      const buildCmd = `cd contracts/${appName} && rm -rf build/ && leo build`;
      console.log("Building program...");
      await execute(buildCmd);

      // 2. generate unique name
      const oldName = programNames[appName.toUpperCase()];
      const nameBits = oldName.split("_");
      const oldCounter = parseInt(nameBits[nameBits.length - 1]);
      const newCounter = !isNaN(oldCounter) ? oldCounter + 1 : 1;

      const uniqueName = `${appName}_${newCounter}`;

      // 3. substitute program name in build
      const sedCmd = `cd contracts/${appName} && sed -i "" "s/${appName}/${uniqueName}/g" build/main.aleo && sed -i "" "s/${appName}/${uniqueName}/g" build/program.json`;
      console.log("Renaming program...");
      await execute(sedCmd);

      // 4. deploy program
      const deployCmd = `
        cd contracts/${appName} && \
        snarkos developer deploy "${uniqueName}.aleo" \
          --private-key "${PRIVATE_KEY}" \
          --query "https://vm.aleo.org/api" \
          --path "./build/" \
          --broadcast "https://vm.aleo.org/api/testnet3/transaction/broadcast" \
          --fee ${fee} \
          --record "${record}"
        `;
      console.log("Deploying program...");
      const { stdout } = await execute(deployCmd);

      console.log(stdout);

      // 5. retrieve and decode new record
      const txId = parseBroadcastOutput(stdout);
      if (!txId) throw new Error("Failed to parse txId.");

      const tx = await attemptFetch(`https://vm.aleo.org/api/testnet3/transaction/${txId}`);
      const newRecord = tx.additional_fee.transition.outputs[0].value;
      const decryptedRecord = await decryptRecord(newRecord, VIEW_KEY);
      record = JSON.stringify(decryptedRecord);

      // 6. update program name
      deployedApps.add(appName);
      programNames[appName.toUpperCase()] = uniqueName;
    } catch (error) {
      console.log(`Failed to deploy ${appName}.`);
      console.log(error);
    }
  }

  await writeFile("./env/programNames.json", JSON.stringify(programNames, null, 2));

  const failedToDeploy = appNames.filter((appName) => !deployedApps.has(appName));
  if (failedToDeploy.length > 0) {
    console.log(`Failed to deploy: ${failedToDeploy.join(", ")}`);
  }

  console.log(record);
};

deploy();
