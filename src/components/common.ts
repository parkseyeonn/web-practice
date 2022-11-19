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