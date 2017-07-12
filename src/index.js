/* eslint-disable no-console */

function hand(holeCards, communityCards) {
  const r = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  const hands = ['straight-flush', 'four-of-a-kind', 'full house', 'flush', 'straight', 'three-of-a-kind', 'two pair', 'pair'];
  console.log(holeCards, communityCards);
  console.log(r, hands);
  return { type: 'TODO', ranks: [] };
}

export default hand;
