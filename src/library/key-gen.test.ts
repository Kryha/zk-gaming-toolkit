import { keyGen } from "./key-gen";

jest.setTimeout(600000);

test("Key generation foo", async () => {
  expect(await keyGen.generate()).toBe(5);
});
