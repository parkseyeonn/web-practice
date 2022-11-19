import styled from "styled-components";

interface IFormError {
  message?: String
}

const SFormError = styled.span`
  margin: 5px 0 10px 0;
  color: tomato;
  font-size: 12px;
  font-weight: 600;
`;

function FormError({message}: IFormError) {
  return (
    message === "" || !message ? null :
    <SFormError>{message}</SFormError>
  )
}

export default FormError;