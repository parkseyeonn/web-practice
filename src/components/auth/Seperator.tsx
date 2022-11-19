import styled from "styled-components";

const SSeperator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0 30px 0;
  text-transform: uppercase;
  div {
    width: 199%;
    height: 1px;
    background-color: ${props => props.theme.borderColor};
  }
  span {
    margin: 0 10px;
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 600;
  }
`;

function Seperator() {
  return (
    <SSeperator>
      <div />
      <span>Or</span>
      <div />
    </SSeperator>
  )
}

export default Seperator;