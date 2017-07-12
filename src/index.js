/* eslint-disable no-bitwise, no-param-reassign */
const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const STRAIGHT_FLUSH = 'straight-flush';
const FOUR_OF_A_KIND = 'four-of-a-kind';
const FULL_HOUSE = 'full house';
const FLUSH = 'flush';
const STRAIGHT = 'straight';
const THREE_OF_A_KIND = 'three-of-a-kind';
const TWO_PAIR = 'two pair';
const PAIR = 'pair';
const NOTHING = 'nothing';

const getCardChar = card => card.substr(0, card.length - 1);
const getCardRank = card => ranks.indexOf(getCardChar(card));

function hasStraight(cards) {
  if (!cards || cards.length < 5) return false;
  let cardChars = cards.map(card => getCardChar(card));
  cardChars = cardChars.filter((v, i) => !~cardChars.indexOf(v, i + 1));
  const cardRanks = cardChars.map(val => ranks.indexOf(val));

  let a = [];
  for (let i = 1; i < cardRanks.length; i += 1) {
    if ((cardRanks[i - 1] + 1) === cardRanks[i]) {
      if (a.length === 0) a.push(cardChars[i - 1]);
      a.push(cardChars[i]);
    } else {
      a = [];
    }
    if (a.length === 5) return a;
  }
  return false;
}

function getAllSuits(cards) {
  return Object.values(
    cards.reduce((obj, card) => {
      if (!obj[card.substr(-1)]) obj[card.substr(-1)] = [];
      obj[card.substr(-1)].push(card);
      return obj;
    }, {})
  );
}

function getAllPairs(cards) {
  return Object.values(
    cards.reduce((obj, card) => {
      const cardChar = getCardChar(card);
      if (!obj[cardChar]) obj[cardChar] = [];
      obj[cardChar].push(card);
      return obj;
    }, {})
  )
  .sort((a, b) => getCardRank(a[0]) - getCardRank(b[0]))
  .sort((a, b) => b.length - a.length);
}

function getPairRanks(cards, pairs, num = 1) {
  const subtract = num === 1 && pairs[0].length > 2 ? 5 - pairs[0].length : (5 - (num * 2));
  let p = pairs.slice(0, num).map(v => getCardChar(v[0]));
  if (num === 2) {
    p = p.sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b));
  }
  const c = cards.map(v => getCardChar(v)).filter(v => !~p.indexOf(v));
  return [...p, ...c.slice(0, subtract)];
}

function getHandType(totalSuits, straight, totalPairs) {
  const sPairs = totalPairs.slice().sort((a, b) => b.length - a.length);
  if (totalSuits.length > 0) return (hasStraight(totalSuits[0])) ? STRAIGHT_FLUSH : FLUSH;
  if (straight) return STRAIGHT;
  if (totalPairs.length >= 1) {
    if (totalPairs.length === 1) {
      if (totalPairs[0].length === 2) return PAIR;
      else if (totalPairs[0].length === 3) return THREE_OF_A_KIND;
    }
    if (sPairs[0].length === 4) return FOUR_OF_A_KIND;
    if (sPairs[0].length === 2) return TWO_PAIR;
    return FULL_HOUSE;
  }
  return NOTHING;
}

function hand(holeCards, communityCards) {
  const sortedCards = []
    .concat(holeCards, communityCards)
    .sort((a, b) => getCardRank(a) - getCardRank(b));
  const totalSuits = getAllSuits(sortedCards).filter(a => a.length > 4);
  const totalPairs = getAllPairs(sortedCards).filter(a => a.length > 1);
  const straight = hasStraight(sortedCards);

  switch (getHandType(totalSuits, straight, totalPairs)) {
    case STRAIGHT_FLUSH:
      return { type: STRAIGHT_FLUSH, ranks: hasStraight(totalSuits[0]) };
    case FOUR_OF_A_KIND:
      return { type: FOUR_OF_A_KIND, ranks: getPairRanks(sortedCards, totalPairs).slice(0, 2) };
    case FULL_HOUSE:
      return { type: FULL_HOUSE, ranks: [getCardChar(totalPairs[0][0]), getCardChar(totalPairs[1][0])] };
    case FLUSH:
      return { type: FLUSH, ranks: totalSuits[0].map(c => getCardChar(c)).slice(0, 5) };
    case STRAIGHT:
      return { type: STRAIGHT, ranks: straight };
    case THREE_OF_A_KIND:
      return { type: THREE_OF_A_KIND, ranks: getPairRanks(sortedCards, totalPairs) };
    case TWO_PAIR:
      return { type: TWO_PAIR, ranks: getPairRanks(sortedCards, totalPairs, 2) };
    case PAIR:
      return { type: PAIR, ranks: getPairRanks(sortedCards, totalPairs) };
    default:
      return { type: NOTHING, ranks: sortedCards.slice(0, 5).map(c => getCardChar(c)) };
  }
}

export default hand;
