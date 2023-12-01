const fs = require('fs');

function readTextFile(fileName) {
  return fs.readFileSync(fileName)
    .toString()
    .split('\n')
    .map(row => row.split('')
      .map(point => Number(point))
    );
};

const testData = readTextFile('testData.txt');
const inputData = readTextFile('inputData.txt');

const handleUndefinedPoint = (point) => point == undefined ? 10 : point;

function checkPoint(thisPoint, leftPoint, rightPoint, upperPoint, lowerPoint) {
  if (leftPoint > thisPoint
    && rightPoint > thisPoint
    && upperPoint > thisPoint
    && lowerPoint > thisPoint) {
    return true
  }
};

function logLowPointValues(testData) {
  let lowPoints = [];

  testData.forEach((row, rowIdx) => {
    for (point = 0; point < row.length; point++) {
      let thisPoint = testData[rowIdx][point];
      let leftPoint = handleUndefinedPoint(testData[rowIdx][point - 1]);
      let upperPoint = rowIdx == 0 ? 10
        : handleUndefinedPoint(testData[rowIdx - 1][point]);
      let rightPoint = handleUndefinedPoint(testData[rowIdx][point + 1]);
      let lowerPoint = rowIdx == testData.length - 1 ? 10
        : handleUndefinedPoint(testData[rowIdx + 1][point]);

      if (checkPoint(thisPoint, leftPoint, rightPoint, upperPoint, lowerPoint)) {
        lowPoints.push(thisPoint);
      }
    }
  });

  return lowPoints;
};

const calculateTotalRisk = (lowPoints) => lowPoints.reduce((riskAccumulator, currentRiskLevel) => riskAccumulator + currentRiskLevel + 1, 0);

console.log(calculateTotalRisk(logLowPointValues(inputData)));

// part 2

function isValidPoint(data, basin, [row, col]) {
  if (row < data.length) {
    let pointValue = data[row][col];
    if (pointValue != 9
      && pointValue != undefined
      && basin.includes(`${row}-${col}`) == false) {
      return true;
    } else {
      return false;
    }
  }
};

function checkSurroundingPoints(data, basin, [row, col]) {
  // check point below
  if (isValidPoint(data, basin, [row, col + 1])) {
    basin.push(`${row}-${col + 1}`)
    checkSurroundingPoints(data, basin, [row, col + 1])
  }
  // check point to the right
  if (isValidPoint(data, basin, [row + 1, col])) {
    basin.push(`${row + 1}-${col}`)
    checkSurroundingPoints(data, basin, [row + 1, col])
  }
  // check point to the left
  if (isValidPoint(data, basin, [row, col - 1])) {
    basin.push(`${row}-${col - 1}`)
    checkSurroundingPoints(data, basin, [row, col - 1])
  }

  return basin;
};

function findBasin(data, [row, col]) {
  let basin = [`${row}-${col}`];
  basin = checkSurroundingPoints(data, basin, [row, col]);
  return basin;
};

function findLargestBasinSizes(data) {
  let checkedPoints = []
  for (row = 0; row < data.length; row++) {
    for (column = 0; column < row.length; column++) {

    }
  }
}

module.exports = { testData, calculateTotalRisk, readTextFile, logLowPointValues, findBasin }
