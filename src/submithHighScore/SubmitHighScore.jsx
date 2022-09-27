import React, { useState, useEffect } from "react";
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

const SubmitHighScore = ({ score, handleShowScoreBoard }) => {
  const [playerName, setPlayerName] = useState("");
  const [localStoragePlayers, setLocalStoragePlayers] = useState(
    JSON.parse(localStorage.getItem("scores")) || []
  );

  const onSubmitScore = (e) => {
    e.preventDefault();
    setLocalStoragePlayers((prevState) => [
      ...prevState,
      { name: playerName, score: score },
    ]);
    handleShowScoreBoard();
  };

  const onNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    const data = localStorage.getItem("scores");
    if (data !== null) {
      setLocalStoragePlayers(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (localStoragePlayers.length > 0 || localStoragePlayers !== null) {
      localStorage.setItem("scores", JSON.stringify(localStoragePlayers));
    }

    console.log(localStoragePlayers);
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
