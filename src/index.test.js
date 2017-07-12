/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import hand from './index';

describe('checkWord', () => {
  describe('Some simple test', () => {
    it('should return {type: "pair", ranks: ["A", "J", "10", "5"]}', () => {
      const holeCards = ['A♠', 'A♦'];
      const communityCards = ['J♣', '5♥', '10♥', '2♥', '3♦'];
      const result = { type: 'pair', ranks: ['A', 'J', '10', '5'] };
      expect(hand(holeCards, communityCards)).to.be.eql(result);
    });
    it('should return {type: "flush", ranks: ["Q", "J", "10", "5", "3"]}', () => {
      const holeCards = ['A♠', 'K♦'];
      const communityCards = ['J♥', '5♥', '10♥', 'Q♥', '3♥'];
      const result = { type: 'pair', ranks: ['A', 'J', '10', '5'] };
      expect(hand(holeCards, communityCards)).to.be.eql(result);
    });
  });
});
