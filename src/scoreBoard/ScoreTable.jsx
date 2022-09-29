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
    const data = JSON.parse(localStorage.getItem("scores"));
    const sortedData = data.sort((a, b) => {
      return b.score - a.score;
    });

    if (data !== null) {
      setLocalStoragePlayers(sortedData);
    }
  }, []);

  /* useEffect(() => {
    console.log(localStoragePlayers);
  }, [localStoragePlayers]); */

  return (
    <Table>
      <thead>
        <tr>
          <ScoreTh>Place</ScoreTh>
          <ScoreTh>Name</ScoreTh>
          <ScoreTh>Score</ScoreTh>
        </tr>
      </thead>
      <tbody>
        {localStoragePlayers.map((player, i) => {
          return (
            <SroreTr key={player.name + Math.random()}>
              <ScoreTd>{`${i + 1}.`}</ScoreTd>
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
