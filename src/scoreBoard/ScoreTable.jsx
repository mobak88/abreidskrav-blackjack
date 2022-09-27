import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Table = styled.table`
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

const ScoreTable = () => {
  const [localStoragePlayers, setLocalStoragePlayers] = useState(
    JSON.parse(localStorage.getItem("scores")) || []
  );

  useEffect(() => {
    const data = localStorage.getItem("scores");
    if (data !== null) {
      setLocalStoragePlayers(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    console.log(localStoragePlayers);
  }, [localStoragePlayers]);

  return (
    <Table>
      <thead>
        <tr>
          <ScoreTh>Name</ScoreTh>
          <ScoreTh>Score</ScoreTh>
        </tr>
      </thead>
      <tbody>
        {localStoragePlayers.map((player) => {
          return (
            <SroreTr key={player.name + Math.random()}>
              <ScoreTd>{player.name}</ScoreTd>
              <ScoreTd>{player.score}</ScoreTd>
            </SroreTr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ScoreTable;
