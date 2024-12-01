import { describe } from "node:test";
import day1 from "./day1";

describe("Day 1", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput: string =
            "3   4\n" +
            "4   3\n" +
            "2   5\n" +
            "1   3\n" +
            "3   9\n" +
            "3   3";

        const solution = day1.part1(exampleInput);
        expect(solution).toEqual(11);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput: string =
            "3   4\n" +
            "4   3\n" +
            "2   5\n" +
            "1   3\n" +
            "3   9\n" +
            "3   3";

        const solution = day1.part2(exampleInput);
        expect(solution).toEqual(31);
    });
});
