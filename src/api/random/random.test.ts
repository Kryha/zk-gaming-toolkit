import request from "supertest";

import { BASE_URL } from "../../constants";

jest.setTimeout(6000000);

describe("POST /random/generate", () => {
  const route = "/random/generate";

  it("should return 400 when req body is empty", async () => {
    const res = await request(BASE_URL).post(route);
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 when max < min", async () => {
    const res = await request(BASE_URL).post(route).send({ min: 3, max: 2 });
    expect(res.statusCode).toBe(400);
  });

  it("should return 200", async () => {
    const res = await request(BASE_URL).post(route).send({ min: 0, max: 7 });
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBeUndefined();
  });
});
