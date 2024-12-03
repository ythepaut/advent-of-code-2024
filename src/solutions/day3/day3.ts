import { SolutionScript } from "../../main";

const day3: SolutionScript = {
    day: 3,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

function prepareInput(rawInput: string): string {
    return rawInput
        .replaceAll(/\n/g, "");
}

function part1(program: string): number {
    return Array.from(program.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g))
        .map(match => match.slice(1, 3).map(Number))
        .reduce((sum, [a, b]) => sum + a * b, 0);
}

function part2(program: string): number {
    return Array.from(program
        .replaceAll(/don't\(\).*?(?:do\(\)|$)/g, "")
        .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g))
        .map(match => match.slice(1, 3).map(Number))
        .reduce((sum, [a, b]) => sum + a * b, 0);
}

export default day3;
