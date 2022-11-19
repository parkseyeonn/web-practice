import { ReactNode } from "react";
import styled from "styled-components";
import { BaseBox } from "../common";

interface IFormBox {
  children: ReactNode
}

const Container = styled(BaseBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 40px;
  padding: 35px 40px 25px 40px;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

function FormBox({children}: IFormBox) {
  return (
    <Container>{children}</Container>
  );
}

export default FormBox;