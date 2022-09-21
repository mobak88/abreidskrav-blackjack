import React, { useState, useEffect } from "react";

const Cards = () => {
  const [randCard, setRandCard] = useState(null);

  function generateRandomCard(card) {
    const randNumber = Math.round(Math.random() * (card.length - 1));
    return randNumber;
  }

  useEffect(() => {
    const getCardDeck = async () => {
      await fetch("data/cardDeck.json")
        .then((res) => res.json())
        .then((data) => {
          setRandCard(generateRandomCard(data.cards));
          console.log(data.cards, randCard);
        });
    };

    getCardDeck();
  });

  return (
    <div>
      <h3>{randCard}</h3>
    </div>
  );
};

export default Cards;
