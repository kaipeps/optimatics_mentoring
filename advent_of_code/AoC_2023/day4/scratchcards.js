const fs = require('fs');

// func to read text file
const readTxtFile = fileName => {
  return fs.readFileSync(fileName)
    .toString().split('\n');
};

const extractNumbers = numStr => numStr
  .split(/\s+/g)
  .filter(num => num != '')
  .map(num => Number(num));

const extractCardData = cardStr => {
  let [card, numbers] = cardStr.split(': ');
  let [winningNums, myNums] = numbers.split(' | ');
  cardID = Number(card.replace(/Card\s+/g, ''));
  winningNums = extractNumbers(winningNums);
  myNums = extractNumbers(myNums);

  return {
    cardID,
    winningNums,
    myNums
  };
};

const getMatches = ({ myNums, winningNums }) => myNums
  .filter(myNum => winningNums
    .includes(myNum));

const getCardValue = card => {
  let cardValue = 0;
  const cardMatches = getMatches(card);
  cardMatches.forEach((match, idx) => {
    if (idx == 0 && match) {
      cardValue++;
    } else {
      cardValue = cardValue * 2;
    }
  });
  return cardValue;
};

const getCards = data => data
  .map(cardStr => extractCardData(cardStr));

const sumCardValues = cards => {
  let values = cards.map(card => getCardValue(card));
  return values.reduce((accumulator, current) => accumulator + current, 0);
}

const initialiseDeck = cards => cards.map(card => 1);

const processCards = cards => {
  let deck = initialiseDeck(cards);
  for (cardIdx = 0; cardIdx < deck.length; cardIdx++) {
    let copies = deck[cardIdx];
    let matchCount = getMatches(cards[cardIdx]).length;
    let cardIdxToCopy = cardIdx + 1;
    while (cardIdxToCopy <= cardIdx + matchCount) {
      deck[cardIdxToCopy] += copies;
      cardIdxToCopy++
    }
  }
  return deck;
}

const countFinalDeck = deck => deck.reduce((accumulator, current) => accumulator + current, 0);

const inputData = readTxtFile('day4/input_data.txt');
const inputCards = getCards(inputData);
// console.log(sumCardValues(inputCards));
const finalInputDeck = processCards(inputCards);
console.log(countFinalDeck(finalInputDeck));

// exports for testing
module.exports = {
  readTxtFile,
  extractCardData,
  getCards,
  getMatches,
  getCardValue,
  sumCardValues,
  initialiseDeck,
  processCards,
  countFinalDeck
};