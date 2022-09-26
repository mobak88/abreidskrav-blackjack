import React, { useState, useEffect } from "react";
import Player from "./Player";
import useFetch from "../hooks/useFetch";
import generateRandomCard from "../helpers/generateRandCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  gap: 2rem;
  padding: 3rem 0;
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
  const [computer, setComputer] = useState(true);
  const [hold, setHold] = useState(false);
  const [playerScore, setPlayerScore] = useState(false);
  const [computerScore, setComputerScore] = useState(false);
  const [blackJack, setBlackJack] = useState(false);
  const [winner, setWinner] = useState("");

  const { loading, err, data } = useFetch("data/cardDeck.json");

  useEffect(() => {
    if (data) {
      setCardDeck([...data.cards]);
    }
  }, [data]);

  const getComputerScore = (score) => {
    setComputerScore(score);
  };

  const getPlayerScore = (score) => {
    setPlayerScore(score);
  };

  const determineWinner = () => {
    if (
      (playerScore > computerScore && playerScore <= 21) ||
      (computerScore > 21 && playerScore <= 21)
    ) {
      setWinner("You won");
    } else if (
      (playerScore < computerScore && computerScore <= 21) ||
      (playerScore > 21 && computerScore <= 21)
    ) {
      setWinner("Computer won");
    } else {
      setWinner("Draw");
    }
  };

  const removeCardFromDeck = (i) => {
    setCardDeck((prevState) => {
      const newCardDeck = prevState.filter((card) => card !== cardDeck[i]);
      return newCardDeck;
    });
  };

  const dealInitialCards = () => {
    let cardDeckSet = new Set();

    while (cardDeckSet.size < 4) {
      const randNum = generateRandomCard(cardDeck);
      cardDeckSet.add(randNum);
    }

    cardDeckSet = [...cardDeckSet];

    for (let i = 0; i <= 3; i++) {
      if (i % 2 === 0) {
        setComputerCards((prevState) => [
          ...prevState,
          cardDeck[cardDeckSet[i]],
        ]);
      } else {
        setPlayerCards((prevState) => [...prevState, cardDeck[cardDeckSet[i]]]);
      }
      removeCardFromDeck(cardDeckSet[i]);
    }
  };

  const dealNewPlayerCard = () => {
    const randNum = generateRandomCard(cardDeck);

    setPlayerCards((prevState) => [...prevState, cardDeck[randNum]]);

    removeCardFromDeck(randNum);
  };

  const handlePlayerHold = () => {
    setHold(true);
  };

  const dealNewComputerCards = () => {
    let scoreArr = [...computerCards];

    let score = scoreArr.reduce((prevVal, currentVal) => {
      return prevVal + currentVal.value;
    }, 0);

    while (score < 15) {
      const randNum = generateRandomCard(cardDeck);

      setComputerCards((prevState) => [...prevState, cardDeck[randNum]]);

      scoreArr.push(cardDeck[randNum]);

      score = scoreArr.reduce((prevVal, currentVal) => {
        return prevVal + currentVal.value;
      }, 0);

      removeCardFromDeck(randNum);
    }
  };

  useEffect(() => {
    if (hold === true) {
      dealNewComputerCards();
      determineWinner();
    }
  }, [hold, computerScore]);

  useEffect(() => {
    if (playerScore > 21) {
      setWinner("You got busted computer wins");
      setBlackJack(true);
    }
    if (playerScore === 21 || computerScore === 21) {
      setBlackJack(true);
      if (playerScore === 21) {
        setWinner("You got BlackJack congratulations you win");
      } else if (computerScore === 21) {
        setWinner("Computer got BlackJack");
      } else {
        setWinner("Both you and computer got BlackJack draw");
      }
    }
  }, [playerScore, computerScore]);

  return (
    <Container>
      {playerCards.length === 0 && <h1>Blackjack</h1>}
      {computerCards.length !== 0 && (
        <Player
          computer={computer}
          getScore={getComputerScore}
          hold={hold}
          cards={computerCards}
          blackJack={blackJack}
        >
          Computer
        </Player>
      )}
      {winner && <h1>{winner}</h1>}
      {playerCards.length !== 0 && (
        <Player
          cards={playerCards}
          player={player}
          dealNewPlayerCard={dealNewPlayerCard}
          handlePlayerHold={handlePlayerHold}
          hold={hold}
          getScore={getPlayerScore}
          blackJack={blackJack}
        >
          Player
        </Player>
      )}

      {cardDeck.length === 52 && (
        <DealCardsBtn onClick={dealInitialCards}>Deal cards</DealCardsBtn>
      )}
    </Container>
  );
};

export default PlayerContainer;
