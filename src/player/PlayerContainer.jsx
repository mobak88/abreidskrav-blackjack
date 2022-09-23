import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import useFetch from "../hooks/useFetch";
import generateRandomCard from "../helpers/generateRandCard";
import computerLogic from "../helpers/computerLogic";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
`;

const DealCardsBtn = styled.button`
  padding: 1rem 2rem;
  background-color: #030357;
  border: none;
  color: #cfcfcf;
  font-weight: 600;
  text-transform: uppercase;
`;

const PlayerContainer = () => {
  const [cardDeck, setCardDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [player, setPlayer] = useState(true);
  const [hold, setHold] = useState(false);

  const { loading, err, data } = useFetch("data/cardDeck.json");

  useEffect(() => {
    if (data) {
      setCardDeck([...data.cards]);
    }
  }, [data]);

  const removeCardFromDeck = (i) => {
    setCardDeck((prevState) => {
      const newCardDeck = prevState.filter((card) => card !== cardDeck[i]);
      return newCardDeck;
    });
  };

  const dealInitialCards = () => {
    for (let i = 0; i <= 3; i++) {
      const randNum = generateRandomCard(cardDeck);

      if (i % 2 === 0) {
        setComputerCards((prevState) => [...prevState, cardDeck[randNum]]);

        removeCardFromDeck();
      } else {
        setPlayerCards((prevState) => [...prevState, cardDeck[randNum]]);

        removeCardFromDeck(randNum);
      }
    }
  };

  const dealNewPlayerCard = () => {
    const randNum = generateRandomCard(cardDeck);

    setPlayerCards((prevState) => [...prevState, cardDeck[randNum]]);

    removeCardFromDeck(randNum);
  };

  const handlePlayerHold = () => {
    console.log("Hold");
    setHold(true);
  };

  const dealNewComputerCards = () => {
    const randNum = generateRandomCard(cardDeck);

    setComputerCards((prevState) => [...prevState, cardDeck[randNum]]);

    removeCardFromDeck(randNum);
  };

  useEffect(() => {
    const score = computerCards.reduce((prevVal, currentVal) => {
      return prevVal + currentVal.value;
    }, 0);

    if (hold === true) {
      if (score < 20) {
        dealNewComputerCards();
      }
    }
  }, [hold]);

  return (
    <Container>
      {computerCards.length !== 0 && (
        <Cards hold={hold} cards={computerCards}>
          Computer
        </Cards>
      )}
      {playerCards.length !== 0 && (
        <Cards
          cards={playerCards}
          player={player}
          dealNewPlayerCard={dealNewPlayerCard}
          handlePlayerHold={handlePlayerHold}
        >
          Player
        </Cards>
      )}

      {cardDeck.length === 52 && (
        <DealCardsBtn onClick={dealInitialCards}>Deal cards</DealCardsBtn>
      )}
    </Container>
  );
};

export default PlayerContainer;
