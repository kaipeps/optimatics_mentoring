function daySimulation(fishArr) {
  // counter for new fish in the day
  let newFish = 0

  // check each fish, and decrement or reset & add new fish as necessary
  for (i = 0; i < fishArr.length; i++) {
    if (fishArr[i] == 0) {
      fishArr[i] = 6
      newFish++
    } else {
      fishArr[i]--
    }
  }

  // add new fish for the day
  for (i = 0; i < newFish; i++) {
    fishArr.push(8)
  }

  // return new fishArr
  return fishArr
}

// 
function lanternfishGrowthModel(fishArr, days) {
  // run simulation for given number of days
  for (j = 0; j < days; j++) {
    daySimulation(fishArr)
  }

  // return total number of fish
  return fishArr.length
}

adventOfCodeFishArray = [3, 4, 1, 1, 5, 1, 3, 1, 1, 3, 5, 1, 1, 5, 3, 2, 4, 2, 2, 2, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 3, 1, 1, 5, 4, 1, 1, 1, 4, 1, 1, 1, 1, 2, 3, 2, 5, 1, 5, 1, 2, 1, 1, 1, 4, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 2, 3, 4, 2, 1, 3, 1, 1, 2, 1, 1, 2, 1, 5, 2, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 5, 1, 4, 1, 1, 1, 3, 3, 1, 3, 1, 3, 1, 4, 1, 1, 1, 1, 1, 4, 5, 1, 1, 3, 2, 2, 5, 5, 4, 3, 1, 2, 1, 1, 1, 4, 1, 3, 4, 1, 1, 1, 1, 2, 1, 1, 3, 2, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4, 4, 5, 2, 1, 1, 1, 1, 1, 2, 4, 2, 1, 1, 1, 2, 1, 1, 2, 1, 5, 1, 5, 2, 5, 5, 1, 1, 3, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 5, 1, 1, 3, 5, 1, 1, 5, 5, 3, 5, 3, 4, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5, 1, 3, 1, 5, 1, 1, 4, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 1, 5, 1, 1, 1, 1, 4, 1, 3, 2, 3, 4, 1, 3, 5, 3, 4, 1, 4, 4, 4, 1, 3, 2, 4, 1, 4, 1, 1, 2, 1, 3, 1, 5, 5, 1, 5, 1, 1, 1, 5, 2, 1, 2, 3, 1, 4, 3, 3, 4, 3]

function dataConversion(fishArr) {
  fishCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  fishArr.forEach((fish) => {
    fishCounts[fish] += 1
  })
  return fishCounts
}

function convertedSimulation(fishArr, days) {
  fishArr = dataConversion(fishArr)
  for (j = 0; j < days; j++) {
    // grab current number of "zero" fish
    zeroFish = fishArr[0]

    // cycle the values of 0 through 7 to the values of 1 through 8 and reset the following value
    for (i = 0; i < 8; i++) {
      fishArr[i] = fishArr[i + 1]
      fishArr[i + 1] = 0
    }

    // add the number of zero fish to both 6 to symbolise the reset fish 
    fishArr[6] = fishArr[6] + zeroFish
    // as well as 8 to represent the new fish
    fishArr[8] = zeroFish
  }

  return fishArr.reduce((totalFish, currentStage) => totalFish + currentStage)
}

console.log(convertedSimulation(adventOfCodeFishArray, 256))

module.exports = { daySimulation, lanternfishGrowthModel, dataConversion, convertedSimulation }