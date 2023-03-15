import request from "supertest";

import { BASE_URL } from "../../constants";

jest.setTimeout(6000000);

describe("POST /power-ups/2", () => {
  const route = "/power-ups/2";
  const birdsEyeBody = {
    privateKey: "APrivateKey1zkp3WTnfDxUchbLeHqwGrgdkTNieykUP72UPNmv4uQngjwf",
    viewKey: "AViewKey1fvqnzQ9nYfFMAkhjdcz5UEtDD1JjpbtG8kMXBLJKAHbd",
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

  it("should return 400 when req body is empty", async () => {
    const res = await request(BASE_URL).post(route);

    expect(res.statusCode).toBe(400);
  });

  it("should return 200 on successful execution", async () => {
    const res = await request(BASE_URL).post(route).send(birdsEyeBody);

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBeUndefined();
    expect(res.body.sum).toBe(19);
  });
});
