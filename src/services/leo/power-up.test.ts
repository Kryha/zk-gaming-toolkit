import { powerUpIdSchema, powerUpSchema } from "../../types";
import { powerUp } from "./power-up";

jest.setTimeout(600000);
// TODO base mocked Records to a constant so we can easily reuse and update
describe("Power-up service", () => {
  const createBody = {
    owner: "aleo1p4ye54p6n5cfdyzmy6fcs583mmwrghdxl8upeuew4w8uqmhqdqxq3e4tfl",
    matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
    powerUpId: "1",
  };

  const burnBody = {
    powerUp: {
      owner: "aleo1p4ye54p6n5cfdyzmy6fcs583mmwrghdxl8upeuew4w8uqmhqdqxq3e4tfl",
      gates: 0,
      powerUpId: "1",
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      _nonce: "4393085214842307962009839145934641063703150241291667000462643412531900836455group",
    },
  };

  const transferBody = {
    receiver: "aleo16fuf59f7dmw6prje3rpmrs55p0y3ykhnturgntv56mlj2w068gyqk497az",
    powerUp: {
      owner: "aleo1p4ye54p6n5cfdyzmy6fcs583mmwrghdxl8upeuew4w8uqmhqdqxq3e4tfl",
      gates: 0,
      powerUpId: "1",
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      _nonce: "4393085214842307962009839145934641063703150241291667000462643412531900836455group",
    },
  };

  it("successfully creates a power-up", async () => {
    const { owner, matchId, powerUpId } = createBody;

    const res = await powerUp.createPowerUp(owner, matchId, powerUpIdSchema.parse(powerUpId));

    expect(res._nonce).toBeDefined();
    expect(res.gates).toBeDefined();
    expect(res.matchId).toBe(matchId);
    expect(res.owner).toBe(owner);
    expect(res.powerUpId).toBe(powerUpId);
  });

  it("successfully burns a power-up", async () => {
    const { powerUp: payload } = burnBody;

    await expect(powerUp.burnPowerUp(powerUpSchema.parse(payload))).resolves.not.toThrow();
  });

  it("successfully transfers a power-up", async () => {
    const { powerUp: payload, receiver } = transferBody;

    const res = await powerUp.transferPowerUp(receiver, powerUpSchema.parse(payload));

    const { _nonce: _, ...expected } = payload;
    const { _nonce, ...toTest } = res;

    expect(res._nonce).toBeDefined();
    expect(toTest).toStrictEqual({ ...expected, owner: receiver });
  });
});

describe("PowerUp: 2 - Bird's Eye", () => {
  const birdsEyeBody = {
    powerUp: {
      owner: "aleo1p4ye54p6n5cfdyzmy6fcs583mmwrghdxl8upeuew4w8uqmhqdqxq3e4tfl",
      gates: 0,
      powerUpId: "2",
      matchId: "4978abfd-96d0-4971-a1a8-aca1ab8070cf",
      _nonce: "4393085214842307962009839145934641063703150241291667000462643412531900836455group",
    },
    diceData: {
      dice_1: 1,
      dice_2: 3,
      dice_3: 4,
      dice_4: 5,
      dice_5: 6,
      dice_6: 0,
      dice_7: 0,
      dice_8: 0,
      dice_9: 0,
      dice_10: 0,
    },
  };

  it("Should consume the Record and sum up all the given dice data", async () => {
    const { powerUp: payload, diceData } = birdsEyeBody;

    const res = await powerUp.useBirdsEye(powerUpSchema.parse(payload), diceData);

    expect(res.sum).toBe(19);
  });
});
