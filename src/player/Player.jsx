import React, { useState, useEffect } from "react";
import heart from "../../src/cardsIcons/heart-solid.svg";
import diamond from "../../src/cardsIcons/diamond-solid.svg";
import spade from "../../src/cardsIcons/spade.svg";
import clover from "../../src/cardsIcons/clover-solid.svg";
import CardContainer from "./CardContainer";
import Button from "../button/Button";
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

const ScoreWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  blackJack,
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

  const determineAceValue = () => {
    return cards.reduce((prevVal, currentVal) => {
      if (currentVal.name.toLowerCase().includes("ace") && score < 21) {
        currentVal.value = 11;
      } else if (currentVal.name.toLowerCase().includes("ace") && score > 21) {
        currentVal.value = 1;
      }
      return prevVal + currentVal.value;
    }, 0);
  };

  useEffect(() => {
    setDealtCards([...cards]);
  }, [cards]);

  useEffect(() => {
    const newScore = determineAceValue();
    setScore(newScore);
    getScore(newScore);
  }, [dealtCards]);

  const cardImg = (card) => {
    const cardName = card.name.split(" ")[1].toLowerCase();
    if (cardName === "heart") return heart;
    if (cardName === "clover") return clover;
    if (cardName === "spade") return spade;
    if (cardName === "diamond") return diamond;
  };

  return (
    <CardContainer>
      <ScoreWrapper>
        <h2>{children}</h2>
        {score < 21 && player && <h3>Score: {score}</h3>}
        {!blackJack && hold && computer && <h3>Score: {score}</h3>}
        {blackJack && computer && <h3>Score: {score}</h3>}
        {player && score > 21 && <h3>You lost Score: {score}</h3>}
        {player && score === 21 && <h3>Blackjack Score: {score}</h3>}
      </ScoreWrapper>
      <DealtCardsContainer>
        {cards.length > 0 &&
          cards.map((card, i) => {
            if (!blackJack && !hold && computer && i === 0) {
              return <HiddenCard key={card.name} />;
            }

            if (hold && i === 0) {
              return (
                <CardWrapper key={card.name}>
                  <CardNumber>
                    {card.symbol}
                    <img
                      style={{ height: 53, width: 36 }}
                      src={cardImg(card)}
                      alt=""
                    />
                  </CardNumber>
                </CardWrapper>
              );
            }

            return (
              <CardWrapper key={card.name}>
                <CardNumber>
                  {card.symbol}
                  <img
                    style={{ height: 53, width: 36 }}
                    src={cardImg(card)}
                    alt=""
                  />
                </CardNumber>
              </CardWrapper>
            );
          })}
      </DealtCardsContainer>
      {!blackJack && !hold && player && dealtCards.length > 0 && score < 21 && (
        <>
          <Button onClick={handleDealNewPlayerCard}>New card</Button>
          <Button onClick={playerHoldHandler}>Hold</Button>
        </>
      )}
    </CardContainer>
  );
};

export default Player;
