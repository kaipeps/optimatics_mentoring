// imports for testing
const {
  readTxtFile,
  getNumbers,
  getCalibrationValue,
  sumCalibrationValues,
  getNumbersWithWords
} = require('./trebuchet');

describe('day 1 part 1:', () => {
  test('confirm text reader works', () => {
    expect(readTxtFile('day1/test_data.txt')).toEqual([
      '1abc2',
      'pqr3stu8vwx',
      'a1b2c3d4e5f',
      'treb7uchet'
    ]);
  });

  test('get all numbers in string', () => {
    expect(getNumbers('1abc2')).toEqual(['1', '2']);
    expect(getNumbers('a1b2c3d4e5f')).toEqual(['1', '2', '3', '4', '5',]);
    expect(getNumbers('treb7ubchet')).toEqual(['7',]);
  });

  test('join first and last number', () => {
    expect(getCalibrationValue('1abc2')).toEqual(12);
    expect(getCalibrationValue('treb7uchet')).toEqual(77);
  });

  test('add calibration values together', () => {
    const testData = readTxtFile('day1/test_data.txt')
    expect(sumCalibrationValues(testData)).toEqual(142);
  })
});

describe('day1 part 2:', () => {
  test('get numbers with words', () => {
    expect(getNumbersWithWords('eightwothree')).toEqual(['8', '2', '3']);
    expect(getNumbersWithWords('4nineeightseven2')).toEqual(['4', '9', '8', '7', '2']);
  });

  test('sum calibration values together (inc. words)', () => {
    const wordedTestData = readTxtFile('day1/worded_test_data.txt')
    expect(sumCalibrationValues(wordedTestData)).toEqual(281);
  });
});
