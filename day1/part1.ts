export function part1(input: string[]): number {
  // iterate over the input
  const values = [];
  for (const line of input) {
    // we only need the numbers in the line
    const nums = line.split("").filter((char) => !isNaN(parseInt(char)));

    // this works even if there is only one number
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