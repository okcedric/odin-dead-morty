import "./App.css";
import React, { useState, useEffect } from "react";
import Overlay from "./Overlay";
import Board from "./Board";
import Card from "./Card";
import dealtCards from "./Deal";
import { fetchData } from "./Data";


function App() {
  const [touchedCardsIds, setTouchedCardsIds] = useState([]);
  const [hiScore, setHiScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameBeaten, setIsGameBeaten] = useState(false);
  const [hasBeatGame, setHasBeatGame] = useState(false);
  const [data, setData] = useState(null);
  const [dealt, setDealt] = useState(null);
  const currentScore = touchedCardsIds.length;
  let cards = null;
  
   useEffect(() => {
     const loadData = async () => {
       const dataFetched = await fetchData();
       if (dataFetched) setData(dataFetched);
     };
     loadData();
   }, []);

  // When a new card is added to the touched list
  useEffect(() => {
    if (data) {
      //if all cards are touched
      if (touchedCardsIds.length === data.length) {
        setHiScore(currentScore);
        setIsGameBeaten(true);
        setHasBeatGame(true);
      } else {
        setDealt(dealtCards(data, touchedCardsIds));
      }
    }
  }, [touchedCardsIds,data]);

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
      touchedCardsIds.includes(morty.id) && (isTouched = "card touched"); // uncomment this line to cheat
      let image = morty.image;
      return (
        <Card
          key={morty.id}
          morty={morty}
          isTouched={isTouched}
          handleTouch={handleTouch}
        />
      );
    });
  }

  return (
    <>
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/fr/c/c8/Rick_and_Morty_logo.png"
        alt="Rick and Morty logo"
      />
      <h2>Dead Morty's Memory Card</h2>
      <h3>Don't touch the same Morty twice</h3>
      <Overlay
        isGameOver={isGameOver}
        isGameBeaten={isGameBeaten}
        currentScore={currentScore}
        retry={retry}
      />
      <Board
        hiScore={hiScore}
        currentScore={currentScore}
        hasBeatGame={hasBeatGame}
      />
      <div className="grid">{cards}</div>
    </>
  );
}

export default App;
