import { decodeId, encodeId } from "./id";

describe("ID encoding and decoding", () => {
  const MOCK_USER_ID = "0baea867-d510-43f5-8e10-0b2ac342c49e";
  const MOCK_MATCH_ID = "4978abfd-96d0-4971-a1a8-aca1ab8070cf";

  it("should return initial value after encode/decode for a user id", () => {
    const encodedId = encodeId(MOCK_USER_ID);
    expect(encodedId).toBeTruthy();
    if (!encodedId) return;

    const decodedId = decodeId(encodedId);
    expect(decodedId).toBe(MOCK_USER_ID);
  });

  it("should return initial value after encode/decode for a match id", () => {
    const encodedId = encodeId(MOCK_MATCH_ID);
    expect(encodedId).toBeTruthy();
    if (!encodedId) return;

    const decodedId = decodeId(encodedId);
    expect(decodedId).toBe(MOCK_MATCH_ID);
  });
});
