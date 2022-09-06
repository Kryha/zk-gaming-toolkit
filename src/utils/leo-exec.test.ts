import { leoExec } from "./leo-exec";

jest.setTimeout(600000);

test("Dice exec", async () => {
  expect(await leoExec.call.throwDice(4, 3)).toBe(7);
});

test("Key generation exec", async () => {
  expect(await leoExec.call.generateKey(4, 3)).toBe(7);
});

test("Powerups exec", async () => {
  expect(await leoExec.call.powerups(4, 3)).toBe(7);
});

test("Proof generation exec", async () => {
  expect(await leoExec.call.generateProof(4, 3)).toBe(7);
});

test("Random exec", async () => {
  expect(await leoExec.call.random(4, 3)).toBe(7);
});
