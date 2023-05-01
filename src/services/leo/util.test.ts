import { apiError } from "../../utils";
import { u8 } from "./util";

// TODO: delete this or make proper tests
describe("Util test", () => {
  it("it should throw error", () => {
    let thrownErr;

    try {
      u8("u64");
    } catch (error) {
      thrownErr = error;
    }

    expect(thrownErr).toEqual(apiError("u8 parsing failed"));
  });
});
