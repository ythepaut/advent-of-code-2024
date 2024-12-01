import { SolutionScript } from "../../main";

const day1: SolutionScript = {
    day: 1,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

function prepareInput(rawInput: string): number[][] {
    const inputMatrix = rawInput
        .split(/\n/)
        .filter(row => row.length > 0)
        .map(row => row.split(/\s+/))
        .map(row => row.map(Number));

    // transpose matrix
    return Array.from({ length: inputMatrix[0].length }, (_, colIndex) => inputMatrix.map(row => row[colIndex]));
}

function part1(locationIDs: number[][]): number {
    const sortedLocationIDs = locationIDs.map(row => row.sort());
    return sortedLocationIDs[0]
        .map((leftLocationID, index) => Math.abs(leftLocationID - sortedLocationIDs[1][index]))
        .reduce((sum, diff) => sum + diff, 0);
}

function part2(locationIDs: number[][]): number {
    return locationIDs[0]
        .map(leftLocationID => leftLocationID * locationIDs[1].filter(rightLocationID => rightLocationID === leftLocationID).length)
        .reduce((sum, similarityScore) => sum + similarityScore, 0);
}

export default day1;
