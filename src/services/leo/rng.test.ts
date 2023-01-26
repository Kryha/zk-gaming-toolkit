import { rng } from "./rng";

// TODO: adjust timeout to sensitive values
jest.setTimeout(600000);

describe("RNG Service", () => {
  const randomNumberBody = {
    seed: 42,
    min: 1,
    max: 6,
  };

  it("generates a random number in given range", async () => {
    const { seed, min, max } = randomNumberBody;

    const res = await rng.getRandomNumber(seed, min, max);

    expect(res.randomNumber).toBeGreaterThanOrEqual(min);
    expect(res.randomNumber).toBeLessThanOrEqual(max);
  });

  const hashChainBody = {
    owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
    seed: 42,
  };

  it("generates a 32 length hash chain record", async () => {
    const { owner, seed } = hashChainBody;

    const res = await rng.getHashChainRecord(owner, seed);

    expect(res.owner).toBe(owner);
    expect(res.gates).toBeDefined();
    expect(res._nonce).toBeDefined();
    expect(res.seed).toBe(seed);
    expect(res.hashChain).toHaveLength(32);
    expect(res.hashChain[0]).toBeDefined();
  });
});
