import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  padding: 1rem 2rem;
  background-color: #030357;
  border: none;
  color: #cfcfcf;
  font-weight: 600;
  text-transform: uppercase;
`;

const Button = ({ children, onClick, className }) => {
  return (
    <Btn onClick={onClick} className={className}>
      {children}
    </Btn>
  );
};

export default Button;
