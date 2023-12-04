interface Card {
  num: number;
  winning: number[];
  given: number[];
}

function parseCard(card: string) {
  // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  const cardNum = parseInt(card.split(':')[0].split(' ')[1]);
  const cardWinning = card.split(':')[1].split('|')[0].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
  const cardGiven = card.split(':')[1].split('|')[1].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
  return {
    num: cardNum,
    winning: cardWinning,
    given: cardGiven
  }
}

function calculateScore(wins: number[]) {
  if (wins.length == 0) {
    return 0;
  }

  const length = wins.length;
  const score = Math.pow(2, length - 1);

  return score;
}

export function part1(input: string[]): number {
  let score = 0;
  for (const line of input) {
    const wins = [];
    const card = parseCard(line);
    for (const winning of card.winning) {
      if (card.given.includes(winning)) {
        wins.push(winning);
      }
    }
    score += calculateScore(wins);
  }
  return score;
}