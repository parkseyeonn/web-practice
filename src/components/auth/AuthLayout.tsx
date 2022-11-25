import {ReactNode} from "react";
import styled from "styled-components";

interface IAuthLayout {
  children: ReactNode
}

const Container = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content:  center;
  flex-direction: column;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function AuthLayout({children}: IAuthLayout) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        {/* todo <DarkModeBtn></DarkModeBtn> */}
      </Footer>
    </Container>
  )
}

export default AuthLayout;