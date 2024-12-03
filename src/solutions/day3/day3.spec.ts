import { describe } from "node:test";
import day3 from "./day3";

describe("Day 3", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput =
            "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

        const solution = day3.part1(exampleInput);
        expect(solution).toEqual(161);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput =
            "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

        const solution = day3.part2(exampleInput);
        expect(solution).toEqual(48);
    });
});
