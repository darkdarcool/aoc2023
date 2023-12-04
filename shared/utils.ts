export function readInput(day: number): string {
  return Deno.readTextFileSync('./input/day' + day + '.txt')
}

export function readTestInput(day: number): string {
  return Deno.readTextFileSync('./input/day' + day + 'test.txt')
}

export function cleanString(input: string): string {
  return input.replaceAll('\r', '');
}

export function splitStringByNewline(input: string): string[] {
  return input.split('\n')
}

export function getInput(day: number): string[] {
  return splitStringByNewline(cleanString(readInput(day)))
}

export function getTestInput(day: number): string[] {
  return splitStringByNewline(cleanString(readTestInput(day)))
}

export function test<T>(part: number, fn: () => T): T {
  const now = performance.now();
  const ret = fn();
  console.log(`Part ${part} took ${performance.now() - now}ms`);
  return ret;
}