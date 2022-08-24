import { aleoExec } from "./aleo-exec";

jest.setTimeout(60000);

beforeAll(async () => {
  await aleoExec.build();
});

test("Account creation", async () => {
  const PRIVATE_KEY = "APrivateKey1";
  const VIEW_KEY = "AViewKey1";
  const ADDRESS = "aleo1";

  const res = await aleoExec.createAccount();

  expect(res.privateKey).toMatch(new RegExp(`^${PRIVATE_KEY}?`));
  expect(res.viewKey).toMatch(new RegExp(`^${VIEW_KEY}?`));
  expect(res.address).toMatch(new RegExp(`^${ADDRESS}?`));
});

test("Dice throw", async () => {
  expect(await aleoExec.call.throwDice(2, 3)).toBe(5);
});

test("Proof generation", async () => {
  expect(await aleoExec.call.generateProof(2, 3)).toBe(5);
});

test("Key generation", async () => {
  expect(await aleoExec.call.generateKey(2, 3)).toBe(5);
});

test("Random number generation", async () => {
  expect(await aleoExec.call.random(2, 3)).toBe(5);
});

test("Powerups", async () => {
  expect(await aleoExec.call.powerup(2, 3)).toBe(5);
});
