const randomPick = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

const dealtCards = (data, touchedCardsIds) => {
  // Create a list of index the size of the data
  let indexList = [];
  for (let i = 0; i < data.length; i++) {
    indexList = [...indexList, i];
  }
  ////Shuffle (Fisher–Yates shuffle new version)
  let lastIndex = indexList.length - 1;
  // While there is element to shuffle
  while (lastIndex > 0) {
    //Pick a random index
    let randomIndex = randomPick(0, lastIndex);
    //and put it at the end
    indexList = indexList.concat(indexList.splice(randomIndex, 1));
    //move index to the front
    lastIndex--;
  } ////

  //reduce indexList to 5 items
  let fiveFirstIndex = indexList.slice(0, 5);

  //if every five first index refers to a touched card
  if (
    fiveFirstIndex.every((index) => touchedCardsIds.includes(data[index].id))
  ) {
    //search for an untouched card index
    let untouched = indexList.find(
      (index) => !touchedCardsIds.includes(data[index].id)
    );
    // and replace one of the five first
    fiveFirstIndex.splice(randomPick(0, 4), 1, untouched);
  }
  // Deal the five cards
  return fiveFirstIndex;
};

export default dealtCards;
