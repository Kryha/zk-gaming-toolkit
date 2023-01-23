import { join } from "path";

import { Dice, LeoAddress, leoAddressSchema, UUID } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, execute, parseOutput } from "./util";

const dicePath = join(contractsPath, "dice");

const createDice = async (owner: LeoAddress, matchId: UUID, diceAmount: number): Promise<Dice> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const diceAmountParam = leoParse.u32(diceAmount);

  const cmd = `cd ${dicePath} && leo run create_dice ${owner} ${matchIdParam} ${diceAmountParam}`;
  const { stdout } = await execute(cmd);

  return parseOutput.dice(stdout);
};

const burnDice = async (dice: Dice): Promise<void> => {
  const leoDice = leoParse.dice(dice);
  const diceParam = leoParse.stringifyLeoCmdParam(leoDice);

  const cmd = `cd ${dicePath} && leo run burn_dice ${diceParam}`;
  await execute(cmd);
};

const incrementDiceAmount = async (dice: Dice): Promise<Dice> => {
  const leoDice = leoParse.dice(dice);
  const diceParam = leoParse.stringifyLeoCmdParam(leoDice);

  const cmd = `cd ${dicePath} && leo run increment_dice_amount ${diceParam}`;
  const { stdout } = await execute(cmd);

  return parseOutput.dice(stdout);
};

const decrementDiceAmount = async (dice: Dice): Promise<Dice> => {
  const leoDice = leoParse.dice(dice);
  const diceParam = leoParse.stringifyLeoCmdParam(leoDice);

  const cmd = `cd ${dicePath} && leo run decrement_dice_amount ${diceParam}`;
  const { stdout } = await execute(cmd);

  return parseOutput.dice(stdout);
};

export const dice = { createDice, burnDice, incrementDiceAmount, decrementDiceAmount };
