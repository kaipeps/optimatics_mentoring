const {
  readTxtFile,
  searchRow,
  getPartNumbers,
  sumPartNumbers
} = require('./day3');

const testData = readTxtFile('day3/test_data.txt');

describe('day 3 part 1:', () => {
  test('find all part numbers in one row', () => {
    expect(searchRow(testData, 0)).toEqual([467]);
    expect(searchRow(testData, 2)).toEqual([35, 633]);
  });

  test('find all part numbers in data', () => {
    expect(getPartNumbers(testData)).toEqual([467, 35, 633, 617, 592, 755, 664, 598])
  });

  test('sum together part numbers', () => {
    expect(sumPartNumbers(testData)).toEqual(4361);
  })
});