import { rng } from "./rng";

// TODO: adjust timeout to sensitive values
jest.setTimeout(600000);

describe("RNG Service", () => {
  const randomNumberBody = {
    owner: "aleo1p4ye54p6n5cfdyzmy6fcs583mmwrghdxl8upeuew4w8uqmhqdqxq3e4tfl",
    seed: 42,
    min: 1,
    max: 6,
  };

  it("generates a random number in given range", async () => {
    const { seed, min, max, owner } = randomNumberBody;

    const res = await rng.getRandomNumber(owner, seed, min, max);

    expect(res.randomNumber).toBeGreaterThanOrEqual(min);
    expect(res.randomNumber).toBeLessThanOrEqual(max);
  });
});
