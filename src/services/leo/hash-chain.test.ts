import { hashChain } from "./hash-chain";

jest.setTimeout(600000);

describe("Hash Chain Service", () => {
  const hashChainBody = {
    owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
    seed: 42,
  };

  it("generates a 32 length hash chain record", async () => {
    const { owner, seed } = hashChainBody;

    const res = await hashChain.getHashChainRecord(owner, seed);

    expect(res.owner).toBe(owner);
    expect(res.gates).toBeDefined();
    expect(res._nonce).toBeDefined();
    expect(res.seed).toBe(seed);
    expect(res.hashChain).toHaveLength(32);
    expect(res.hashChain[0]).toBeDefined();
  });
});
