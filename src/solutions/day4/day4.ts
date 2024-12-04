import { SolutionScript } from "../../main";

const day4: SolutionScript = {
    day: 4,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

function prepareInput(rawInput: string): string[][] {
    return rawInput
        .split(/\n/)
        .filter(row => row.length > 0)
        .map(row => row.split(""));
}

interface Position {
    row: number;
    col: number;
}

interface SearchState {
    position: Position;
    direction: Direction | null;
    remaining: string[];
}

type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

function getNeighbours(matrix: string[][], row: number, col: number): (string | null)[] {
    const maxRow = matrix.length - 1;
    const maxCol = matrix[0].length - 1;
    return [
        row > 0 && col > 0 ? matrix[row - 1][col - 1] : null,
        row > 0 ?  matrix[row - 1][col] : null,
        row > 0 && col < maxCol ? matrix[row - 1][col + 1] : null,
        col > 0 ? matrix[row][col - 1] : null,
        col < maxCol ? matrix[row][col + 1] : null,
        row < maxRow && col > 0 ? matrix[row + 1][col - 1] : null,
        row < maxRow ? matrix[row + 1][col] : null,
        row < maxRow && col < maxRow ? matrix[row + 1][col + 1] : null,
    ];
}

function getNewPosition(position: Position, direction: Direction): Position {
    switch (direction) {
        case 0: return { row: position.row - 1, col: position.col - 1 };
        case 1: return { row: position.row - 1, col: position.col };
        case 2: return { row: position.row - 1, col: position.col + 1 };
        case 3: return { row: position.row, col: position.col - 1 };
        case 4: return { row: position.row, col: position.col + 1 };
        case 5: return { row: position.row + 1, col: position.col - 1 };
        case 6: return { row: position.row + 1, col: position.col };
        case 7: return { row: position.row + 1, col: position.col + 1 };
    }
}

function search(matrix: string[][], state: SearchState): number {
    if (state.remaining.length === 0) {
        return 1;
    }
    if (state.direction === null) {
        // no direction yet, explore all neighbours
        return getNeighbours(matrix, state.position.row, state.position.col)
            .map((neighbour, direction) => {
                if (neighbour !== state.remaining[0]) return 0; // abandon search in this direction
                // continue search in same direction
                return search(matrix, {
                    position: getNewPosition(state.position, direction as Direction),
                    direction: direction as Direction,
                    remaining: state.remaining.slice(1),
                });
            })
            .reduce((sum, current) => sum + current, 0);
    } else if (getNeighbours(matrix, state.position.row, state.position.col)[state.direction] === state.remaining[0]) {
        // continue in the same direction
        return search(matrix, {
            position: getNewPosition(state.position, state.direction),
            direction: state.direction,
            remaining: state.remaining.slice(1),
        });
    }
    // abandon search in this direction
    return 0;
}

function part1(matrix: string[][]): number {
    const searchWord = "XMAS";
    return matrix
        .map((row, i) => row
            .map((letter, j) => {
                if (letter !== searchWord[0]) return 0;
                return search(matrix, {
                    position: { row: i, col: j },
                    direction: null,
                    remaining: searchWord.split("").slice(1),
                });
            }))
        .flat()
        .reduce((sum, current) => sum + current, 0);
}

function part2(matrix: string[][]): number {
    return matrix
        .slice(1, -1)
        .map((row, i) => row
            .slice(1, -1)
            .map((letter, j): number => {
                // 🤮
                if (
                    letter === "A" &&
                    matrix[i][j] === "M" &&
                    matrix[i + 2][j] === "M" &&
                    matrix[i][j + 2] === "S" &&
                    matrix[i + 2][j + 2] === "S"
                ) return 1;
                if (
                    letter === "A" &&
                    matrix[i][j] === "M" &&
                    matrix[i + 2][j] === "S" &&
                    matrix[i][j + 2] === "M" &&
                    matrix[i + 2][j + 2] === "S"
                ) return 1;
                if (
                    letter === "A" &&
                    matrix[i][j] === "S" &&
                    matrix[i + 2][j] === "S" &&
                    matrix[i][j + 2] === "M" &&
                    matrix[i + 2][j + 2] === "M"
                ) return 1;
                if (
                    letter === "A" &&
                    matrix[i][j] === "S" &&
                    matrix[i + 2][j] === "M" &&
                    matrix[i][j + 2] === "S" &&
                    matrix[i + 2][j + 2] === "M"
                ) return 1;
                return 0;
            })
        )
        .flat()
        .reduce((sum, current) => sum + current, 0);
}

export default day4;
