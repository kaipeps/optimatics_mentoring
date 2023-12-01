const fs = require('fs');

// read sample data from txt file, convert to an array of numbers
const sonarMeasurements = fs
  .readFileSync('1_sonar_sweep/sonar_measurements.txt')
  .toString()
  .split('\n')
  .map(measurement => Number(measurement));

// fn to measure increases between measurements in the array
function measureIncreases(measurements) {
  // initialising variable to track increases
  let increaseCount = 0;

  // iterating over each in the array
  // comparing with the prev. measurement
  // incrementing increaseCount if larger
  // and setting the current measurement as previous for the next iteration
  measurements.forEach((measurement, idx) => {
    if (idx == 0) {
      previousMeasurement = measurement;
      return;
    } else if (measurement > previousMeasurement) {
      increaseCount++;
      previousMeasurement = measurement;
      return;
    } else {
      previousMeasurement = measurement;
      return;
    }
  })

  // return the increase counter
  return increaseCount;
}

// fn to create sliding windows per part 2
function createSlidingMeasurements(measurements) {
  // initialise array to hold windows
  let slidingMeasurements = [];

  // iterate over measurements until no more windows can be made (stopping at third to last measurement)
  for (i = 0; i < measurements.length - 2; i++) {
    // variables for readability
    num1 = measurements[i];
    num2 = measurements[i + 1];
    num3 = measurements[i + 2];
    // push the total to the new array
    slidingMeasurements.push(num1 + num2 + num3);
  }
  return slidingMeasurements
}

// logging answers for sample data
console.log(measureIncreases(sonarMeasurements));
console.log(measureIncreases(createSlidingMeasurements(sonarMeasurements)));

// exports for testing
module.exports = { measureIncreases, createSlidingMeasurements };
