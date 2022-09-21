import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
`;

const PlayerContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PlayerContainer;
