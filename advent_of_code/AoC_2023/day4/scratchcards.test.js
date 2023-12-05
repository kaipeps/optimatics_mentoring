const {
  readTxtFile,
  extractCardData,
  getCards,
  getMatches,
  getCardValue,
  sumCardValues,
  initialiseDeck,
  processCards,
  countFinalDeck
} = require('./day4');

const testData = readTxtFile('day4/test_data.txt');

describe('day 4 part 1:', () => {
  test('test data conversion for one card', () => {
    expect(extractCardData(testData[0])).toEqual({
      cardID: 1,
      winningNums: [41, 48, 83, 86, 17],
      myNums: [83, 86, 6, 31, 17, 9, 48, 53]
    });
  });

  test('test data conversion for all cards', () => {
    expect(getCards(testData)).toEqual([{
      cardID: 1,
      winningNums: [41, 48, 83, 86, 17],
      myNums: [83, 86, 6, 31, 17, 9, 48, 53]
    }, {
      cardID: 2,
      winningNums: [13, 32, 20, 16, 61],
      myNums: [61, 30, 68, 82, 17, 32, 24, 19]
    }, {
      cardID: 3,
      winningNums: [1, 21, 53, 59, 44],
      myNums: [69, 82, 63, 72, 16, 21, 14, 1]
    }, {
      cardID: 4,
      winningNums: [41, 92, 73, 84, 69],
      myNums: [59, 84, 76, 51, 58, 5, 54, 83]
    }, {
      cardID: 5,
      winningNums: [87, 83, 26, 28, 32],
      myNums: [88, 30, 70, 12, 93, 22, 82, 36]
    }, {
      cardID: 6,
      winningNums: [31, 18, 13, 56, 72],
      myNums: [74, 77, 10, 23, 35, 67, 36, 11]
    }])
  })

  const cards = getCards(testData);

  test('test match finder', () => {
    expect(getMatches(cards[0])).toEqual([83, 86, 17, 48]);
  });

  test('test card value calculator', () => {
    expect(getCardValue(cards[0])).toEqual(8);
    expect(getCardValue(cards[1])).toEqual(2);
    expect(getCardValue(cards[2])).toEqual(2);
    expect(getCardValue(cards[3])).toEqual(1);
    expect(getCardValue(cards[4])).toEqual(0);
    expect(getCardValue(cards[5])).toEqual(0);
  });

  test('test func to calculate total of card values', () => {
    expect(sumCardValues(cards)).toEqual(13);
  })
});

describe('day 4 part 2:', () => {
  const cards = getCards(testData);

  test('create starting deck', () => {
    expect(initialiseDeck(cards)).toEqual([1, 1, 1, 1, 1, 1])
  });

  test('test deck processing', () => {
    expect(processCards(cards)).toEqual([1, 2, 4, 8, 14, 1]);
  });

  test('count number of cards after processing', () => {
    const finalDeck = processCards(cards);
    expect(countFinalDeck(finalDeck)).toEqual(30);
  })
});