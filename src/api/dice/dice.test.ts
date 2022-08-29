import request from "supertest";

import { BASE_URL } from "../../constants";

jest.setTimeout(60000);

describe("POST /dice/roll", () => {
  const route = "/dice/roll";

  it("should return 400 when req body is empty", async () => {
    const res = await request(BASE_URL).post(route);
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 when diceAmount > 5", async () => {
    const res = await request(BASE_URL).post(route).send({ diceAmount: 6 });
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 when diceAmount < 1", async () => {
    const res = await request(BASE_URL).post(route).send({ diceAmount: 0 });
    expect(res.statusCode).toBe(400);
  });

  it("should return 200", async () => {
    const res = await request(BASE_URL).post(route).send({ diceAmount: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBeUndefined();
  });
});
