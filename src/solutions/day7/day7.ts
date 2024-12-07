import { SolutionScript } from "../../main";

const day7: SolutionScript = {
    day: 7,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

interface Equation {
    result: number;
    factors: number[];
}

function prepareInput(rawInput: string): Equation[] {
    return rawInput
        .split(/\n/)
        .filter(row => row.length > 0)
        .map(equation => equation.split(": "))
        .map(([result, factors]) => ({
            result: Number(result),
            factors: factors.split(" ").map(Number)
        }));
}

type Operation = "+" | "*" | "|";

function product(operations: Operation[], length: number): Operation[][] {
    if (length === 0) return [[]];
    return product(operations, length - 1)
        .flatMap(combination => operations.map((operation) => [...combination, operation]));
}

function evaluate(equation: Equation, operations: Operation[]): boolean {
    return equation.factors
        .reduce((result, factor, index) => {
            if (index === 0) return factor;
            const operation = operations[index - 1];
            if (operation === "+") return result + factor;
            if (operation === "*") return result * factor;
            if (operation === "|") return Number(`${result}${factor}`);
            return result;
        }, 0) === equation.result;
}

function part1(equations: Equation[]): number {
    return equations.reduce((sum, equation) => {
        return product(["+", "*"], equation.factors.length - 1)
            .some(operations => evaluate(equation, operations)) ? sum + equation.result : sum;
    }, 0);
}

function part2(equations: Equation[]): number {
    return equations.reduce((sum, equation) => {
        return product(["+", "*", "|"], equation.factors.length - 1)
            .some(operations => evaluate(equation, operations)) ? sum + equation.result : sum;
    }, 0);
}

export default day7;
