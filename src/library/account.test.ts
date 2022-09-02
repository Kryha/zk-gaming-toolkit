import { account } from "./account";

const PRIVATE_KEY = "APrivateKey1";
const VIEW_KEY = "AViewKey1";
const ADDRESS = "aleo1";

jest.setTimeout(60000);

test("Account creation", async () => {
  const newAccount = await account.create();

  expect(newAccount.privateKey).toMatch(new RegExp(`^${PRIVATE_KEY}?`));
  expect(newAccount.viewKey).toMatch(new RegExp(`^${VIEW_KEY}?`));
  expect(newAccount.address).toMatch(new RegExp(`^${ADDRESS}?`));

  expect(newAccount.privateKey).toHaveLength(59);
  expect(newAccount.viewKey).toHaveLength(53);
  expect(newAccount.address).toHaveLength(63);
});
