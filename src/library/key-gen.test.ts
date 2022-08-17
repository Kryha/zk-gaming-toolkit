import { keyGen } from "./key-gen";

test("Key generation foo", () => {
  expect(keyGen.foo()).toBe("keyGen");
});
