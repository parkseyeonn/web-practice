import { ReactNode } from "react";
import styled from "styled-components";

const Content = styled.main`
  margin: 0 auto;
  padding: 45px 0;
  max-width: 500px;
  width: 100%;
`;

interface ILayout {
  children: ReactNode
}

function Layout({children}: ILayout) {
  return (
    <Content>
      {children}
    </Content>
  )
}

export default Layout;