import day7 from "./day7";

describe("Day 7", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput =
            "190: 10 19\n" +
            "3267: 81 40 27\n" +
            "83: 17 5\n" +
            "156: 15 6\n" +
            "7290: 6 8 6 15\n" +
            "161011: 16 10 13\n" +
            "192: 17 8 14\n" +
            "21037: 9 7 18 13\n" +
            "292: 11 6 16 20";

        const solution = day7.part1(exampleInput);
        expect(solution).toEqual(3749);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput =
            "190: 10 19\n" +
            "3267: 81 40 27\n" +
            "83: 17 5\n" +
            "156: 15 6\n" +
            "7290: 6 8 6 15\n" +
            "161011: 16 10 13\n" +
            "192: 17 8 14\n" +
            "21037: 9 7 18 13\n" +
            "292: 11 6 16 20";

        const solution = day7.part2(exampleInput);
        expect(solution).toEqual(11387);
    });
});
