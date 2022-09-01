import { keyGen } from "./key-gen";

jest.setTimeout(60000);

test("Key generation foo", async () => {
  expect(await keyGen.generate()).toBe(5);
});
