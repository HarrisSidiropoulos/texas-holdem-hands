/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import hand from './index';

describe('checkWord', () => {
  describe('Some simple test', () => {
    describe('straight-flush', () => {
      it('should return "straight-flush"', () => {
        const holeCards = ['2♠', 'K♠'];
        const communityCards = ['J♠', '9♠', '10♠', 'Q♠', '3♥'];
        const result = { type: 'straight-flush', ranks: ['K', 'Q', 'J', '10', '9'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('four-of-a-kind', () => {
      it('should return "four-of-a-kind"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', 'A♣', 'A♥', '2♥', '3♦'];
        const result = { type: 'four-of-a-kind', ranks: ['A', 'J'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
      it('should return "four-of-a-kind"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', 'A♣', 'A♥', '2♥', '2♦'];
        const result = { type: 'four-of-a-kind', ranks: ['A', 'J'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('full house', () => {
      it('should return "full house"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', 'J♥', 'A♥', '2♥', '3♦'];
        const result = { type: 'full house', ranks: ['A', 'J'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
      it('should return "full house"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', 'J♥', 'A♥', '2♥', '2♦'];
        const result = { type: 'full house', ranks: ['A', 'J'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('flush', () => {
      it('should return "flush"', () => {
        const holeCards = ['A♠', 'K♦'];
        const communityCards = ['J♥', '5♥', '10♥', 'Q♥', '3♥'];
        const result = { type: 'flush', ranks: ['Q', 'J', '10', '5', '3'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('straight', () => {
      it('should return "straight"', () => {
        const holeCards = ['A♠', 'K♦'];
        const communityCards = ['J♥', '9♠', '10♥', 'Q♥', '3♥'];
        const result = { type: 'straight', ranks: ['A', 'K', 'Q', 'J', '10'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
      it('should return "straight"', () => {
        const holeCards = ['A♠', 'K♦'];
        const communityCards = ['J♥', '3♠', '10♥', 'Q♥', '3♥'];
        const result = { type: 'straight', ranks: ['A', 'K', 'Q', 'J', '10'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
      it('should return "straight"', () => {
        const holeCards = ['A♠', 'K♦'];
        const communityCards = ['J♥', 'Q♠', '10♥', 'Q♥', 'Q♣'];
        const result = { type: 'straight', ranks: ['A', 'K', 'Q', 'J', '10'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('three-of-a-kind', () => {
      it('should return "three-of-a-kind"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', '10♥', 'A♥', '2♥', '3♦'];
        const result = { type: 'three-of-a-kind', ranks: ['A', 'J', '10'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('two pair', () => {
      it('should return "two pair"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', 'J♥', '10♥', '2♥', '3♦'];
        const result = { type: 'two pair', ranks: ['A', 'J', '10'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
      it('should return "two pair"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', 'J♥', '10♥', '2♥', '2♦'];
        const result = { type: 'two pair', ranks: ['A', 'J', '10'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('single pair', () => {
      it('should return "pair"', () => {
        const holeCards = ['A♠', 'A♦'];
        const communityCards = ['J♣', '5♥', '10♥', '2♥', '3♦'];
        const result = { type: 'pair', ranks: ['A', 'J', '10', '5'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
    describe('nothing', () => {
      it('should return "nothing"', () => {
        const holeCards = ['A♠', '6♦'];
        const communityCards = ['J♣', '5♥', '10♥', '2♥', '3♦'];
        const result = { type: 'nothing', ranks: ['A', 'J', '10', '6', '5'] };
        expect(hand(holeCards, communityCards).type).to.be.eql(result.type);
        expect(hand(holeCards, communityCards).ranks).to.be.eql(result.ranks);
      });
    });
  });
});
