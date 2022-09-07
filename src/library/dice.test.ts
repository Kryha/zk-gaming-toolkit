import { dice } from "./dice";

jest.setTimeout(600000);

test("Dice foo", async () => {
  expect(await dice.roll(2)).toBe(5);
});
