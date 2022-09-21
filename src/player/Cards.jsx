import React, { useState, useEffect } from "react";
import generateRandomCard from "../helpers/generateRandCard";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const DealtCardsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const CardWrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;
`;

const Cards = () => {
  const [randCard, setRandCard] = useState(null);
  const [cardDeck, setCardDeck] = useState(null);
  const [dealtCards, setDealtCards] = useState([]);
  const [score, setscore] = useState(0);

  const { loading, err, data } = useFetch("data/cardDeck.json");

  useEffect(() => {
    if (data) {
      setCardDeck([...data.cards]);
    }
  }, [data]);

  const dealNewCard = () => {
    const randNum = generateRandomCard(cardDeck);
    setRandCard(cardDeck[randNum]);
  };

  useEffect(() => {
    if (randCard) {
      setCardDeck((prevState) => {
        const newCardDeck = prevState.filter(
          (card) => card.name !== randCard.name
        );
        return newCardDeck;
      });

      setDealtCards((prevState) => [...prevState, randCard]);
    }
  }, [randCard]);

  useEffect(() => {
    if (dealtCards.length !== 0) {
      const newScore = dealtCards.reduce((prevVal, currentVal) => {
        return prevVal + currentVal.value;
      }, 0);
      setscore(newScore);
      console.log(newScore);
    }
    console.log(dealtCards);
  }, [dealtCards]);

  console.log(dealtCards.length);

  return (
    <CardsContainer>
      <h3>{score}</h3>
      <DealtCardsContainer>
        {dealtCards.length < 1 && <p>Click new card to play</p>}
        {dealtCards.length > 0 &&
          dealtCards.map((card) => {
            return (
              <CardWrapper key={card.name}>
                <p>{card.value}</p>
              </CardWrapper>
            );
          })}
      </DealtCardsContainer>
      <button onClick={dealNewCard}>New card</button>
    </CardsContainer>
  );
};

export default Cards;
