const { measureIncreases, createSlidingMeasurements } = require("./sonar_sweep");

test('process first element', () => {
  expect(measureIncreases([199]))
    .toEqual(0);
});

test('process first three elements', () => {
  expect(measureIncreases([199, 200, 208]))
    .toEqual(2);
});

test('process first five elements', () => {
  expect(measureIncreases([199, 200, 208, 210, 200]))
    .toEqual(3);
});

test('full example', () => {
  expect(measureIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))
    .toEqual(7);
});

test('test sliding measurement creation', () => {
  expect(createSlidingMeasurements([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))
    .toEqual([607, 618, 618, 617, 647, 716, 769, 792]);
});

test('test increases with sliding measurements', () => {
  expect(measureIncreases(createSlidingMeasurements([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))).toEqual(5);
});

// test('', () => {
//   expect().toEqual();
// });