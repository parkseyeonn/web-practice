import styled from "styled-components";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IAvatar {
  url?: string;
}

const AvatarStyle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: white;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({url}: IAvatar) {
  return <AvatarStyle>
    {url ? <Img src={url} /> : <FontAwesomeIcon icon={faUser} size="lg" />}
  </AvatarStyle>
}

export default Avatar;