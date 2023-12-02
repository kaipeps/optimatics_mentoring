const {
  readTxtFile,
  createGameData,
  dataConversion,
  isPossibleGame,
  getPossibleGameIDs,
  sumPossibleGameIDs,
  getMinimumGamePower,
  sumMinimumGamePowers
} = require('./cube_conundrum');

const testData = readTxtFile('day2/test_data.txt');

describe('day 2 part 1:', () => {
  test('confirm text reader works', () => {
    expect(testData).toEqual([
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
    ])
  });

  const gameData = createGameData(testData[0]);

  test('data conversion pt 1: get gameID', () => {
    expect(gameData.gameID).toEqual(1);
  });

  test('data conversion pt 2: get hands', () => {
    expect(gameData.hands).toEqual([
      {
        blue: 3,
        green: 0,
        red: 4
      },
      {
        blue: 6,
        green: 2,
        red: 1
      },
      {
        blue: 0,
        green: 2,
        red: 0
      }
    ]);
  });

  test('data conversion pt 3: get highest shown cube counts', () => {
    expect(gameData.highestShown).toEqual({
      blue: 6,
      green: 2,
      red: 4
    });
  });

  test('data conversion pt 4: confirm final output', () => {
    expect(gameData).toEqual({
      gameID: 1,
      hands: [
        {
          blue: 3,
          green: 0,
          red: 4
        },
        {
          blue: 6,
          green: 2,
          red: 1
        },
        {
          blue: 0,
          green: 2,
          red: 0
        }
      ],
      highestShown: {
        blue: 6,
        green: 2,
        red: 4
      }
    });
  });

  const allGamesData = dataConversion(testData)

  test('data conversion pt 5: full data conversion', () => {
    expect(allGamesData).toEqual([
      {
        gameID: 1,
        hands: [
          {
            blue: 3,
            green: 0,
            red: 4
          },
          {
            blue: 6,
            green: 2,
            red: 1
          },
          {
            blue: 0,
            green: 2,
            red: 0
          }
        ],
        highestShown: {
          blue: 6,
          green: 2,
          red: 4
        }
      },
      {
        gameID: 2,
        hands: [
          {
            blue: 1,
            green: 2,
            red: 0
          },
          {
            blue: 4,
            green: 3,
            red: 1
          },
          {
            blue: 1,
            green: 1,
            red: 0
          }
        ],
        highestShown: {
          blue: 4,
          green: 3,
          red: 1
        }
      },
      {
        gameID: 3,
        hands: [
          {
            blue: 6,
            green: 8,
            red: 20
          },
          {
            blue: 5,
            green: 13,
            red: 4
          },
          {
            blue: 0,
            green: 5,
            red: 1
          }
        ],
        highestShown: {
          blue: 6,
          green: 13,
          red: 20
        }
      },
      {
        gameID: 4,
        hands: [
          {
            blue: 6,
            green: 1,
            red: 3
          },
          {
            blue: 0,
            green: 3,
            red: 6
          },
          {
            blue: 15,
            green: 3,
            red: 14
          }
        ],
        highestShown: {
          blue: 15,
          green: 3,
          red: 14
        }
      },
      {
        gameID: 5,
        hands: [
          {
            blue: 1,
            green: 3,
            red: 6
          },
          {
            blue: 2,
            green: 2,
            red: 1
          }
        ],
        highestShown: {
          blue: 2,
          green: 3,
          red: 6
        }
      }
    ]);
  });

  const knownCubeCounts = {
    blue: 14,
    green: 13,
    red: 12
  }

  test('data validation pt 1: confirm whether game is possible', () => {
    expect(isPossibleGame(knownCubeCounts, allGamesData[1])).toEqual(true);
    expect(isPossibleGame(knownCubeCounts, allGamesData[2])).toEqual(false);
  });

  test('data validation pt 2: find all possible games', () => {
    expect(getPossibleGameIDs(knownCubeCounts, allGamesData)).toEqual([1, 2, 5]);
  });

  test('solution: get sum of possible game IDs', () => {
    expect(sumPossibleGameIDs(knownCubeCounts, allGamesData)).toEqual(8);
  });
});

describe('day 2 part 2:', () => {

  const allGamesData = dataConversion(testData)

  test('get minimum game power for one game', () => {
    expect(getMinimumGamePower(allGamesData[0])).toEqual(48);
  });

  test('sum minimum game powers for all games', () => {
    expect(sumMinimumGamePowers(allGamesData)).toEqual(2286);
  });
});