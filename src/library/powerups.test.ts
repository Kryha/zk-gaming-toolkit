import { powerups } from "./powerups";

jest.setTimeout(60000);

test("Powerups foo", async () => {
  expect(await powerups.use()).toBe(5);
});
