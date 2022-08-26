import { random } from "./random";

test("Random foo", async () => {
  expect(await random.generate()).toBe("random");
});
