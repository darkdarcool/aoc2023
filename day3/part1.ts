
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
    if (isNaN(parseInt(char)) && char !== '.' || char == "#") {
      symbols.push({
        index,
        char
      });
    }
  }

  return symbols;
}

export function part1(input: string[]): number {
  let i = 0;
  let nums = []
  for (const line of input) {
    const parsedLine = parseInputLine(line);
    // get the NEXT line
    let nextLine = input[i + 1];
    let prevLine = input[i - 1];
    if (nextLine == undefined) {
      nextLine = "";
    }
    if (prevLine == undefined) {
      prevLine = "";
    }
    const parsedNextLine = parseSymbolLine(nextLine);
    const parsedCurrentLine = parseSymbolLine(line);
    const parsedPrevLine = parseSymbolLine(prevLine);

    for (const occurance of parsedLine) {
      // let's only use between for all of the lines
      let symFound = false;
      for (const symbol of parsedNextLine) {
        
        if (between(symbol.index, occurance.startsAt - 1, occurance.endsAt)) {
          nums.push(occurance.num);
          symFound = true;
        }
      }

      if (symFound) continue;

      for (const symbol of parsedPrevLine) {
        if (between(symbol.index, occurance.startsAt - 1, occurance.endsAt)) {
          nums.push(occurance.num);
          symFound = true;
        }
      }

      if (symFound) continue;

      for (const symbol of parsedCurrentLine) {
        if (between(symbol.index, occurance.startsAt - 1, occurance.endsAt)) {
          nums.push(occurance.num);
          symFound = true;
        }
      }
    }
    i++;
  }
  // sum of nums
  return nums.reduce((a, b) => a + b, 0);
}