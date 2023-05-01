import { core } from "../../core";
import { hashChain } from "./hash-chain";

jest.setTimeout(600000);

describe("Hash Chain Service", () => {
  const hashChainBody = {
    owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
    privateKey: "APrivateKey1zkp3WTnfDxUchbLeHqwGrgdkTNieykUP72UPNmv4uQngjwf",
    viewKey: "AViewKey1fvqnzQ9nYfFMAkhjdcz5UEtDD1JjpbtG8kMXBLJKAHbd",
    seed: 42,
  };

  it("generates a 32 length hash chain record", async () => {
    const { owner, privateKey, viewKey } = hashChainBody;

    const { seed, hashChain: hash } = core.hashChain.generate();

    const res = await hashChain.createHashChainRecord(privateKey, viewKey, owner, seed, hash);

    expect(res.owner).toBe(owner);
    expect(res.gates).toBeDefined();
    expect(res._nonce).toBeDefined();
    expect(res.seed).toBe(seed);
    expect(res.hashChain).toHaveLength(32);
    expect(res.hashChain[0]).toBeDefined();
  });
});
