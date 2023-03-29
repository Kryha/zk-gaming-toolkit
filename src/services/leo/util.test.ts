import { u8 } from "./util";

// TODO: delete this or make proper tests
describe("Util test", () => {
  it("it should throw error", () => {
    expect(u8("u64")).toThrow();
  });
});
