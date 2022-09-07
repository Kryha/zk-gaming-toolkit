import { aleoExec } from "./aleo-exec";

jest.setTimeout(600000);

test("Account creation", async () => {
  const PRIVATE_KEY = "APrivateKey1";
  const VIEW_KEY = "AViewKey1";
  const ADDRESS = "aleo1";

  const res = await aleoExec.createAccount();

  expect(res.privateKey).toMatch(new RegExp(`^${PRIVATE_KEY}?`));
  expect(res.viewKey).toMatch(new RegExp(`^${VIEW_KEY}?`));
  expect(res.address).toMatch(new RegExp(`^${ADDRESS}?`));

  expect(res.privateKey).toHaveLength(59);
  expect(res.viewKey).toHaveLength(53);
  expect(res.address).toHaveLength(63);
});
