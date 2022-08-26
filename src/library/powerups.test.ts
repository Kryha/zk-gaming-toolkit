import { powerups } from "./powerups";

test("Powerups foo", async () => {
  expect(await powerups.use()).toBe("powerups");
});
