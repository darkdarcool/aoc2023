interface Card {
  num: number;
  winning: number[];
  given: number[];
}

function parseCard(card: string) {
  const cardNum = parseInt(card.split(':')[0].split(' ')[1]);
  const cardWinning = card.split(':')[1].split('|')[0].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
  const cardGiven = card.split(':')[1].split('|')[1].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
  return {
    num: cardNum,
    winning: cardWinning,
    given: cardGiven
  }
}

function getWinning(card: Card): number[] {
  const wins = [];
  for (const winning of card.winning) {
    if (card.given.includes(winning)) {
      wins.push(winning);
    }
  }
  return wins;
}

export function part2(input: string[]): number {
  let result = 0;
  const cards = Array(input.length).fill(1);

  for (let i = 0; i < input.length; i++) {
    const card = parseCard(input[i]);
    const won = getWinning(card);

    for (let j = i + 1; j <= i + won.length; j++) {
      cards[j] += cards[i];
    }
  }
  result = cards.reduce((a, b) => a + b, 0);
  return result;
}