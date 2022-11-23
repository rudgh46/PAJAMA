import React from 'react';
import styled,{css} from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-family:"star";
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  cursor: pointer;
  
  background: #FD7A99;
  &:hover {
    background: #FFA4BD;
  }

  ${props =>
  props.fullWidth &&
  css`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;
  font-size: 1.125rem;
  `
  }
 
  ${
    props =>
    props.cyan &&
    css`
    background: #FD7A99;
    &:hover{
      background: #FFA4BD;
    }
    `

  }
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;