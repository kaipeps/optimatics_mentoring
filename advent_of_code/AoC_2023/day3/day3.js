const fs = require('fs');

// func to read text file
const readTxtFile = fileName => {
  return fs.readFileSync(fileName)
    .toString().split('\n');
};

// function to find all adjacent characters of a found number
const getAdjacentChars = (data, rowIdx, found) => {
  // store the row for readability
  let row = data[rowIdx];

  // get the index to the left of the number
  let leftIdx = found.index - 1;
  // get the value of that index if it exists,
  // or use an empty string if it's of the leftmost edge
  let leftAdjacent = row[leftIdx] ? row[leftIdx] : '';

  // same as lines 14-18, but for the rightmost edge
  let rightIdx = found.index + found[0].length;
  let rightAdjacent = row[rightIdx] ? row[rightIdx] : '';

  // get the row above the number
  let rowAbove = data[rowIdx - 1];
  // find the section adjacent to the number if the row exists,
  // or use an empty string if it doesn't
  let aboveAdjacent = rowIdx == 0 ? ''
    : rowAbove.substring(leftIdx, rightIdx + 1);

  // as above (lines 24-29), but for below
  let rowBelow = data[rowIdx + 1];
  let belowAdjacent = rowIdx == data.length - 1 ? ''
    : rowBelow.substring(leftIdx, rightIdx + 1);

  // join the adjacent character strings together
  let adjacentChars = leftAdjacent
    + rightAdjacent
    + aboveAdjacent
    + belowAdjacent;

  // and return it
  return adjacentChars;
};

// fuction to search the row for part numbers
const searchRow = (data, rowIdx) => {
  // create regexp to search for numbers (one or more digits sequentially)
  let numSearch = /\d+/g
  // initialise variables for regexp search
  let partNumbers = [], found;
  // loop through each match
  while (found = numSearch.exec(data[rowIdx])) {
    // get adjacent characters
    const adjacentChars = getAdjacentChars(data, rowIdx, found);
    // use a regexp to test for digits or any symbol other than "."
    const isPartNumber = /[^\d|.]/g.test(adjacentChars);
    // if the test returns true, push the number to the partNumbers array
    if (isPartNumber) {
      partNumbers.push(Number(found));
    }
  }
  // return the row's partNumbers array
  return partNumbers;
};

// function to get part numbers from data
const getPartNumbers = data => {
  // initialise array for part numbers
  let partNumbers = [];
  // loop over rows
  for (rowIdx = 0; rowIdx < data.length; rowIdx++) {
    // and unpack both the currently known part numbers and
    // new partNumbers for this row into the partNumbers array
    partNumbers = [...partNumbers, ...searchRow(data, rowIdx)];
  }
  // return all part numbers for the given data
  return partNumbers
}

// function to add the part numbers together
const sumPartNumbers = data => {
  return getPartNumbers(data)
    .reduce((accumulator, current) => accumulator + current);
};

// const inputData = readTxtFile('day3/input_data.txt');

// exports for testing
module.exports = {
  readTxtFile,
  searchRow,
  getPartNumbers,
  sumPartNumbers
};