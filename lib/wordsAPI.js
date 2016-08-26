'use strict';

const themesList = ['Buildings', 'Food', 'Nature', 'People', 'Technology', 'Objects']; // array of all available themes

const mockWords = require('../mocks/words.json');   // json file containing currated words
const themedValues = mockWords.themed;

const themedNumber = 5;         // number of themed items to return from getWords()
const notThemedNumber = 11;     // number of unthemed items to return from getWords()
const fillerNumber = 4;         // number of filler items to return from getWords()

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

const getSingleTheme = (requestedTheme) => {
  const theme = (themesList.indexOf(requestedTheme) === -1) ? getRandomTheme() : requestedTheme;

  return {
    theme,
    photoURL: `https://source.unsplash.com/category/${theme.toLowerCase()}`,
  };
};


// return an array of themes
const getThemes = () => {
  return themesList;
};

// return an array of unthemed word objects
const getUnThemedList = () => {
  return mockWords.notThemed;
};

// return an array of word objects of the given theme
const getThemedList = (requestedTheme) => {
  if (themesList.indexOf(requestedTheme) === -1) {
    return getUnThemedList();
  }

  return themedValues.filter((item) => {
    return item.theme === requestedTheme;
  });
};

const getFillerList = () => {
  return mockWords.fillers;
};


//  Randomize Shuffle array element order in-place.
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

// return an array of word objects
const getWords = () => {
  const returnArray = [];
  const randomTheme = getRandomTheme();
  const themedList = getThemedList(randomTheme);
  const unThemedList = getUnThemedList();
  const fillerList = getFillerList();

  for (let i = 0; i < themedNumber; i++) {
    const index = generateRandomNumber(themedList.length);
    returnArray.push(themedList[index]);
  }

  for (let i = 0; i < notThemedNumber; i++) {
    const index = generateRandomNumber(unThemedList.length);
    returnArray.push(unThemedList[index]);
  }

  for (let i = 0; i < fillerNumber; i++) {
    const index = generateRandomNumber(fillerList.length);
    returnArray.push(fillerList[index]);
  }

  return shuffleArray(returnArray);
};


module.exports.getFillerList = getFillerList;
module.exports.getWords = getWords;
module.exports.getThemedList = getThemedList;
module.exports.getUnThemedList = getUnThemedList;
module.exports.getRandomTheme = getRandomTheme;
module.exports.getThemes = getThemes;
module.exports.getSingleTheme = getSingleTheme;
