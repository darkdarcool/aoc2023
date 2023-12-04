function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

interface Occurance {
  startsAt: number;
  endsAt: number;
  num: number;
}

function parseInputLine(line: string) {
  // enumerate the line
  const numOccurences: Occurance[] = [];
  let isInNum = false;
  for (const [index, char] of line.split('').entries()) {
    if (!isInNum) {
      if (!isNaN(parseInt(char))) {
        isInNum = true;
        numOccurences.push({
          startsAt: index,
          num: parseInt(char),
          endsAt: index // might only be 1 digit
        });
      }
    } else {
      if (isNaN(parseInt(char))) {
        isInNum = false;
        numOccurences[numOccurences.length - 1].endsAt = index;
      } else {
        numOccurences[numOccurences.length - 1].num = numOccurences[numOccurences.length - 1].num * 10 + parseInt(char);
      }
    }
  }
  return numOccurences;
}

function parseSymbolLine(line: string) {
  // essentially the same as parseInputLine, but with symbols (essentially anything excpet a period or number, plus they are always alone)
  const symbols: {
    index: number;
    char: string;
  }[] = [];

  for (const [index, char] of line.split('').entries()) {
    if (char == '*') {
      symbols.push({
        index,
        char
      });
    }
  }

  return symbols;
}

export function part2(input: string[]): number {
  let i = 0;
  const nums = [];
  for (const line of input) {
    const parsedLine = parseSymbolLine(line);

    const parsedPrevLine = parseInputLine(input[i - 1] ?? "");
    const parsedCurrentLine = parseInputLine(input[i]);
    const parsedNextLine = parseInputLine(input[i + 1] ?? "");

    for (const symbol of parsedLine) {
      let intersected = false;
      const inters = [];
      for (const prev of parsedPrevLine) {
        if (between(symbol.index, prev.startsAt - 1, prev.endsAt)) {
          intersected = true;
          inters.push(prev.num);
        }
      }

      for (const curr of parsedCurrentLine) {
        if (between(symbol.index, curr.startsAt - 1, curr.endsAt)) {
          intersected = true;
          inters.push(curr.num);
        }
      }

      for (const next of parsedNextLine) {
        if (between(symbol.index, next.startsAt - 1, next.endsAt)) {
          intersected = true;
          inters.push(next.num);
        }
      }

      if (intersected && inters.length > 1) {
        nums.push(inters.reduce((a, b) => a * b));
      }

    }
    i++;
  }
  return nums.reduce((a, b) => a + b);
}