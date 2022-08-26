import { proofGen } from "./proof-gen";

test("Proof generation foo", async () => {
  expect(await proofGen.generate()).toBe("proofGen");
});
