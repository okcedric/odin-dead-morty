


  const handleClick = (id) => {
    //If card have been already touched game over
    let alreadyTouched  = touchedCardsIds.some((cardId) => cardId === id);
    return alreadyTouched ? gameOver() : newCardTouched(id);
  };
  const gameOver = () => {
    // if Hi score < current score New Hi score
    hiScore < currentScore && setHiScore(currentScore);
    // empty touched card array
    setTouchedCardsIds([]);
    // Alert Game over
    console.log("Game Over");
  };
  const newCardTouched = (id) => {
    let newTouchedCardsIds = [...touchedCardsIds, id];
    setTouchedCardsIds(newTouchedCardsIds);
    console.log(newTouchedCardsIds.length);
    newTouchedCardsIds.length === data.length && gameBeaten();
  };

  const gameBeaten = () => {
    console.log("You won ! You want a medal ? ");
    // if Hi score < current score New Hi score
    hiScore < currentScore && setHiScore(currentScore);
    // empty touched card array
    setTouchedCardsIds([]);
    setMaxScore(true);
    dealCards();
  };