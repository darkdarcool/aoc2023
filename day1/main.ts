import { getInput, test } from "../shared/utils.ts";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const input = getInput(1);

console.log("Day 1");

const result1 = test(1, () => part1(input));
console.log(result1);

const result2 = test(2, () => part2(input));
console.log(result2);