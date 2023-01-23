import { dice } from "./dice";

jest.setTimeout(600000);

describe("Dice service", () => {
  const createBody = {
    owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
    matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
    diceAmount: 3,
  };

  const burnBody = {
    dice: {
      owner: "aleo1858u2692n6rykxpsy2sxh42fdm0gm562k650z43lkv8wjywfsqxq9u6p30",
      gates: 0,
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      faceAmount: 6,
      diceAmount: 2,
      _nonce: "1323450485807227633491366157428111506683947033444154737457888904676343676647group",
    },
  };

  const incrementBody = {
    dice: {
      owner: "aleo1858u2692n6rykxpsy2sxh42fdm0gm562k650z43lkv8wjywfsqxq9u6p30",
      gates: 0,
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      faceAmount: 6,
      diceAmount: 2,
      _nonce: "1323450485807227633491366157428111506683947033444154737457888904676343676647group",
    },
  };

  const decrementBody = {
    dice: {
      owner: "aleo1858u2692n6rykxpsy2sxh42fdm0gm562k650z43lkv8wjywfsqxq9u6p30",
      gates: 0,
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      faceAmount: 6,
      diceAmount: 2,
      _nonce: "1323450485807227633491366157428111506683947033444154737457888904676343676647group",
    },
  };

  it("successfully creates dice", async () => {
    const { owner, matchId, diceAmount } = createBody;

    const res = await dice.createDice(owner, matchId, diceAmount);

    expect(res._nonce).toBeDefined();
    expect(res.gates).toBeDefined();
    expect(res.faceAmount).toBe(6);
    expect(res.owner).toBe(owner);
    expect(res.matchId).toBe(matchId);
    expect(res.diceAmount).toBe(diceAmount);
  });

  it("successfully burns dice", async () => {
    await expect(dice.burnDice(burnBody.dice)).resolves.not.toThrow();
  });

  it("successfully increments dice amount", async () => {
    const { dice: payload } = incrementBody;

    const res = await dice.incrementDiceAmount(payload);

    const { _nonce: _, ...expected } = payload;
    const { _nonce, ...toTest } = res;

    expect(res._nonce).toBeDefined();
    expect(toTest).toStrictEqual({ ...expected, diceAmount: payload.diceAmount + 1 });
  });

  it("successfully decrements dice amount", async () => {
    const { dice: payload } = decrementBody;

    const res = await dice.decrementDiceAmount(payload);

    const { _nonce: _, ...expected } = payload;
    const { _nonce, ...toTest } = res;

    expect(res._nonce).toBeDefined();
    expect(toTest).toStrictEqual({ ...expected, diceAmount: payload.diceAmount - 1 });
  });
});
