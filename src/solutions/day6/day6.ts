import { SolutionScript } from "../../main";

const day6: SolutionScript = {
    day: 6,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

type Coordinate = { row: number, col: number };

const Direction = {
    UP: { row: -1, col: 0, marker: "^" },
    DOWN: { row: 1, col: 0, marker: "v" },
    LEFT: { row: 0, col: -1, marker: "<" },
    RIGHT: { row: 0, col: 1, marker: ">" }
};

type Guard = { position: Coordinate, direction: Coordinate & { marker: string } };

function prepareInput(rawInput: string): { map: string[][], guard: Guard } {
    const map = rawInput
        .split(/\n/)
        .filter(row => row.length > 0)
        .map(row => row.split(""));

    const guard = map
        .reduce((guard, row, rowIndex) => {
            if (guard) return guard;
            const colIndex = row.indexOf("^");
            return colIndex !== -1 ? {position: {row: rowIndex, col: colIndex}, direction: Direction.UP} : null;
        }, null as Guard | null) as Guard;

    return {map, guard};
}

function visit(map: string[][], guard: Guard): {map: string[][], exit: "EXITED_MAP" | "LOOPING"} {
    const visitedMap = map.map(row => row.map(cell => cell));
    const currentGuard = {position: guard.position, direction: guard.direction};
    while (true) {
        const nextPosition = {
            row: currentGuard.position.row + currentGuard.direction.row,
            col: currentGuard.position.col + currentGuard.direction.col
        };
        if (nextPosition.row < 0 || nextPosition.row >= map.length || nextPosition.col < 0 || nextPosition.col >= map[0].length) {
            return {map: visitedMap, exit: "EXITED_MAP"};
        }
        if (map[nextPosition.row][nextPosition.col] === "#") {
            currentGuard.direction = currentGuard.direction === Direction.UP ? Direction.RIGHT
                : currentGuard.direction === Direction.RIGHT ? Direction.DOWN
                    : currentGuard.direction === Direction.DOWN ? Direction.LEFT
                        : Direction.UP;
        } else if (currentGuard.direction.marker === visitedMap[nextPosition.row][nextPosition.col]) {
            return {map: visitedMap, exit: "LOOPING"};
        } else {
            currentGuard.position = nextPosition;
            visitedMap[currentGuard.position.row][currentGuard.position.col] = currentGuard.direction.marker;
        }
    }
}

function part1({map, guard}: { map: string[][], guard: Guard }): number {
    return visit(map, guard)
        .map
        .flat()
        .filter(cell => [Direction.UP.marker, Direction.DOWN.marker, Direction.LEFT.marker, Direction.RIGHT.marker].includes(cell))
        .length;
}

function part2({map, guard}: { map: string[][], guard: Guard }): number {
    const visitedCells = visit(map, guard).map
        .map((row, rowIndex) => row.map((cell, colIndex) => ({row: rowIndex, col: colIndex, cell})))
        .flat()
        .filter(cell => [Direction.UP.marker, Direction.DOWN.marker, Direction.LEFT.marker, Direction.RIGHT.marker].includes(cell.cell));

    return visitedCells
        .reduce((count, visitedCell) => {
            const newMap = map.map(row => row.map(cell => cell));
            newMap[visitedCell.row][visitedCell.col] = "#";
            return visit(newMap, guard).exit === "LOOPING" ? count + 1 : count;
        }, 0);
}

export default day6;
