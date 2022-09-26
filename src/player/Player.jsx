import React, { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import styled from "styled-components";

const DealtCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CardWrapper = styled.div`
  border: 2px solid black;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const HiddenCard = styled.div`
  width: 6.3rem;
  background-image: url("/images/card-back.svg");
  background-repeat: no-repeat;
`;

const CardNumber = styled.p`
  font-size: 2rem;
  text-align: center;
`;

const Btn = styled.button`
  padding: 1rem 2rem;
  background-color: #030357;
  border: none;
  color: #cfcfcf;
  font-weight: 600;
  text-transform: uppercase;
`;

const Player = ({
  cards,
  children,
  player,
  computer,
  dealNewPlayerCard,
  handlePlayerHold,
  hold,
  getScore,
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
    const newScore = cards.reduce((prevVal, currentVal) => {
      return prevVal + currentVal.value;
    }, 0);
    setScore(newScore);
    getScore(newScore);
  }, [dealtCards]);

  return (
    <CardContainer>
      <h2>{children}</h2>
      {score < 21 && <h3>Score: {score}</h3>}
      {score > 21 && <h3>You lost Score: {score}</h3>}
      {score === 21 && <h3>Blackjack Score: {score}</h3>}
      <DealtCardsContainer>
        {cards.length > 0 &&
          cards.map((card, i) => {
            if (!hold && computer && i === 0) {
              return <HiddenCard key={card.name} />;
            }

            if (hold && i === 0) {
              return (
                <CardWrapper key={card.name}>
                  <CardNumber>
                    {card.value}
                    <img
                      style={{ height: 53, width: 36 }}
                      src="/images/cardsIcons/heart-solid.svg"
                      alt=""
                    />
                  </CardNumber>
                </CardWrapper>
              );
            }

            if (card.name.toLowerCase().includes("heart")) {
              return (
                <CardWrapper key={card.name}>
                  <CardNumber>
                    {card.value}
                    <img
                      style={{ height: 53, width: 36 }}
                      src="/images/cardsIcons/heart-solid.svg"
                      alt=""
                    />
                  </CardNumber>
                </CardWrapper>
              );
            } else if (card.name.toLowerCase().includes("diamond")) {
              return (
                <CardWrapper key={card.name}>
                  <CardNumber>
                    {card.value}
                    <img
                      style={{ height: 53, width: 36 }}
                      src="/images/cardsIcons/diamond-solid.svg"
                      alt=""
                    />
                  </CardNumber>
                </CardWrapper>
              );
            } else if (card.name.toLowerCase().includes("spade")) {
              return (
                <CardWrapper key={card.name}>
                  <CardNumber>
                    {card.value}
                    <img
                      style={{ height: 53, width: 36 }}
                      src="/images/cardsIcons/spade.svg"
                      alt=""
                    />
                  </CardNumber>
                </CardWrapper>
              );
            } else {
              return (
                <CardWrapper key={card.name}>
                  <CardNumber>
                    {card.value}
                    <img
                      style={{ height: 53, width: 36 }}
                      src="/images/cardsIcons/clover-solid.svg"
                      alt=""
                    />
                  </CardNumber>
                </CardWrapper>
              );
            }
          })}
      </DealtCardsContainer>
      {!hold && player && dealtCards.length > 0 && score < 21 && (
        <>
          <Btn onClick={handleDealNewPlayerCard}>New card</Btn>
          <Btn onClick={playerHoldHandler}>Hold</Btn>
        </>
      )}
    </CardContainer>
  );
};

export default Player;
