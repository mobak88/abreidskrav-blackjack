import React, { useState, useEffect } from "react";
import generateRandomCard from "../helpers/generateRandCard";

const Cards = () => {
  const [randCard, setRandCard] = useState(null);
  const [cardDeck, setCardDeck] = useState(null);

  useEffect(() => {
    const getCardDeck = async () => {
      await fetch("data/cardDeck.json")
        .then((res) => res.json())
        .then((data) => {
          setCardDeck([...data.cards]);
        });
    };

    getCardDeck();
  }, []);

  useEffect(() => {
    console.log(cardDeck);
    if (cardDeck !== null) {
      const randNum = generateRandomCard(cardDeck);
      console.log(cardDeck, cardDeck[randNum], randNum);
      setRandCard(cardDeck[randNum].value);
    }
  }, [cardDeck]);

  return (
    <div>
      <h3>{randCard}</h3>
    </div>
  );
};

export default Cards;
