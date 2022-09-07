import { proofGen } from "./proof-gen";

jest.setTimeout(600000);

test("Proof generation foo", async () => {
  expect(await proofGen.generate()).toBe(5);
});
