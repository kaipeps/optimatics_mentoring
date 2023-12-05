const fs = require('fs');

// func to read text file
const readTxtFile = fileName => {
  return fs.readFileSync(fileName)
    .toString().split('\n');
};

// func to sum values of elements in an array
const sumElementValues = array => array.reduce((accumulator, current) => accumulator + current, 0);

// exporting functions for use in other files
module.exports = {
  readTxtFile,
  sumElementValues
}