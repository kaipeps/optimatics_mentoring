const fs = require('fs');

// func to read text file
const readTxtFile = fileName => {
  return fs.readFileSync(fileName)
    .toString().split('\n');
};

// function to return data representing a hand of cubes drawn from the bag, converted from a string
const createHandData = handStr => {
  // initialise empty object with the three cube colours as the keys
  let handData = {
    blue: 0,
    green: 0,
    red: 0
  };
  // get counts of each colour cube in the hand
  const cubeCounts = handStr.split(', ');
  // iterate over the cube counts and assign the count to the pre-existing object
  cubeCounts.forEach(cubeCount => {
    let [count, colour] = cubeCount.split(' ');
    handData[colour] = Number(count);
  });
  // return object of cube counts in the hand
  return handData;
};

// function to record the highest count of each colour among the hands
const recordHighestColourCounts = (hands, highestShown) => {
  // iterate over the hands
  hands.forEach(hand => {
    // iterate over each colour in the hand
    Object.entries(hand).forEach(([colour, count]) => {
      // set the current highest known to a variable for readability
      currentHighest = highestShown[colour];
      // reassign the highestShown to the current count ONLY if greater than the current highest
      highestShown[colour] = count > currentHighest ? count : currentHighest;
    });
  });
  // return the highest number shown of each colour cube in a game
  return highestShown;
};

// function to convert a single game string into an object storing the ID, hands, and highest count of each colour cube shown in the game
const createGameData = gameStr => {
  // initialise object with blank data to fill
  let gameData = {
    gameID: undefined,
    hands: [],
    highestShown: {
      blue: 0,
      green: 0,
      red: 0
    }
  };
  // get game ID and hands by splitting the string at the ": " substring
  let [game, hands] = gameStr.split(': ');
  // set gameID using the "Game n" string (e.g. "Game 1" becomes gameID: 1)
  gameData.gameID = Number(game.replace('Game ', ''));
  // split the string containing all hands into substrings for each hand
  hands = hands.split('; ');
  // iterate over the substrings and use them to create an object with the createHandData function and push it to the gameData.hands array
  hands.forEach(hand => {
    gameData.hands.push(createHandData(hand));
  });
  // set the highest shown cube counts using the recordHighestColourCounts function
  gameData.highestShown = recordHighestColourCounts(gameData.hands, gameData.highestShown);
  // return the converted gameData object
  return gameData;
};

// function to map the game dat strings into the corresponding object using the createGameData function above
const dataConversion = data => {
  return data.map(gameStr => createGameData(gameStr));
};

// function to validate whether or not the game is possible with a known number of cubes in the bag (i.e. 14 blue cubes, 13 green cubes, 12 red cubes)
const isPossibleGame = (knownCubeCounts, gameData) => {
  // initialise boolean variable assuming the game is true
  let gameIsPossible = true;
  // iterate over the highest shown count of each colour cube in the game
  Object.entries(gameData.highestShown).forEach(([colour, count]) => {
    // if the highest shown number of a colour is higher than the known number of that colour, set gameIsPossible to false
    if (count > knownCubeCounts[colour]) {
      gameIsPossible = false;
    }
  });
  // return whether or not the game is possible
  return gameIsPossible;
};

// function to get IDs of all possible games in the input data given a known number of cubes
const getPossibleGameIDs = (knownCubeCounts, allGamesData) => {
  // initialise array to hold the IDs of any game marked as possible
  let possibleGameIDs = [];
  // iterate over all games given
  allGamesData.forEach(game => {
    // if the game is possible with the known number of cubes, push the ID into the array
    if (isPossibleGame(knownCubeCounts, game)) {
      possibleGameIDs.push(game.gameID);
    }
  });
  // return array of IDs for possible games
  return possibleGameIDs;
};

// function to add together all possible gameIDs from an array of game objects
const sumPossibleGameIDs = (knownCubeCounts, allGamesData) => {
  // get IDs of all possible games in the data using the getPossibleGameIDs function
  let possibleGameIDs = getPossibleGameIDs(knownCubeCounts, allGamesData);
  // use reduce to add together the values of all of the IDs
  return possibleGameIDs.reduce((accumulator, current) => accumulator + current, 0)
};

// function to calculate the "power" of the minimum possible set of cubes for a game
const getMinimumGamePower = gameData => {
  // get the highest shown number of each colour cube in the game
  // a.k.a. the minimum number of cubes needed for the game to be possible
  let {
    blue,
    green,
    red
  } = gameData.highestShown;
  // return these counts multiplied together
  return blue * green * red;
};

// function to add together the minimum possible powers for each game in an array of game data
const sumMinimumGamePowers = allGamesData => {
  // create an array of the minimum possible powers for each game in the array
  let minimumGamePowers = allGamesData.map(gameData => getMinimumGamePower(gameData));
  // use reduce to add all of those powers together
  return minimumGamePowers.reduce((accumulator, current) => accumulator + current, 0)
}
// convert input data into an array of game data objects
const inputData = dataConversion(readTxtFile('day2/input_data.txt'));
// give the known cube counts for part 1 of the problem
const knownCubeCounts = {
  blue: 14,
  green: 13,
  red: 12
};
// print the sum of possible game IDs using the above cube counts
console.log(sumPossibleGameIDs(knownCubeCounts, inputData));
// print the sum of the minimum powers in each game
console.log(sumMinimumGamePowers(inputData));

// exports for testing
module.exports = {
  readTxtFile,
  createGameData,
  dataConversion,
  isPossibleGame,
  getPossibleGameIDs,
  sumPossibleGameIDs,
  getMinimumGamePower,
  sumMinimumGamePowers
};