import { powerups } from "./powerups";

jest.setTimeout(600000);

test("Powerups foo", async () => {
  expect(await powerups.use()).toBe(5);
});
