import { powerUpIdSchema, powerUpSchema } from "../../types";
import { powerUp } from "./power-up";

jest.setTimeout(600000);

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
