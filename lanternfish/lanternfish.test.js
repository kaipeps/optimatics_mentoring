const { daySimulation, lanternfishGrowthModel, dataConversion, convertedSimulation } = require('./lanternfish')

test('test one day on one fish', function () {
  let mockFish = [7]
  expect(daySimulation(mockFish)).toEqual([6])
})

test('simulate sample, 18 days', () => {
  let testSample = [3, 4, 3, 1, 2]
  expect(lanternfishGrowthModel(testSample, 18)).toEqual(26)
})

// test('simulate sample, 80 days', () => {
//   let testSample = [3, 4, 3, 1, 2]
//   expect(lanternfishGrowthModel(testSample, 80)).toEqual(5934)
// })

test('convert from raw to organised', () => {
  let testSample = [3, 4, 3, 1, 2]
  expect(dataConversion(testSample)).toEqual([0, 1, 1, 2, 1, 0, 0, 0, 0])
})

test('simulate 1 day after conversion', () => {
  let testSample = [3, 4, 3, 1, 2]
  expect(convertedSimulation(testSample, 1)).toEqual(5)
})

test('simulate 2 days after conversion', () => {
  let testSample = [3, 4, 3, 1, 2]
  expect(convertedSimulation(testSample, 2)).toEqual(6)
})

test('simulate 18 days after conversion', () => {
  let testSample = [3, 4, 3, 1, 2]
  expect(convertedSimulation(testSample, 18)).toEqual(26)
})

test('simulate 80 days after conversion', () => {
  let testSample = [3, 4, 3, 1, 2]
  expect(convertedSimulation(testSample, 80)).toEqual(5934)
})
