const { testData, calculateTotalRisk, readTextFile, logLowPointValues, findBasin, findLargestBasinSizes } = require('./smoke_basin');

const testDataRow = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0]
];

test('check file read', () => {
  expect(readTextFile('testData.txt')).toEqual([
    [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
    [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
    [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
    [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
    [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]
  ]);
});

test('log low points for a row', () => {
  expect(logLowPointValues(testDataRow)).toEqual([1, 0]);
});

test('log low points for test data', () => {
  expect(logLowPointValues(testData)).toEqual([1, 0, 5, 5]);
});

test('find total risk level for test data', () => {
  expect(calculateTotalRisk(logLowPointValues(testData))).toEqual(15);
});

test('find basin from point [0, 0]', () => {
  let expectedPoints = ["0-0", "0-1", "1-0"];
  let basin = findBasin(testData, [0, 0])
  expectedPoints.forEach(point => {
    expect(basin).toContainEqual(point);
  })
});

test('find basin from point [0, 5]', () => {
  let expectedPoints = [
    "0-5",
    "0-6",
    "0-7",
    "0-8",
    "0-9",
    "1-6",
    "1-8",
    "1-9",
    "2-9"
  ];
  let basin = findBasin(testData, [0, 5]);

  expectedPoints.forEach(point => {
    expect(basin).toContainEqual(point);
  })
});

test('find basin from point [1, 2]', () => {
  let expectedPoints = [
    "1-2",
    "1-3",
    "1-4",
    "2-1",
    "2-2",
    "2-3",
    "2-4",
    "2-5",
    "3-0",
    "3-1",
    "3-2",
    "3-3",
    "3-4",
    "4-1"
  ];
  let basin = findBasin(testData, [1, 2]);

  expectedPoints.forEach(point => {
    expect(basin).toContainEqual(point);
  })
});

test('find basin from point [2, 7]', () => {
  let expectedPoints = [
    "2-7",
    "3-6",
    "3-7",
    "3-8",
    "4-5",
    "4-6",
    "4-7",
    "4-8",
    "4-9"
  ];
  let basin = findBasin(testData, [2, 7]);

  expectedPoints.forEach(point => {
    expect(basin).toContainEqual(point);
  })
});
