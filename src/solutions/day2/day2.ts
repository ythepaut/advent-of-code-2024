import { SolutionScript } from "../../main";

const day2: SolutionScript = {
    day: 2,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

function prepareInput(rawInput: string): number[][] {
    return rawInput
        .split(/\n/)
        .filter(row => row.length > 0)
        .map(row => row.split(/\s+/))
        .map(row => row.map(Number));
}

function isReportSafe(report: number[]): boolean {
    const diffs = report
        .slice(1)
        .map((value, index) => value - report[index]);
    return diffs.every(diff => diff > 0 && diff <= 3) || diffs.every(diff => diff < 0 && diff >= -3);
}

function part1(reports: number[][]): number {
    return reports
        .filter(isReportSafe)
        .length;
}

function part2(reports: number[][]): number {
    return reports
        .reduce((count, report) => {
            for (let i = 0; i < report.length; ++i)
                if (isReportSafe([...report.slice(0, i), ...report.slice(i + 1)]))
                    return count + 1;
            return count;
        }, 0);
}

export default day2;
