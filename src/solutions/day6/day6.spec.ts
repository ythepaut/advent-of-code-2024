import day6 from "./day6";

describe("Day 6", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput =
            "....#.....\n" +
            ".........#\n" +
            "..........\n" +
            "..#.......\n" +
            ".......#..\n" +
            "..........\n" +
            ".#..^.....\n" +
            "........#.\n" +
            "#.........\n" +
            "......#...";

        const solution = day6.part1(exampleInput);
        expect(solution).toEqual(41);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput =
            "....#.....\n" +
            ".........#\n" +
            "..........\n" +
            "..#.......\n" +
            ".......#..\n" +
            "..........\n" +
            ".#..^.....\n" +
            "........#.\n" +
            "#.........\n" +
            "......#...";

        const solution = day6.part2(exampleInput);
        expect(solution).toEqual(6);
    });
});
