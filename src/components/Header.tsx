import styled from "styled-components";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-contents: space-between;
  max-width: 930px;
  width: 100%; 
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonLink = styled(Link)`
  margin-left: 15px;
`;

const Button = styled.span`
  padding: 4px 15px;
  border-radius: 4px;
  background-color: ${props => props.theme.accentColor};
  color: white;
  font-weight: 800;
`;

function Header() {
  return (
    <HeaderStyle>
      <Wrapper>
        <FontAwesomeIcon icon={faInstagram} size="2x" />
        <ButtonContainer>
          <ButtonLink to={"/"}>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </ButtonLink>
          <ButtonLink to={"/"}>
            <FontAwesomeIcon icon={faCompass} size="lg" />
          </ButtonLink>
          <ButtonLink to={"/users/1"}>
            <Avatar />
          </ButtonLink>
          <ButtonLink to={"/login"}>
            <Button>Login</Button>
          </ButtonLink>
        </ButtonContainer>
      </Wrapper>
    </HeaderStyle>
  )
}

export default Header;