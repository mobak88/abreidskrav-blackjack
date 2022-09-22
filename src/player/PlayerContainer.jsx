import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import useFetch from "../hooks/useFetch";
import generateRandomCard from "../helpers/generateRandCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
`;

const PlayerContainer = () => {
  const [cardDeck, setCardDeck] = useState(null);
  const [randCard, setRandCard] = useState(null);
  const [initialPlayerCards, setInitialPlayerCards] = useState([]);
  const [initialComputerCards, setInitialComputerCards] = useState([]);

  const { loading, err, data } = useFetch("data/cardDeck.json");

  const getRandCard = (card) => {
    setRandCard(card);
    console.log(card);
  };

  const dealCards = () => {
    for (let i = 0; i <= 3; i++) {
      const randNum = generateRandomCard(cardDeck);

      setCardDeck((prevState) => {
        const newCardDeck = prevState.filter(
          (card) => card !== cardDeck[randNum]
        );
        return newCardDeck;
      });

      if (i % 2 === 0) {
        setInitialComputerCards((prevState) => [
          ...prevState,
          cardDeck[randNum],
        ]);
      } else {
        setInitialPlayerCards((prevState) => [...prevState, cardDeck[randNum]]);
      }

      console.log(cardDeck[randNum]);
    }
  };

  useEffect(() => {
    if (data) {
      setCardDeck([...data.cards]);
    }
  }, [data]);

  useEffect(() => {
    if (randCard) {
      setCardDeck((prevState) => {
        const newCardDeck = prevState.filter(
          (card) => card.name !== randCard.name
        );
        return newCardDeck;
      });
    }
  }, [randCard]);

  useEffect(() => {
    console.log(cardDeck);
  }, [cardDeck]);

  useEffect(() => {
    console.log(initialPlayerCards, initialComputerCards);
  }, [initialPlayerCards, initialComputerCards]);

  return (
    <Container>
      <Cards
        getRandCard={getRandCard}
        cardDeck={cardDeck}
        initialCards={initialComputerCards}
      />
      <Cards
        getRandCard={getRandCard}
        cardDeck={cardDeck}
        initialCards={initialPlayerCards}
      />
      <button onClick={dealCards}>Deal cards</button>
    </Container>
  );
};

export default PlayerContainer;
