import { keyGen } from "./key-gen";

test("Key generation foo", async () => {
  expect(await keyGen.generate()).toBe("keyGen");
});
