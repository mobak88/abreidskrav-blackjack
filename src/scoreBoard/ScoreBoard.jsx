import React, { useState } from "react";
import Button from "../button/Button";
import styled from "styled-components";

const BtnWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const Btn = styled(Button)`
  background-color: #0a0a0a;
`;

const ScoreTable = styled.table`
  background-color: #fff;
  border-collapse: collapse;
  min-width: 18rem;
`;

const SroreTr = styled.tr`
  &:nth-child(odd) {
    background-color: #dddddd;
  }
`;

const ScoreTd = styled.td`
  font-size: 1.4rem;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 0.8rem;
`;

const ScoreTh = styled.th`
  font-size: 1.4rem;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 0.8rem;
`;

const ScoreBoard = () => {
  const [showScoreBoard, setShowScoreBoard] = useState(false);

  return (
    <>
      {showScoreBoard && (
        <ScoreTable>
          <thead>
            <tr>
              <ScoreTh>Name</ScoreTh>
              <ScoreTh>Score</ScoreTh>
            </tr>
          </thead>
          <tbody>
            <SroreTr>
              <ScoreTd>Mo</ScoreTd>
              <ScoreTd>20</ScoreTd>
            </SroreTr>
            <SroreTr>
              <ScoreTd>Mo</ScoreTd>
              <ScoreTd>20</ScoreTd>
            </SroreTr>
            <SroreTr>
              <ScoreTd>Mo</ScoreTd>
              <ScoreTd>20</ScoreTd>
            </SroreTr>
          </tbody>
        </ScoreTable>
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
        <Btn>Submit highscore</Btn>
      </BtnWrapper>
    </>
  );
};

export default ScoreBoard;
