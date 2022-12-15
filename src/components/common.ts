import styled from "styled-components";

export const BaseBox = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
`;

export const BoldLink = styled.span`
  color: rgb(142, 142, 142);
  font-weight: 600;
`;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const AccentButton = styled.button`
  border: none;
  border-radius: 3px;
  background-color: ${props => props.theme.accentColor};
  text-align: center;
  color: white;
  opacity: ${props => props.disabled? "0.2" : "1"};
  transition: .2s;
  &:hover {
    background-color: ${props => props.theme.accentLightColor};
    cursor: pointer;
  }
`;