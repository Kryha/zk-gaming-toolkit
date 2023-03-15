import { powerUpProbabilitiesSchema } from "../../types";
import { boloney } from "./boloney";

jest.setTimeout(600000);

describe("Boloney service", () => {
  const body = {
    createMatch: {
      owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      privateKey: "APrivateKey1zkp3WTnfDxUchbLeHqwGrgdkTNieykUP72UPNmv4uQngjwf",
      viewKey: "AViewKey1fvqnzQ9nYfFMAkhjdcz5UEtDD1JjpbtG8kMXBLJKAHbd",
      settings: {
        players: 3,
        dicePerPlayer: 5,
        initialPowerUpAmount: 3,
        stageNumberDivisor: 5,
        drawRoundOffset: 0,
        healPowerUpAmount: 1,
        maxPowerUpAmount: 3,
      },
      powerUps: [
        {
          id: "1",
          probability: 12,
        },
        {
          id: "2",
          probability: 11,
        },
        {
          id: "3",
          probability: 11,
        },
        {
          id: "4",
          probability: 11,
        },
        {
          id: "5",
          probability: 11,
        },
        {
          id: "6",
          probability: 11,
        },
        {
          id: "7",
          probability: 11,
        },
        {
          id: "8",
          probability: 11,
        },
        {
          id: "9",
          probability: 11,
        },
      ],
    },

    createMatchSummary: {
      owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      privateKey: "APrivateKey1zkp3WTnfDxUchbLeHqwGrgdkTNieykUP72UPNmv4uQngjwf",
      viewKey: "AViewKey1fvqnzQ9nYfFMAkhjdcz5UEtDD1JjpbtG8kMXBLJKAHbd",
      ranking: [
        "0baea867-d510-43f5-8e10-0b2ac342c49e",
        "0baea867-d510-43f5-8e10-0b2ac342c49f",
        "0baea867-d510-43f5-8e10-0b2ac342c49a",
        "0baea867-d510-43f5-8e10-0b2ac342c49b",
      ],
    },
  };

  it("successfully creates a match", async () => {
    const { owner, matchId, settings, powerUps, privateKey, viewKey } = body.createMatch;

    const parsedPowerUps = powerUpProbabilitiesSchema.parse(powerUps);

    const res = await boloney.createMatch(privateKey, viewKey, owner, matchId, settings, parsedPowerUps);

    expect(res._nonce).toBeDefined();
    expect(res.gates).toBeDefined();
    expect(res.owner).toBe(owner);
    expect(res.matchId).toBe(matchId);
    expect(res.powerUps).toStrictEqual(powerUps);
    expect(res.settings).toStrictEqual(settings);
  });

  it("successfully creates a match summary", async () => {
    const { owner, matchId, ranking, privateKey, viewKey } = body.createMatchSummary;

    const res = await boloney.createMatchSummary(privateKey, viewKey, owner, matchId, ranking);

    expect(res._nonce).toBeDefined();
    expect(res.gates).toBeDefined();
    expect(res.owner).toBe(owner);
    expect(res.matchId).toBe(matchId);
    expect(res.ranking).toStrictEqual(ranking);
  });
});
