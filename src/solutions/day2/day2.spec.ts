import { describe } from "node:test";
import day2 from "./day2";

describe("Day 2", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput =
            "7 6 4 2 1\n" +
            "1 2 7 8 9\n" +
            "9 7 6 2 1\n" +
            "1 3 2 4 5\n" +
            "8 6 4 4 1\n" +
            "1 3 6 7 9";

        const solution = day2.part1(exampleInput);
        expect(solution).toEqual(2);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput =
            "7 6 4 2 1\n" +
            "1 2 7 8 9\n" +
            "9 7 6 2 1\n" +
            "1 3 2 4 5\n" +
            "8 6 4 4 1\n" +
            "1 3 6 7 9";

        const solution = day2.part2(exampleInput);
        expect(solution).toEqual(4);
    });
});
