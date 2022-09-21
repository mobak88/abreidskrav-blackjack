import React from "react";
import Cards from "./Cards";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
`;

/* Pass carddeck, randcard down to cards */

const PlayerContainer = () => {
  return (
    <Container>
      <Cards />
      <Cards />
    </Container>
  );
};

export default PlayerContainer;
