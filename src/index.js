/* eslint-disable no-console, no-restricted-syntax, no-bitwise, no-param-reassign */
const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

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

function hand(holeCards, communityCards) {
  const sortedCards = []
    .concat(holeCards, communityCards)
    .sort((a, b) => getCardRank(a) - getCardRank(b));
  const totalSuits = getAllSuits(sortedCards).filter(a => a.length > 4);
  const totalPairs = getAllPairs(sortedCards).filter(a => a.length > 1);
  const straight = hasStraight(sortedCards);

  if (totalSuits.length > 0) {
    const straightFlush = hasStraight(totalSuits[0]);
    if (straightFlush) return { type: 'straight-flush', ranks: straightFlush.slice(0, 5) };
    return { type: 'flush', ranks: totalSuits[0].map(c => getCardChar(c)).slice(0, 5) };
  }
  if (straight) return { type: 'straight', ranks: straight };
  if (totalPairs.length >= 1) {
    const sPairs = totalPairs.slice().sort((a, b) => b.length - a.length);
    if (totalPairs.length === 1) {
      if (totalPairs[0].length === 2) return { type: 'pair', ranks: getPairRanks(sortedCards, totalPairs) };
      else if (totalPairs[0].length === 3) return { type: 'three-of-a-kind', ranks: getPairRanks(sortedCards, totalPairs) };
    }
    if (sPairs[0].length === 4) return { type: 'four-of-a-kind', ranks: getPairRanks(sortedCards, totalPairs).slice(0, 2) };
    if (sPairs[0].length === 2) return { type: 'two pair', ranks: getPairRanks(sortedCards, totalPairs, 2) };
    return { type: 'full house', ranks: [getCardChar(totalPairs[0][0]), getCardChar(totalPairs[1][0])] };
  }
  return { type: 'nothing', ranks: sortedCards.slice(0, 5).map(c => getCardChar(c)) };
}

export default hand;
