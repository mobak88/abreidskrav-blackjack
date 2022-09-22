import React, { useState, useEffect } from "react";
import generateRandomCard from "../helpers/generateRandCard";
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

const Cards = ({ cardDeck, getRandCard }) => {
  const [dealtCards, setDealtCards] = useState([]);
  const [score, setscore] = useState(0);

  const dealNewCard = () => {
    const randNum = generateRandomCard(cardDeck);
    setDealtCards((prevState) => [...prevState, cardDeck[randNum]]);
    getRandCardHandler(cardDeck[randNum]);
  };

  useEffect(() => {
    if (dealtCards.length !== 0) {
      const newScore = dealtCards.reduce((prevVal, currentVal) => {
        return prevVal + currentVal.value;
      }, 0);
      setscore(newScore);
    }
  }, [dealtCards]);

  const getRandCardHandler = (card) => {
    getRandCard(card);
  };

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
