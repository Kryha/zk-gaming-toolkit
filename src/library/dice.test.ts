import { dice } from "./dice";

test("Dice foo", async () => {
  expect(await dice.roll()).toBe("dice");
});
