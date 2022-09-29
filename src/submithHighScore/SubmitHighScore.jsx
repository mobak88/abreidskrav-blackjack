import React, { useState, useEffect, useRef } from "react";
import Button from "../button/Button";
import styled from "styled-components";

const HighScoreForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #dddddd;
  padding: 2rem;
  align-items: center;
`;

const FormInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const FormLabel = styled.label`
  font-size: 1.2rem;
`;

const SubmitHighScore = ({ score, handleSubmittedHighSCore }) => {
  const [playerName, setPlayerName] = useState("");
  const [lowestScore, setLowestScore] = useState(null);
  const [localStoragePlayers, setLocalStoragePlayers] = useState(
    JSON.parse(localStorage.getItem("scores")) || []
  );

  const prevLocalStoragePlayersRef = useRef(localStoragePlayers);

  const onSubmitScore = (e) => {
    console.log("Score");
    e.preventDefault();

    if (localStoragePlayers.length < 5) {
      console.log("5");
      setLocalStoragePlayers((prevState) => {
        return [...prevState, { name: playerName, score: score }];
      });

      prevLocalStoragePlayersRef.current = localStoragePlayers;
      return;
    } else if (score > lowestScore[0].score && localStoragePlayers.length > 4) {
      console.log("Remove");
      setLocalStoragePlayers((prevState) => {
        const removedLowest = prevState.slice(-1);
        return [...removedLowest, { name: playerName, score: score }];
      });

      prevLocalStoragePlayersRef.current = localStoragePlayers;
      return;
    } else {
      console.log(score, lowestScore[0].score);
      console.log(score > lowestScore[0].score);
      return;
    }
  };

  const onNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    const data = localStorage.getItem("scores");

    if (data !== null && data !== undefined) {
      setLocalStoragePlayers(JSON.parse(data));

      const lowest = localStoragePlayers.slice(-1);
      setLowestScore(lowest);
    }
  }, []);

  useEffect(() => {
    const sortedScores = localStoragePlayers.sort((a, b) => {
      return b.score - a.score;
    });

    localStorage.setItem("scores", JSON.stringify(sortedScores));

    if (
      localStoragePlayers.length > prevLocalStoragePlayersRef.current.length
    ) {
      handleSubmittedHighSCore();
    }
  }, [localStoragePlayers]);

  return (
    <HighScoreForm>
      <h3>Submit yor high score</h3>
      <FormInputWrapper>
        <FormLabel htmlFor="name">Your Name:</FormLabel>
        <input onChange={onNameChange} type="text" id="name" />
      </FormInputWrapper>
      <Button onClick={onSubmitScore}>Submit Score</Button>
    </HighScoreForm>
  );
};

export default SubmitHighScore;
