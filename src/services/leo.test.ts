import { leoService } from "./leo";

jest.setTimeout(600000);

test("Dice exec", async () => {
  expect(await leoService.call.throwDice(4, 3)).toBe(7);
});

test("Powerups exec", async () => {
  expect(await leoService.call.powerups(4, 3)).toBe(7);
});

test("Proof generation exec", async () => {
  expect(await leoService.call.generateProof(4, 3)).toBe(7);
});

test("Random exec", async () => {
  expect(await leoService.call.random(4, 3)).toBe(7);
});
