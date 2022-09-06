import request from "supertest";

import { BASE_URL } from "../../constants";

jest.setTimeout(600000);

describe("POST /account/create", () => {
  const route = "/account/create";

  it("should return 200", async () => {
    const res = await request(BASE_URL).post(route);
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBeUndefined();
  });
});
