import styled from "styled-components";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import useUser, {IUser} from "../hooks/useUser";
import { logUserOut } from "../reactiveVar";
import ROUTE from "../route";

const HeaderStyle = styled.header`
  position: relative;
  z-index: 10;
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
  max-width: 500px;
  width: 100%; 
  padding: 0 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonLink = styled(Link)`
  margin-left: 15px;
`;

const ButtonStyle = styled.span`
  padding: 4px 15px;
  border-radius: 4px;
  background-color: ${props => props.theme.accentColor};
  color: white;
  font-weight: 800;
`;

function Header() {
  const user: IUser | null = useUser();
  return (
    <HeaderStyle>
      <Wrapper>
        <FontAwesomeIcon icon={faInstagram} size="2x" />
        <ButtonContainer>
          <ButtonLink to={ROUTE.HOME}>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </ButtonLink>
          <ButtonLink to={"/"}>
            <FontAwesomeIcon icon={faCompass} size="lg" />
          </ButtonLink>
          <ButtonLink to={"/users/1"}>
            <Avatar />
          </ButtonLink>
          {
            user ? 
            <button onClick={logUserOut}>
              <ButtonStyle>Logout</ButtonStyle>
            </button> 
            :
            <ButtonLink to={"/login"}>
              <ButtonStyle>Login</ButtonStyle>
            </ButtonLink>
          }
        </ButtonContainer>
      </Wrapper>
    </HeaderStyle>
  )
}

export default Header;