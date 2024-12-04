import day4 from "./day4";

describe("Day 4", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput =
            "MMMSXXMASM\n" +
            "MSAMXMSMSA\n" +
            "AMXSXMAAMM\n" +
            "MSAMASMSMX\n" +
            "XMASAMXAMM\n" +
            "XXAMMXXAMA\n" +
            "SMSMSASXSS\n" +
            "SAXAMASAAA\n" +
            "MAMMMXMMMM\n" +
            "MXMXAXMASX\n";

        const solution = day4.part1(exampleInput);
        expect(solution).toEqual(18);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput =
            ".M.S......\n" +
            "..A..MSMS.\n" +
            ".M.S.MAA..\n" +
            "..A.ASMSM.\n" +
            ".M.S.M....\n" +
            "..........\n" +
            "S.S.S.S.S.\n" +
            ".A.A.A.A..\n" +
            "M.M.M.M.M.\n" +
            "..........";

        const solution = day4.part2(exampleInput);
        expect(solution).toEqual(9);
    });
});
