const rules = {
  red: 12,
  green: 13,
  blue: 14
}

export function part1(input: string[]): number {
  let sum = 0;

  for (const [index, game] of input.entries()) {
    let isOk = true;

    const grabs = game.split(": ")[1].split('; ');

    for (const grab of grabs) {
      const cubes = grab.split(', ');

      for (const cube of cubes) {
        const [count, color] = cube.split(' ');
        // @ts-ignore e
        if (count > rules[color]) {
          isOk = false;
          break;
        }
      }
    }

    if (isOk) {
      sum += (index + 1);
    }
  }

  return sum;
}