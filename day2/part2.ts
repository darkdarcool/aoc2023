export function part2(input: string[]): number {
  let sum = 0;

  for (const [index, game] of input.entries()) {

    const grabs = game.split(": ")[1].split('; ');
    const bag = { red: 0, green: 0, blue: 0 };

    for (const grab of grabs) {
      const cubes = grab.split(', ');

      for (const cube of cubes) {
        // @ts-ignore wow
        const [count, color]: [string, keyof typeof bag] = cube.split(' ');
        if (bag[color] < parseInt(count)) {
          bag[color] = parseInt(count);
        }
      }
    }

    sum += Object.values(bag).reduce((acc, c) =>  acc * c, 1)
  }

  return sum;
}