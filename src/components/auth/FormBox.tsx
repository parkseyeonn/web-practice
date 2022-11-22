import styled from "styled-components";
import { BaseBox } from "../common";

const FormBox = styled(BaseBox)`
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

export default FormBox;