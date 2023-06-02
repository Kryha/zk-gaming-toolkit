import { join } from "path";

import { FEE, programNames } from "../../constants";
import { DiceData, LeoAddress, leoAddressSchema, LeoPrivateKey, LeoViewKey, PowerUp, PowerUpId, Sum, UUID } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, parseOutput, zkRun } from "./util";

const powerUpContractPath = join(contractsPath, "power_up");
const powerUp2ContractPath = join(contractsPath, "power_up_2a");

const createPowerUp = async (
  privateKey: LeoPrivateKey,
  viewKey: LeoViewKey,
  owner: LeoAddress,
  matchId: UUID,
  powerUpId: PowerUpId
): Promise<PowerUp> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const powerUpIdParam = leoParse.u8(powerUpId);

  const transition = "create_power_up";
  const params = [owner, matchIdParam, powerUpIdParam];

  const record = await zkRun({
    privateKey,
    viewKey,
    appName: programNames.POWER_UP,
    contractPath: powerUpContractPath,
    transition,
    params,
    fee: FEE,
  });

  return parseOutput.powerUp(record);
};

const burnPowerUp = async (privateKey: LeoPrivateKey, viewKey: LeoViewKey, powerUp: PowerUp): Promise<void> => {
  const leoPowerUp = leoParse.powerUp(powerUp);
  const powerUpParam = leoParse.stringifyLeoCmdParam(leoPowerUp);

  const transition = "burn_power_up";
  const params = [powerUpParam];

  await zkRun({
    privateKey,
    viewKey,
    appName: programNames.POWER_UP,
    contractPath: powerUpContractPath,
    transition,
    params,
    fee: FEE,
  });
};

const transferPowerUp = async (
  privateKey: LeoPrivateKey,
  viewKey: LeoViewKey,
  receiver: LeoAddress,
  powerUp: PowerUp
): Promise<PowerUp> => {
  leoAddressSchema.parse(receiver);

  const leoPowerUp = leoParse.powerUp(powerUp);
  const powerUpParam = leoParse.stringifyLeoCmdParam(leoPowerUp);

  const transition = "transfer_power_up";
  const params = [receiver, powerUpParam];

  const record = await zkRun({
    privateKey,
    viewKey,
    appName: programNames.POWER_UP,
    contractPath: powerUpContractPath,
    transition,
    params,
    fee: FEE,
  });

  return parseOutput.powerUp(record);
};

// TODO: investigate why this is getting error 500 from execution
const useBirdsEye = async (privateKey: LeoPrivateKey, viewKey: LeoViewKey, powerUp: PowerUp, diceData: DiceData): Promise<Sum> => {
  const leoPowerUp = leoParse.powerUp(powerUp);
  const powerUpParam = leoParse.stringifyLeoCmdParam(leoPowerUp);

  const leoDiceData = leoParse.diceData(diceData);
  const diceDataParam = leoParse.stringifyLeoCmdParam(leoDiceData);

  const transition = "use";
  const params = [powerUpParam, diceDataParam];

  const record = await zkRun({
    privateKey,
    viewKey,
    appName: programNames.POWER_UP_2,
    contractPath: powerUp2ContractPath,
    transition,
    params,
    fee: FEE,
  });

  return parseOutput.sum(record);
};

export const powerUp = { createPowerUp, burnPowerUp, transferPowerUp, useBirdsEye };
