import { SolutionScript } from "../../main";

const day8: SolutionScript = {
    day: 8,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

function prepareInput(rawInput: string): string[][] {
    return rawInput.split(/\n/)
        .filter(row => row.length > 0)
        .map(row => row.split(""));
}

type Coordinate = { row: number, col: number };

interface AntennasByFrequency {
    [frequency: string]: Coordinate[];
}

function getAntennasFreq(map: string[][]): AntennasByFrequency {
    return map
        .flat()
        .reduce((antennas, frequency, index) => {
            if (frequency === ".") return antennas;
            if (!antennas[frequency]) antennas[frequency] = [];
            antennas[frequency].push({
                row: Math.floor(index / map[0].length),
                col: index % map[0].length
            });
            return antennas;
        }, {} as AntennasByFrequency);
}

function part1(map: string[][]): number {
    const antinodes: Coordinate[] = Object.values(getAntennasFreq(map)).flatMap((antennas) =>
        antennas.flatMap((antenna1) =>
            antennas.flatMap((antenna2) => {
                const dx = antenna2.col - antenna1.col;
                const dy = antenna2.row - antenna1.row;
                return dx === 0 && dy === 0
                    ? []
                    : [
                        { row: antenna1.row - dy, col: antenna1.col - dx },
                        { row: antenna2.row + dy, col: antenna2.col + dx },
                    ];
            })
        )
    );

    return antinodes
        .filter(({ row, col }) => row >= 0 && row < map.length && col >= 0 && col < map[0].length)
        .filter((antinode, index, antinodes) => antinodes
            .findIndex(antinode2 => antinode2.row === antinode.row && antinode2.col === antinode.col) === index
        )
        .length;
}

function part2(map: string[][]): number {
    const antinodes: Coordinate[] = Object.values(getAntennasFreq(map)).flatMap((antennas) =>
        antennas.flatMap((antenna1) =>
            antennas.flatMap((antenna2) => {
                const dx = antenna2.col - antenna1.col;
                const dy = antenna2.row - antenna1.row;
                if (dx === 0 && dy === 0) return [{ row: antenna1.row, col: antenna1.col }];

                const antinodes: Coordinate[] = [];

                let antinode = { row: antenna1.row - dy, col: antenna1.col - dx };
                while (antinode.row >= 0 && antinode.row < map.length && antinode.col >= 0 && antinode.col < map[0].length) {
                    antinodes.push({...antinode});
                    antinode = { row: antinode.row - dy, col: antinode.col - dx };
                }
                antinode = { row: antenna2.row + dy, col: antenna2.col + dx };
                while (antinode.row >= 0 && antinode.row < map.length && antinode.col >= 0 && antinode.col < map[0].length) {
                    antinodes.push({...antinode});
                    antinode = { row: antinode.row + dy, col: antinode.col + dx };
                }
                return antinodes;
            })
        )
    );

    return antinodes
        .filter((antinode, index, antinodes) => antinodes
            .findIndex(antinode2 => antinode2.row === antinode.row && antinode2.col === antinode.col) === index
        )
        .length;
}

export default day8;
