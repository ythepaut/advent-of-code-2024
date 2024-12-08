import day8 from "./day8";

describe("Day 8", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput =
            "............\n" +
            "........0...\n" +
            ".....0......\n" +
            ".......0....\n" +
            "....0.......\n" +
            "......A.....\n" +
            "............\n" +
            "............\n" +
            "........A...\n" +
            ".........A..\n" +
            "............\n" +
            "............";

        const solution = day8.part1(exampleInput);
        expect(solution).toEqual(14);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput =
            "............\n" +
            "........0...\n" +
            ".....0......\n" +
            ".......0....\n" +
            "....0.......\n" +
            "......A.....\n" +
            "............\n" +
            "............\n" +
            "........A...\n" +
            ".........A..\n" +
            "............\n" +
            "............";

        const solution = day8.part2(exampleInput);
        expect(solution).toEqual(34);
    });
});
