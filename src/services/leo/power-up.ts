import { join } from "path";

import { LeoAddress, leoAddressSchema, PowerUp, PowerUpId, UUID } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, execute, parseOutput } from "./util";

const powerUpPath = join(contractsPath, "power_up");

const createPowerUp = async (owner: LeoAddress, matchId: UUID, powerUpId: PowerUpId): Promise<PowerUp> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const powerUpIdParam = leoParse.u8(powerUpId);

  const cmd = `cd ${powerUpPath} && leo run create_power_up ${owner} ${matchIdParam} ${powerUpIdParam}`;
  const { stdout } = await execute(cmd);
  return parseOutput.powerUp(stdout);
};

const burnPowerUp = async (powerUp: PowerUp): Promise<void> => {
  const leoPowerUp = leoParse.powerUp(powerUp);
  const powerUpParam = leoParse.stringifyLeoCmdParam(leoPowerUp);

  const cmd = `cd ${powerUpPath} && leo run burn_power_up ${powerUpParam}`;
  await execute(cmd);
};

const transferPowerUp = async (receiver: LeoAddress, powerUp: PowerUp): Promise<PowerUp> => {
  leoAddressSchema.parse(receiver);

  const leoPowerUp = leoParse.powerUp(powerUp);
  const powerUpParam = leoParse.stringifyLeoCmdParam(leoPowerUp);

  const cmd = `cd ${powerUpPath} && leo run transfer_power_up ${receiver} ${powerUpParam}`;
  const { stdout } = await execute(cmd);
  return parseOutput.powerUp(stdout);
};

export const powerUp = { createPowerUp, burnPowerUp, transferPowerUp };
