import { join } from "path";

import { FEE, programNames } from "../../constants";
import { Dice, LeoAddress, leoAddressSchema, LeoPrivateKey, LeoViewKey, UUID } from "../../types";
import { leoParse } from "../../utils";
import { contractsPath, parseOutput, zkRun } from "./util";

const contractPath = join(contractsPath, "dice");

const appName = programNames.DICE;

const createDice = async (
  privateKey: LeoPrivateKey,
  viewKey: LeoViewKey,
  owner: LeoAddress,
  matchId: UUID,
  diceAmount: number
): Promise<Dice> => {
  leoAddressSchema.parse(owner);

  const matchIdParam = leoParse.id(matchId);
  const diceAmountParam = leoParse.u32(diceAmount);

  const transition = "create_dice";
  const params = [owner, matchIdParam, diceAmountParam];

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params, fee: FEE });

  return parseOutput.dice(record);
};

const burnDice = async (privateKey: LeoPrivateKey, viewKey: LeoViewKey, dice: Dice): Promise<void> => {
  const leoDice = leoParse.dice(dice);
  const diceParam = leoParse.stringifyLeoCmdParam(leoDice);

  const transition = "burn_dice";
  const params = [diceParam];

  await zkRun({ privateKey, viewKey, appName, contractPath, transition, params, fee: FEE });
};

const incrementDiceAmount = async (privateKey: LeoPrivateKey, viewKey: LeoViewKey, dice: Dice): Promise<Dice> => {
  const leoDice = leoParse.dice(dice);
  const diceParam = leoParse.stringifyLeoCmdParam(leoDice);

  const transition = "increment_dice_amount";
  const params = [diceParam];

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params, fee: FEE });

  return parseOutput.dice(record);
};

const decrementDiceAmount = async (privateKey: LeoPrivateKey, viewKey: LeoViewKey, dice: Dice): Promise<Dice> => {
  const leoDice = leoParse.dice(dice);
  const diceParam = leoParse.stringifyLeoCmdParam(leoDice);

  const transition = "decrement_dice_amount";
  const params = [diceParam];

  const record = await zkRun({ privateKey, viewKey, appName, contractPath, transition, params, fee: FEE });

  return parseOutput.dice(record);
};

export const dice = { createDice, burnDice, incrementDiceAmount, decrementDiceAmount };
