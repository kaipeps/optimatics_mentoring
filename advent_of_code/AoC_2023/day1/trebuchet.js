const fs = require('fs');

const readTxtFile = fileName => {
  return fs.readFileSync(fileName)
    .toString().split('\n');
};

// original function to get numbers from string (superseded)
const getNumbers = string => {
  let nums = [];
  for (char = 0; char < string.length; char++) {
    if (string[char] * 1) {
      nums.push(string[char]);
    }
  }
  return nums;
};

// new function to get numbers from string including written (via RegExp)
const getNumbersWithWords = string => {
  // dictionary to map written numbers to numeric strings
  let writtenNums = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
  };
  // using keys to make array of written numbers
  let numWords = Object.keys(writtenNums);
  // creating RegExp using above array that looks for both written numbers and numeric characters
  let numCapture = new RegExp(`${numWords.join('|')}|\\d`, 'g');
  // open variables for RegExp search
  let matches = [], found;
  // begin searching for matches in regexp
  while (found = numCapture.exec(string)) {
    // push match to array of matches
    matches.push(found[0]);
    // reset search index to second character of last match
    // this means that any overlapping matches will capture both matches
    // e.g. "eightwo" matches "eight" & "two" instead of just "eight"
    numCapture.lastIndex = found.index + 1;
  }
  // return matches, mapped so that written numbers are converted to their numeric strings
  return matches.map(match => Number(match) ? match : writtenNums[match])
}

// function to get calibration value for a single line
const getCalibrationValue = string => {
  // use function getNumbersWithWords to get "numbers" from the string
  let nums = getNumbersWithWords(string);
  // return the value of the first and last number, joined as a string
  // will also count for single numbers as the indexes will read the same number
  // e.g. string returning ["7"] will count as 77 instead of 7
  return Number(nums[0] + nums[nums.length - 1]);
};

// function to total the +calibration values
const sumCalibrationValues = input => {
  // initialise array
  let values = [];
  // iterate over lines in input
  for (idx = 0; idx < input.length; idx++) {
    // use function getCalibrationValue to return the value for that line and push it to the values array
    values.push(getCalibrationValue(input[idx]));
  }
  // use reduce to sum all of the values in the array
  return values.reduce((accumulator, current) => accumulator + current, 0)
};

// exports for testing
module.exports = {
  readTxtFile,
  getNumbers,
  getCalibrationValue,
  sumCalibrationValues,
  getNumbersWithWords
};
