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

const SubmitHighScore = ({
  score,
  computerScore,
  handleSubmittedHighSCore,
}) => {
  const [playerName, setPlayerName] = useState("");
  const [lowestScore, setLowestScore] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [submittedScore, setSubmittedScore] = useState(false);
  const [localStoragePlayers, setLocalStoragePlayers] = useState(
    JSON.parse(localStorage.getItem("scores")) || []
  );

  const onSubmitScore = (e) => {
    e.preventDefault();

    if (playerName.length < 3) {
      setErrMsg("Please type in 3 chars or more");
      return;
    } else if (
      (localStoragePlayers.length < 10 &&
        score < 22 &&
        score > computerScore) ||
      (localStoragePlayers.length < 10 && computerScore > 21)
    ) {
      console.log("Under 10");
      setLocalStoragePlayers((prevState) => {
        return [...prevState, { name: playerName, score: score }];
      });
      setSubmittedScore((prevState) => !prevState);
    } else if (
      (score > lowestScore[0].score &&
        localStoragePlayers.length > 9 &&
        score < 22 &&
        score > computerScore) ||
      (computerScore > 21 &&
        score < 22 &&
        score > lowestScore[0].score &&
        localStoragePlayers.length > 9)
    ) {
      const newHighScoreArr = localStoragePlayers.slice(0, -1);
      setLocalStoragePlayers([
        ...newHighScoreArr,
        { name: playerName, score: score },
      ]);
      setSubmittedScore((prevState) => !prevState);
    } else {
      setErrMsg(
        "You did not win or your score are not higher than the lowest high score"
      );
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
    }
  }, []);

  useEffect(() => {
    const sortedScores = localStoragePlayers.sort((a, b) => {
      return b.score - a.score;
    });

    localStorage.setItem("scores", JSON.stringify(sortedScores));

    const lowest = localStoragePlayers.slice(-1);
    setLowestScore(lowest);
  }, [localStoragePlayers]);

  useEffect(() => {
    if (submittedScore) handleSubmittedHighSCore();
  }, [submittedScore]);

  return (
    <HighScoreForm>
      <h3>Submit yor high score</h3>
      <FormInputWrapper>
        <FormLabel htmlFor="name">Your Name:</FormLabel>
        <input onChange={onNameChange} type="text" id="name" minLength={3} />
      </FormInputWrapper>
      <p>{errMsg}</p>
      <Button onClick={onSubmitScore}>Submit Score</Button>
    </HighScoreForm>
  );
};

export default SubmitHighScore;
