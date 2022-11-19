import styled from "styled-components";

const Button = styled.input`
  width: 100%;
  margin-t0p: 12px;
  padding: 8px 0;
  border: none;
  border-radius: 3px;
  background-color: ${props => props.theme.accentColor};
  color: white;
  font-weight: 600;
  text-align: center;
  opacity: ${props => props.disabled? "0.2" : "1"};
`;

export default Button;