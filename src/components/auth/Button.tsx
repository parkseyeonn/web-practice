import styled from "styled-components";

const Button = styled.button`
  display: block; 
  width: 100%;
  height: 30px;
  margin-top: 12px;
  padding: 8px 0;
  border: none;
  border-radius: 3px;
  background-color: ${props => props.theme.accentColor};
  color: white;
  font-weight: 600;
  text-align: center;
  opacity: ${props => props.disabled? "0.2" : "1"};
  transition: .2s;
  &:hover {
    background-color: ${props => props.theme.accentLightColor};
    cursor: pointer;
  }
`;

export default Button;