'use strict';

const themesList = ['building', 'food', 'nature', 'people', 'technology', 'objects']; // array of all available themes

const mockWords = require('../mocks/words.json');   // json file containing currated words
const themedValues = mockWords.themed;

const themedNumber = 5;         // number of themed items to return from getWords()
const notThemedNumber = 15;     // number of unthemed items to return from getWords()

// return a random number up to and including maxNumber
const generateRandomNumber = (maxNumber) => {
  const number = Math.floor(Math.random() * maxNumber);

  return number;
};

// return a random theme from the themeList
const getRandomTheme = () => {
  const index = generateRandomNumber(themesList.length);

  return themesList[index];
};

// return an array of word objects of the given theme
const getThemedList = (requestedTheme) => {
  if (themesList.indexOf(requestedTheme) == -1) {
    return getUnThemedList();
  }

  return themedValues.filter((item) => {
    return item.theme === requestedTheme;
  });
};

// return an array of unthemed word objects
const getUnThemedList = () => {
  return mockWords.notThemed;
};

// return an array of word objects
const getWords = () => {
  const returnArray = [];
  const randomTheme = getRandomTheme();
  const themedList = getThemedList(randomTheme);
  const unThemedList = getUnThemedList();

  for (let i = 0; i < themedNumber; i++) {
    const index = generateRandomNumber(themedList.length);
    returnArray.push(themedList[index]);
  }

  for (let i = 0; i < notThemedNumber; i++) {
    const index = generateRandomNumber(unThemedList.length);
    returnArray.push(unThemedList[index]);
  }

  return returnArray;
};

module.exports = {
  getWords: getWords,
  getThemedList: getThemedList,
  getUnThemedList: getUnThemedList,
  getRandomTheme: getRandomTheme,
  getThemeList: () => { return themesList}
}
