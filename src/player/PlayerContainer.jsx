import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import useFetch from "../hooks/useFetch";
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

  const { loading, err, data } = useFetch("data/cardDeck.json");

  const getRandCard = (card) => {
    setRandCard(card);
    console.log(card);
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

  return (
    <Container>
      <Cards getRandCard={getRandCard} cardDeck={cardDeck} />
      <Cards getRandCard={getRandCard} cardDeck={cardDeck} />
    </Container>
  );
};

export default PlayerContainer;
