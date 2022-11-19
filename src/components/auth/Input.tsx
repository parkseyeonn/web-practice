import styled from "styled-components";

interface IInput {
  hasError?: boolean
}

const Input = styled.input<IInput>`
  width: 100%;
  margin-top: 5px;
  padding: 7px;
  border: .5px solid ${props => props.hasError ? "tomato": props.theme.borderColor};
  border-radius: 3px;
  background-color: #fafafa;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;