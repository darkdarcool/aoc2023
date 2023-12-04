type Grab = {
  color: "red" | "green" | "blue";
  count: number;
}

interface Game {
  game: number;
  grabs: Grab[];

}

export function parseInputLine(line: string): Game {
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  const game = parseInt(line.split(":")[0].split(" ")[1]);
  const grabs = line.split(":")[1].split(";").map((grab) => {
    const color = grab.split(" ")[2].replace(",", "");
    const count = parseInt(grab.split(" ")[1]);
    return { color, count } as Grab;
  });

  return {
    game,
    grabs
  }
}