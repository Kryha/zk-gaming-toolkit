import request from "supertest";

import { BASE_URL } from "../../constants";

jest.setTimeout(6000000);

describe("POST /random/number", () => {
  const route = "/random/number";

  it("should return 400 when req body is empty", async () => {
    const res = await request(BASE_URL).post(route);

    expect(res.statusCode).toBe(400);
  });

  it("should return 400 when max < min", async () => {
    const res = await request(BASE_URL).post(route).send({
      privateKey: "APrivateKey1zkp3WTnfDxUchbLeHqwGrgdkTNieykUP72UPNmv4uQngjwf",
      viewKey: "AViewKey1fvqnzQ9nYfFMAkhjdcz5UEtDD1JjpbtG8kMXBLJKAHbd",
      owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
      seed: 42,
      min: 3,
      max: 2,
    });

    expect(res.statusCode).toBe(400);
  });

  it("should return 200 with the correct value", async () => {
    const res = await request(BASE_URL).post(route).send({
      privateKey: "APrivateKey1zkp3WTnfDxUchbLeHqwGrgdkTNieykUP72UPNmv4uQngjwf",
      viewKey: "AViewKey1fvqnzQ9nYfFMAkhjdcz5UEtDD1JjpbtG8kMXBLJKAHbd",
      owner: "aleo1z9rkh2xecmpnx9jxkvnyq08mfeddrsrccny0j2hgw4yfhnxpxyqqp42329",
      seed: 42,
      min: 1,
      max: 100,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBeUndefined();
    expect(res.body.randomNumber).toBe(43);
  });
});

describe("POST /random/hash-chain-record", () => {
  const route = "/random/hash-chain-record";

  it("should return 400 when req body is empty", async () => {
    const res = await request(BASE_URL).post(route);

    expect(res.statusCode).toBe(400);
  });

  it("should return 200", async () => {
    const res = await request(BASE_URL).post(route).send({
      privateKey: "APrivateKey1zkp3WTnfDxUchbLeHqwGrgdkTNieykUP72UPNmv4uQngjwf",
      viewKey: "AViewKey1fvqnzQ9nYfFMAkhjdcz5UEtDD1JjpbtG8kMXBLJKAHbd",
      owner: "aleo178vq84yvu4kq2cg9ssedhpz4wgtnfq8nrhca3tpqjs3324p3gsrq7yt8u3",
      seed: 42,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBeUndefined();
  });
});
