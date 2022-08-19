import { leoExec } from "./leo-exec";

test("Dice exec", async () => {
  expect(await leoExec.dice.execute(4, 3)).toBe(7);
});

test("Key generation exec", async () => {
  expect(await leoExec.keyGen.execute(4, 3)).toBe(7);
});

test("Powerups exec", async () => {
  expect(await leoExec.powerups.execute(4, 3)).toBe(7);
});

test("Proof generation exec", async () => {
  expect(await leoExec.proofGen.execute(4, 3)).toBe(7);
});

test("Random exec", async () => {
  expect(await leoExec.random.execute(4, 3)).toBe(7);
});
