import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background-color: #ebebeb;
`;

const DealtCardsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const CardWrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;
`;

const Cards = ({
  cards,
  children,
  player,
  dealNewPlayerCard,
  handlePlayerHold,
  hold,
}) => {
  const [dealtCards, setDealtCards] = useState([]);
  const [score, setScore] = useState(0);

  const handleDealNewPlayerCard = () => {
    dealNewPlayerCard();
    setDealtCards((prevState) => [...prevState, ...cards]);
  };

  const playerHoldHandler = () => {
    handlePlayerHold();
  };

  useEffect(() => {
    setDealtCards([...cards]);
  }, [cards]);

  useEffect(() => {
    if (dealtCards.length !== 0) {
      const newScore = dealtCards.reduce((prevVal, currentVal) => {
        return prevVal + currentVal.value;
      }, 0);
      setScore(newScore);
    }
  }, [dealtCards]);

  return (
    <CardsContainer>
      <h2>{children}</h2>
      {/* {player && score < 21 && <h3>Score: {score}</h3>} */}
      {score < 21 && <h3>Score: {score}</h3>}
      {score > 21 && <h3>You lost Score: {score}</h3>}
      {score === 21 && <h3>Blackjack Score: {score}</h3>}
      <DealtCardsContainer>
        {dealtCards.length > 0 &&
          dealtCards.map((card) => {
            return (
              <CardWrapper key={card.name + Math.random()}>
                <p>{card.value}</p>
              </CardWrapper>
            );
          })}
      </DealtCardsContainer>
      {!hold && player && dealtCards.length > 0 && (
        <>
          <button onClick={handleDealNewPlayerCard}>New card</button>
          <button onClick={playerHoldHandler}>Hold</button>
        </>
      )}
    </CardsContainer>
  );
};

export default Cards;
