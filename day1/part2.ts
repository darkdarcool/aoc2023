const stringNumberRegex = /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g;
const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
]

export function part2(input: string[]): number {
  // iterate over the input
  const values = [];
  for (const line of input) {
    // we only need the numbers in the line use the regex to split the string
    // into an array of numbers
    const nums = [...line.matchAll(stringNumberRegex)]
      .map((match) => {
        // if is number
        if (!isNaN(parseInt(match[1]))) {
          return parseInt(match[1]);
        } else {
          // if is word
          return digits.indexOf(match[1]) + 1;
        }
      });
    const first = nums[0];
    const last = nums[nums.length - 1];

    values.push(parseInt(`${first}${last}`));
  }
  // This isn't even needed (I can do it all in the loop above), but I'm lazy
  // sum the values
  let sum = 0;
  for (const value of values) {
    sum += value;
  }
  return sum;
}