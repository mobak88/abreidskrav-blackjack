import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const CardContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CardContainer;
