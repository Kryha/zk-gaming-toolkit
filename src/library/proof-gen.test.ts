import { proofGen } from "./proof-gen";

test("Proof generation foo", () => {
  expect(proofGen.foo()).toBe("proofGen");
});
