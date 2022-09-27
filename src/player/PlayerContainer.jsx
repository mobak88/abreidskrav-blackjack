import React, { useState, useEffect } from "react";
import Player from "./Player";
import useFetch from "../hooks/useFetch";
import generateRandomCard from "../helpers/generateRandCard";
import determineWinner from "../helpers/determineWinner";
import blackJackWinner from "../helpers/blackJackWinner";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import Button from "../button/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 2rem;
  padding: 3rem 0;
`;

const PlayerContainer = () => {
  const [cardDeck, setCardDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [player, setPlayer] = useState(true);
  const [computer, setComputer] = useState(true);
  const [hold, setHold] = useState(false);
  const [playerScore, setPlayerScore] = useState(null);
  const [computerScore, setComputerScore] = useState(null);
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

  const busted = () => {
    if (playerScore > 21) {
      setWinner("You got busted computer wins");
      setBlackJack(true);
    }

    if (computerScore > 21) {
      setWinner("Computer got busted you win");
      setBlackJack(true);
    }

    if (playerScore < 21 && computerScore < 21 && blackJack === true) {
      setWinner("");
      setBlackJack(false);
    }
  };

  useEffect(() => {
    if (hold === true) {
      dealNewComputerCards();
      const winnerString = determineWinner(playerScore, computerScore);
      setWinner(winnerString);
      setBlackJack(false);
      busted();
    }
  }, [hold, computerScore, playerScore, winner]);

  useEffect(() => {
    const [blackJackString, gotBlackJack] = blackJackWinner(
      playerScore,
      computerScore
    );

    setWinner(blackJackString);
    setBlackJack(gotBlackJack);

    busted();
  }, [playerScore, computerScore]);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Container>
      {cardDeck.length === 52 && <h1>Play Blackjack</h1>}
      {cardDeck.length !== 52 && (
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
      {cardDeck.length !== 52 && (
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
        <Button onClick={dealInitialCards}>Deal cards</Button>
      )}
      {(blackJack || hold) && (
        <>
          <Button onClick={refreshPage}>Start New Game</Button>
          <ScoreBoard score={playerScore} />
        </>
      )}
    </Container>
  );
};

export default PlayerContainer;
