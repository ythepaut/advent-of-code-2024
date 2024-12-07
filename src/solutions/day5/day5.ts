import { SolutionScript } from "../../main";

const day5: SolutionScript = {
    day: 5,
    part1: (rawInput) => part1(prepareInput(rawInput)),
    part2: (rawInput) => part2(prepareInput(rawInput)),
};

interface Rule {
    predecessor: number;
    page: number;
}

function prepareInput(rawInput: string): { rules: Rule[], orders: number[][] } {
    const [rawRules, rawOrders] = rawInput.split("\n\n");

    const rules: Rule[] = rawRules
        .split("\n")
        .map(rule => rule
            .split("|")
            .map(Number)
        )
        .map(([predecessor, page]) => ({ predecessor, page }));

    const orders: number[][] = rawOrders
        .split("\n")
        .filter(order => order.length > 0)
        .map(printOrder => printOrder
            .split(",")
            .map(Number)
        );
    return {rules, orders};
}

function canBePrinted(page: number, order: number[], rules: Rule[]): boolean {
    return rules
        .filter(rule => rule.page === page && order.includes(rule.predecessor))
        .every(rule => order.indexOf(rule.predecessor) < order.indexOf(page));
}

function part1({rules, orders}: { rules: Rule[], orders: number[][] }): number {
    return orders
        .filter(order => order.every(page => canBePrinted(page, order, rules)))
        .map(order => order[order.length >> 1]) // get middle page
        .reduce((sum, page) => sum + page, 0);
}

function reorder(order: number[], rules: Rule[]): number[] {
    return order.reduce((result, current) => {
        const index = result.findIndex((_, i) =>
            canBePrinted(current, result.slice(i), rules)
        );
        return index === -1
            ? [...result, current]
            : [...result.slice(0, index), current, ...result.slice(index)];
    }, [] as number[]);
}

function part2({rules, orders}: { rules: Rule[], orders: number[][] }): number {
    return orders
        .filter(order => !order.every(page => canBePrinted(page, order, rules)))
        .map(order => reorder(order, rules))
        .map(order => order[order.length >> 1]) // get middle page
        .reduce((sum, page) => sum + page, 0);
}

export default day5;
