import { leoCli } from "./leo-cli";

test("Dice CLI", async () => {
  expect(await leoCli.dice.execute(4, 3)).toBe(7);
});

test("Key generation CLI", async () => {
  expect(await leoCli.keyGen.execute(4, 3)).toBe(7);
});

test("Powerups CLI", async () => {
  expect(await leoCli.powerups.execute(4, 3)).toBe(7);
});

test("Proof generation CLI", async () => {
  expect(await leoCli.proofGen.execute(4, 3)).toBe(7);
});

test("Random CLI", async () => {
  expect(await leoCli.random.execute(4, 3)).toBe(7);
});
