import { random } from "./random";

jest.setTimeout(600000);

test("Random foo", async () => {
  expect(await random.generate(2, 3)).toBe(5);
});
