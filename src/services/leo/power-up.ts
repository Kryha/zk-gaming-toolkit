import { join } from "path";

import { programNames } from "../../constants";
import { DiceData, LeoAddress, leoAddressSchema, LeoPrivateKey, LeoViewKey, PowerUp, PowerUpId, Sum, UUID } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, parseOutput, zkRun } from "./util";

const contractPath = join(contractsPath, "power_up");

const appName = programNames.POWER_UP;

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

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params });

  return parseOutput.powerUp(record);
};

const burnPowerUp = async (privateKey: LeoPrivateKey, viewKey: LeoViewKey, powerUp: PowerUp): Promise<void> => {
  const leoPowerUp = leoParse.powerUp(powerUp);
  const powerUpParam = leoParse.stringifyLeoCmdParam(leoPowerUp);

  const transition = "burn_power_up";
  const params = [powerUpParam];

  await zkRun({ privateKey, viewKey, appName, contractPath, transition, params });
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

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params });

  return parseOutput.powerUp(record);
};

const useBirdsEye = async (privateKey: LeoPrivateKey, viewKey: LeoViewKey, powerUp: PowerUp, diceData: DiceData): Promise<Sum> => {
  const leoPowerUp = leoParse.powerUp(powerUp);
  const powerUpParam = leoParse.stringifyLeoCmdParam(leoPowerUp);

  const leoDiceData = leoParse.diceData(diceData);
  const diceDataParam = leoParse.stringifyLeoCmdParam(leoDiceData);

  const transition = "use_birds_eye";
  const params = [powerUpParam, diceDataParam];

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params });

  return parseOutput.sum(record);
};

export const powerUp = { createPowerUp, burnPowerUp, transferPowerUp, useBirdsEye };
