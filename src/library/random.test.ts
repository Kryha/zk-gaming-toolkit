import { random } from "./random";

jest.setTimeout(60000);

test("Random foo", async () => {
  expect(await random.generate(2, 3)).toBe(5);
});
