import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import ScoreTable from "./ScoreTable";
import SubmitHighScore from "../submithHighScore/SubmitHighScore";
import styled from "styled-components";

const BtnWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const Btn = styled(Button)`
  background-color: #0a0a0a;
`;

const ScoreBoard = ({ score }) => {
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [showSubmitScore, setShowSubmitScore] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(false);

  const handleSubmittedHighSCore = () => {
    if (showScoreBoard === false) {
      setShowScoreBoard((prevState) => !prevState);
    }
    setShowSubmitScore((prevState) => !prevState);
    setSubmittedScore((prevState) => !prevState);
  };

  return (
    <>
      {showScoreBoard && <ScoreTable />}
      {showSubmitScore && (
        <SubmitHighScore
          score={score}
          handleSubmittedHighSCore={handleSubmittedHighSCore}
        />
      )}
      <BtnWrapper>
        {!showScoreBoard && (
          <Btn onClick={() => setShowScoreBoard((prevState) => !prevState)}>
            See high score
          </Btn>
        )}
        {showScoreBoard && (
          <Btn onClick={() => setShowScoreBoard((prevState) => !prevState)}>
            Hide high score
          </Btn>
        )}
        {!showSubmitScore && !submittedScore && (
          <Btn onClick={() => setShowSubmitScore((prevState) => !prevState)}>
            Submit highscore
          </Btn>
        )}
        {showSubmitScore && (
          <Btn onClick={() => setShowSubmitScore((prevState) => !prevState)}>
            Hide sumbit highscore
          </Btn>
        )}
      </BtnWrapper>
    </>
  );
};

export default ScoreBoard;
