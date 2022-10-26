import { formatLongNums } from "../lib/utils";

describe("Long number formatter", () => {
  test("renders numbers correctly", () => {
    const result1: string = formatLongNums(1000);
    const result2: string = formatLongNums(1000000);

    expect(result1).toBe("1,000");
    expect(result2).toBe("1,000,000");
  });
  test("renders numbers correctly in complex numbers", () => {
    const result1: string = formatLongNums(75000);
    const result2: string = formatLongNums(1234);

    expect(result1).toBe("75,000");
    expect(result2).toBe("1,234");
  });
});
