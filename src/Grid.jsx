import React, { useState, useEffect } from "react";
import Overlay from "./Overlay";

function Grid() {
  const [touchedCardsIds, setTouchedCardsIds] = useState([]);
  const [lastTouchedCard, setLastTouchedCard] = useState(null);
  const [hiScore, setHiScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameBeaten, setIsGameBeaten] = useState(false);
  const [hasBeatGame, setHasBeatGame] = useState(false);
  const [data, setData] = useState(null);
  const [dealt, setDealt] = useState(null);
  const currentScore = touchedCardsIds.length;
  const medal = hasBeatGame && <span>(max)</span>;

  let cards = null;
  let overlay = null;
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/?name=morty&status=dead")
      .then((response) => response.json())
      .then((json) => {
        // get "Morty Smith" from Remplacement Dimension
        json = json.results.map((morty) => {
          return morty.name === "Morty Smith"
            ? { ...morty, name: "Morty (Replacement Dimension)" }
            : morty;
        });
        setData(json);
      })
      .catch((error) => console.error(error));
  }, []);

  const randomPick = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  };

  const dealCards = () => {
    let indexList = [];
    for (let i = 0; i < data.length; i++) {
      indexList = [...indexList, i];
    }
    //Fisher–Yates shuffle (new version)
    let lastIndex = indexList.length - 1;
    // While there is element to shuffle
    while (lastIndex > 0) {
      //Random pick a random
      let randomIndex = randomPick(0, lastIndex);
      //and put it at the end
      indexList = indexList.concat(indexList.splice(randomIndex, 1));
      //move index to the front
      lastIndex--;
    }
    //reduce indexList to 10 item
    let fiveFirstIndex = indexList.slice(0, 5);

    // if every ten first index refers to a touched card
    if (
      fiveFirstIndex.every((index) => touchedCardsIds.includes(data[index].id))
    ) {
      // search for an untouched card index
      let untouched = indexList.find(
        (index) => !touchedCardsIds.includes(data[index].id)
      );
      // and replace one of the five first
      fiveFirstIndex.splice(randomPick(0, 4), 1, untouched);
    }
    //reduce indexList to 10 item
    indexList = fiveFirstIndex;
    setDealt(indexList);
  };

  //when data is fetch, deal cards
  useEffect(() => {
    if (data) dealCards();
  }, [data]);

  // When a new card is added to the touched list
  useEffect(() => {
    if (data) {
      //if all cards are touched
      if (touchedCardsIds.length === data.length) {
        setHiScore(currentScore);
        setIsGameBeaten(true);
        setHasBeatGame(true);
      } else {
        dealCards();
      }
    }
  }, [touchedCardsIds]);

  const handleTouch = (id) => {
    //if the card has already been touched
    if (touchedCardsIds.includes(id)) {
      //game Over
      setIsGameOver(true);
      // if Hi score < current score New Hi score
      hiScore < currentScore && setHiScore(currentScore); 
    } else {
      //Else add new id to touched Cards list
      if (id) setTouchedCardsIds([...touchedCardsIds, id]);
    }
  };

  const retry = () => {
    setIsGameOver(false);
    setIsGameBeaten(false);
    setTouchedCardsIds([]);
  };

  if (dealt) {
    cards = dealt.map((index) => {
      let morty = data[index];
      let isTouched = "card";
       touchedCardsIds.includes(morty.id) && (isTouched = isTouched + " touched"); // uncomment this line to cheat
      let image = morty.image;
      return (
        <div
          className={isTouched}
          key={morty.id}
          onClick={() => handleTouch(morty.id)}
        >
          <div
            className="image"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <h4 className="name">{morty.name}</h4>
        </div>
      );
    });
  }
  console.log([isGameBeaten, isGameOver]);

  return (
    <>
      <Overlay
        isGameOver={isGameOver}
        isGameBeaten={isGameBeaten}
        currentScore={currentScore}
        retry={retry}
      />
      <div className="board">
        <div className="currentScore"> Current Score : {currentScore} </div>
        <div className="hiScore">
          {" "}
          Hi Score : {hiScore} {medal}{" "}
        </div>
      </div>
      <div className="grid">{cards}</div>
    </>
  );
}

export default Grid;
